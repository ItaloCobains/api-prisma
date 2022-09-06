import { Post } from '@prisma/client';

export class PostEntity implements Post {
  id: number;
  publicado: boolean;
  title: string;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
  autorId: number | null;
}
