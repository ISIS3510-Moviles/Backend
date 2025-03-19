import { UserRole } from "../user.entity";

export class CreateUserDto {
  name: string;
  role: UserRole;
  phoneNumber: string;
  isPremium: boolean;
}