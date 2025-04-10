import { Injectable } from '@nestjs/common';
import admin from 'firebase.config';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';



@Injectable()
export class UserService {
  private db = admin.firestore();
  private collectionName = 'users';

  constructor(private readonly httpService: HttpService) {}


  async createUser(user: CreateUserDto): Promise<any> {
    const docRef = this.db.collection(this.collectionName).doc();
    await docRef.set(user);
    const { id, ...userData } = user;
    return { id: docRef.id, ...userData };
  }

  async getRecommendations(userId: string): Promise<any> {
    const url = 'http://34.44.23.243:8000/recommend';
    const response = await firstValueFrom(
      this.httpService.post(url, { user_id: userId })
    );
    return response.data;
  }

  
  async createUserCheck(user: CreateUserDto): Promise<any> {
    const snapshot = await this.db
      .collection(this.collectionName)
      .where('email', '==', user.email)
      .get();
    if (!snapshot.empty) {
      const userDoc = snapshot.docs[0];
      return { id: userDoc.id, ...userDoc.data() };
    } else {
      const docRef = this.db.collection(this.collectionName).doc();
      await docRef.set(user);
      const { id, ...userData } = user;
      return { id: docRef.id, ...userData };
    }
  }

  async getUsers(): Promise<any[]> {
    const snapshot = await this.db.collection(this.collectionName).get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async getUserById(id: string): Promise<any> {
    const snapshot = await this.db.collection(this.collectionName).get();
    const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return users.find((user) => user.id === id) || null;
  }

  async getUserByIdFull(id: string): Promise<any> {
    const snapshot = await this.db.collection(this.collectionName).get();
    const userDoc = snapshot.docs.find((doc) => doc.id === id);
    if (!userDoc) return {};

    const userData = userDoc.data() as any;
    let institution: { id: string; [key: string]: any } | null = null;
    if (userData.institutionId && userData.institutionId.trim() !== '') {
      const instDoc = await this.db
        .collection('institutions')
        .doc(userData.institutionId)
        .get();
      institution = instDoc.exists
        ? { id: instDoc.id, ...instDoc.data() }
        : null;
    }
    const savedProductsIds: string[] = (userData.savedProductsIds || []).filter(
      (pid) => pid && pid.trim() !== '',
    );
    const savedProducts = await Promise.all(
      savedProductsIds.map(async (pid) => {
        const productDoc = await this.db.collection('products').doc(pid).get();
        return productDoc.exists
          ? { id: productDoc.id, ...productDoc.data() }
          : null;
      }),
    );
    const filteredSavedProducts = savedProducts.filter((p) => p !== null);

    return {
      id: userDoc.id,
      name: userData.name,
      phone: userData.phone,
      email: userData.email,
      role: userData.role,
      isPremium: userData.isPremium,
      institution,
      saved_products: filteredSavedProducts,
    };
  }

  async deleteUser(id: string): Promise<boolean> {
    await this.db.collection(this.collectionName).doc(id).delete();
    return true;
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<boolean> {
    await this.db
      .collection(this.collectionName)
      .doc(id)
      .update(
        user as unknown as FirebaseFirestore.UpdateData<FirebaseFirestore.DocumentData>,
      );
    return true;
  }

  private async buildUserTag(
    userDoc: FirebaseFirestore.DocumentSnapshot,
  ): Promise<any> {
    const userData = userDoc.data() as any;
    if (!userData) return { id: userDoc.id };

    const dietaryPreferencesTagIds: string[] =
      userData.dietaryPreferencesTagIds || [];

    const foodTagsIds: string[] = userData.foodTagsIds || [];

    const dietaryPreferencesTags = await Promise.all(
      dietaryPreferencesTagIds.map(async (did) => {
        const tagDoc = await this.db.collection('dietaryTags').doc(did).get();
        return tagDoc.exists ? tagDoc.data()?.name : null;
      }),
    );

    const combinedUserTags = dietaryPreferencesTags.filter(
      (tag) => tag !== null,
    );

    const subscribedRestaurantsSnap = await this.db
      .collection('restaurants')
      .where('suscribersIds', 'array-contains', userDoc.id)
      .get();

    const subscribedRestaurants = await Promise.all(
      subscribedRestaurantsSnap.docs.map(async (restDoc) => {
        const restData = restDoc.data();
        const foodTagsIds: string[] = restData?.foodTagsIds || [];
        const dietaryTagsIds: string[] = restData?.dietaryTagsIds || [];

        const foodTags = await Promise.all(
          foodTagsIds.map(async (fid) => {
            const tagDoc = await this.db.collection('foodTags').doc(fid).get();
            return tagDoc.exists ? tagDoc.data()?.name : null;
          }),
        );

        const dietaryTags = await Promise.all(
          dietaryTagsIds.map(async (did) => {
            const tagDoc = await this.db
              .collection('dietaryTags')
              .doc(did)
              .get();
            return tagDoc.exists ? tagDoc.data()?.name : null;
          }),
        );

        const combinedTags = [...foodTags, ...dietaryTags].filter(
          (tag) => tag !== null,
        );

        return { tags: combinedTags };
      }),
    );

    const filteredSubscribedRestaurants = subscribedRestaurants.filter(
      (r) => r !== null,
    );

    const reservationsSnap = await this.db
      .collection('reservations')
      .where('user_id', '==', userDoc.id)
      .get();

    const reservations = await Promise.all(
      reservationsSnap.docs.map(async (resDoc) => {
        const resData = resDoc.data();
        if (!resData.restaurant_id || resData.restaurant_id.trim() === '')
          return null;

        const restaurantDoc = await this.db
          .collection('restaurants')
          .doc(resData.restaurant_id)
          .get();
        if (!restaurantDoc.exists) return null;

        const restaurantData = restaurantDoc.data();
        const foodTagsIds: string[] = restaurantData?.foodTagsIds || [];
        const dietaryTagsIds: string[] = restaurantData?.dietaryTagsIds || [];

        const foodTags = await Promise.all(
          foodTagsIds.map(async (fid) => {
            const tagDoc = await this.db.collection('foodTags').doc(fid).get();
            return tagDoc.exists ? tagDoc.data()?.name : null;
          }),
        );

        const dietaryTags = await Promise.all(
          dietaryTagsIds.map(async (did) => {
            const tagDoc = await this.db
              .collection('dietaryTags')
              .doc(did)
              .get();
            return tagDoc.exists ? tagDoc.data()?.name : null;
          }),
        );

        const combinedTags = [...foodTags, ...dietaryTags].filter(
          (tag) => tag !== null,
        );

        return {
          restaurant: { tags: combinedTags },
        };
      }),
    );

    const filteredReservations = reservations.filter((r) => r !== null);

    const savedProductsIds: string[] = (userData.savedProductsIds || []).filter(
      (pid) => pid && pid.trim() !== '',
    );

    const savedProducts = await Promise.all(
      savedProductsIds.map(async (pid) => {
        const productDoc = await this.db.collection('products').doc(pid).get();
        if (!productDoc.exists) return null;

        const productData = productDoc.data();
        const foodTagsIds: string[] = productData?.foodTagsIds || [];
        const dietaryTagsIds: string[] = productData?.dietaryTagsIds || [];

        const foodTags = await Promise.all(
          foodTagsIds.map(async (fid) => {
            const tagDoc = await this.db.collection('foodTags').doc(fid).get();
            return tagDoc.exists ? tagDoc.data()?.name : null;
          }),
        );

        const dietaryTags = await Promise.all(
          dietaryTagsIds.map(async (did) => {
            const tagDoc = await this.db
              .collection('dietaryTags')
              .doc(did)
              .get();
            return tagDoc.exists ? tagDoc.data()?.name : null;
          }),
        );

        const combinedTags = [...foodTags, ...dietaryTags].filter(
          (tag) => tag !== null,
        );

        return { tags: combinedTags };
      }),
    );

    const filteredSavedProducts = savedProducts.filter((p) => p !== null);

    const commentsSnap = await this.db
      .collection('comments')
      .where('authorId', '==', userDoc.id)
      .get();

    const comments = await Promise.all(
      commentsSnap.docs.map(async (commentDoc) => {
        const commentData = commentDoc.data();
        if (!commentData.restaurantId || commentData.restaurantId.trim() === '')
          return null;

        const restaurantDoc = await this.db
          .collection('restaurants')
          .doc(commentData.restaurantId)
          .get();
        if (!restaurantDoc.exists) return null;

        const restaurantData = restaurantDoc.data();
        const foodTagsIds: string[] = restaurantData?.foodTagsIds || [];
        const dietaryTagsIds: string[] = restaurantData?.dietaryTagsIds || [];

        const foodTags = await Promise.all(
          foodTagsIds.map(async (fid) => {
            const tagDoc = await this.db.collection('foodTags').doc(fid).get();
            return tagDoc.exists ? tagDoc.data()?.name : null;
          }),
        );

        const dietaryTags = await Promise.all(
          dietaryTagsIds.map(async (did) => {
            const tagDoc = await this.db
              .collection('dietaryTags')
              .doc(did)
              .get();
            return tagDoc.exists ? tagDoc.data()?.name : null;
          }),
        );

        const combinedTags = [...foodTags, ...dietaryTags].filter(
          (tag) => tag !== null,
        );

        return {
          restaurant: { tags: combinedTags },
          rating: commentData.rating,
          likes: commentData.likes,
          datetime: commentData.datetime,
          message: commentData.message,
        };
      }),
    );

    const filteredComments = comments.filter((c) => c !== null);

    return {
      id: userDoc.id,
      tags: combinedUserTags,
      subscribed_restaurants: filteredSubscribedRestaurants,
      reservations: filteredReservations,
      saved_products: filteredSavedProducts,
      comments: filteredComments,
    };
  }

  async getUserTagById(id: string): Promise<any> {
    const snapshot = await this.db.collection(this.collectionName).get();
    const userDoc = snapshot.docs.find((doc) => doc.id === id);
    if (!userDoc) return {};
    return this.buildUserTag(userDoc);
  }

  async getUsersTag(): Promise<any[]> {
    const snapshot = await this.db.collection(this.collectionName).get();
    const usersTag = await Promise.all(
      snapshot.docs.map((doc) => this.buildUserTag(doc)),
    );
    return usersTag.filter((user) => user !== null);
  }
}