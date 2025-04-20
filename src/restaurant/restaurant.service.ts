import { Injectable } from '@nestjs/common';
import admin from 'firebase.config';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { DocumentSnapshot } from 'firebase-admin/firestore';

async function fetchDocumentsByIds(
  db: FirebaseFirestore.Firestore,
  collectionName: string,
  ids: string[],
): Promise<Map<string, any>> {
  const uniqueIds = [...new Set(ids)].filter((id) => id);
  const docMap = new Map<string, any>();

  if (uniqueIds.length === 0) {
    return docMap;
  }

  const promises: Promise<DocumentSnapshot>[] = uniqueIds.map((id) =>
    db.collection(collectionName).doc(id).get(),
  );

  try {
    const snapshots = await Promise.all(promises);
    snapshots.forEach((doc) => {
      if (doc.exists) {
        docMap.set(doc.id, doc.data());
      } else {
        console.warn(
          `Document with ID ${doc.id} not found in collection ${collectionName}`,
        );
      }
    });
  } catch (error) {
    console.error(`Error fetching documents from ${collectionName}:`, error);
  }
  return docMap;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  routeIndications: string;
  openingTime: Date;
  closingTime: Date;
  opensHolidays: boolean;
  opensWeekends: boolean;
  isActive: boolean;
  address: string;
  phone: string;
  email: string;
  foodTagsIds?: string[];
  dietaryTagsIds?: string[];
  suscribersIds?: string[];
  rating: number;
  profilePhoto: string;
  overviewPhoto: string;
  photos?: string[];
  commentsIds?: string[];
  reservationsIds?: string[];
  latitude: number;
  longitude: number;
}

export interface RestaurantSmart {
  id: string;
  name: string;
  tags: string[];
  rating: number;
  comments: any[];
  reservations: any[];
  profilePhoto: string;
  subscribers: Subscriber[];
}

export interface Subscriber {
  name: string;
}

@Injectable()
export class RestaurantService {
  private db = admin.firestore();
  private collectionName = 'restaurants';

  async createRestaurant(restaurant: CreateRestaurantDto): Promise<any> {
    const docRef = this.db.collection(this.collectionName).doc();
    await docRef.set(restaurant);
    return { id: docRef.id, ...restaurant };
  }

  async getRestaurants(nameMatch?: string): Promise<any[]> {
    const snapshot = await this.db.collection(this.collectionName).get();
    let restaurants = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as any,
    );

    if (!nameMatch || nameMatch.trim() === '') {
      return restaurants;
    }

    const match = nameMatch.toLowerCase().trim();

    const allDietaryTagIds = restaurants.flatMap((r) => r.dietaryTagsIds || []);
    const allFoodTagIds = restaurants.flatMap((r) => r.foodTagsIds || []);

    const [dietaryTagMap, foodTagMap] = await Promise.all([
      fetchDocumentsByIds(this.db, 'dietaryTags', allDietaryTagIds),
      fetchDocumentsByIds(this.db, 'foodTags', allFoodTagIds),
    ]);

    const finalFilteredRestaurants = restaurants.filter((restaurant) => {
      const nameMatches = restaurant.name?.toLowerCase().includes(match);
      const descriptionMatches = restaurant.description
        ?.toLowerCase()
        .includes(match);

      const dietaryTagMatches = restaurant.dietaryTagsIds?.some((id: string) =>
        dietaryTagMap.get(id)?.name?.toLowerCase().includes(match),
      );

      const foodTagMatches = restaurant.foodTagsIds?.some((id: string) =>
        foodTagMap.get(id)?.name?.toLowerCase().includes(match),
      );

      return (
        nameMatches || descriptionMatches || dietaryTagMatches || foodTagMatches
      );
    });

    return finalFilteredRestaurants;
  }

  async getRestaurantsTagsJoin(
    nameMatch?: string,
    tagsInclude?: string[],
  ): Promise<any[]> {
    const snapshot = await this.db.collection(this.collectionName).get();

    let restaurants = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as any,
    );

    // Filtrar por nombre si hay coincidencia
    if (nameMatch?.trim()) {
      const match = nameMatch.toLowerCase();
      restaurants = restaurants.filter((restaurant) =>
        restaurant.name?.toLowerCase().includes(match),
      );
    }

    // Obtener tags por restaurante
    const restaurantsWithTags = await Promise.all(
      restaurants.map(async (restaurant) => {
        const foodTags = await this.fetchTags(
          restaurant.foodTagsIds,
          'foodTags',
        );
        const dietaryTags = await this.fetchTags(
          restaurant.dietaryTagsIds,
          'dietaryTags',
        );
        const tags = [...foodTags, ...dietaryTags];
        return { ...restaurant, tags };
      }),
    );

    let filteredRestaurants = restaurantsWithTags;
    if (tagsInclude && tagsInclude?.length) {
      filteredRestaurants = restaurantsWithTags.filter((restaurant) =>
        restaurant.tags.some((tag: string) => tagsInclude.includes(tag)),
      );
    }

    return filteredRestaurants;
  }

  private async fetchTags(
    tagIds: string[] | undefined,
    collection: string,
  ): Promise<string[]> {
    if (!tagIds) return [];
    const tags = await Promise.all(
      tagIds.map(async (tagId) => {
        const tagDoc = await this.db.collection(collection).doc(tagId).get();
        return tagDoc.exists ? tagDoc.data()?.name : null;
      }),
    );
    return tags.filter((tag): tag is string => tag !== null);
  }

  private async fetchSubscribers(
    subscriberIds: string[] | undefined,
  ): Promise<Subscriber[]> {
    if (!subscriberIds) return [];
    const subscribers = await Promise.all(
      subscriberIds.map(async (subscriberId) => {
        const subscriberDoc = await this.db
          .collection('users')
          .doc(subscriberId)
          .get();
        return subscriberDoc.exists
          ? (subscriberDoc.data() as Subscriber)
          : null;
      }),
    );
    return subscribers.filter(
      (subscriber): subscriber is Subscriber => subscriber !== null,
    );
  }

  private async fetchRelatedDocs(
    collection: string,
    field: string,
    value: string,
  ): Promise<any[]> {
    const snapshot = await this.db
      .collection(collection)
      .where(field, '==', value)
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async buildRestaurantSmart(
    doc: FirebaseFirestore.QueryDocumentSnapshot,
  ): Promise<RestaurantSmart> {
    const data = doc.data() as Restaurant;

    const foodTags = await this.fetchTags(data.foodTagsIds, 'foodTags');
    const dietaryTags = await this.fetchTags(
      data.dietaryTagsIds,
      'dietaryTags',
    );
    const tags = [...foodTags, ...dietaryTags];

    const subscribers = await this.fetchSubscribers(data.suscribersIds);

    const reservations = await this.fetchRelatedDocs(
      'reservations',
      'restaurant_id',
      doc.id,
    );
    const comments = await this.fetchRelatedDocs(
      'comments',
      'restaurantId',
      doc.id,
    );

    return {
      id: doc.id,
      name: data.name,
      tags,
      profilePhoto: data.profilePhoto,
      rating: data.rating || 0,
      comments,
      reservations,
      subscribers,
    };
  }

  async getRestaurantsFull(): Promise<RestaurantSmart[]> {
    const snapshot = await this.db.collection(this.collectionName).get();
    const restaurants = await Promise.all(
      snapshot.docs.map((doc) => this.buildRestaurantSmart(doc)),
    );
    return restaurants;
  }

  async getRestaurantById(id: string): Promise<any | null> {
    const doc = await this.db.collection(this.collectionName).doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  async deleteRestaurant(id: string): Promise<boolean> {
    await this.db.collection(this.collectionName).doc(id).delete();
    return true;
  }
  async updateRestaurant(
    id: string,
    restaurant: UpdateRestaurantDto,
  ): Promise<boolean> {
    await this.db
      .collection(this.collectionName)
      .doc(id)
      .update(
        restaurant as unknown as FirebaseFirestore.UpdateData<FirebaseFirestore.DocumentData>,
      );
    return true;
  }

  async getRestaurantsByFoodTag(
    tagId: string,
  ): Promise<{ tagName: string | null; restaurants: RestaurantSmart[] }> {
    const tagDoc = await this.db.collection('foodTags').doc(tagId).get();
    const tagName = tagDoc.exists ? tagDoc.data()?.name : null;
    const snapshot = await this.db
      .collection(this.collectionName)
      .where('foodTagsIds', 'array-contains', tagId)
      .get();
    const restaurants = await Promise.all(
      snapshot.docs.map((doc) => this.buildRestaurantSmart(doc)),
    );
    return { tagName, restaurants };
  }
}
