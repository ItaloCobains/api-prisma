import { User } from '@prisma/client';

export class UserEntity implements User {
  id: number;
  name: string;
  email: string;
  admin: boolean;
  createdAt: Date;
}
