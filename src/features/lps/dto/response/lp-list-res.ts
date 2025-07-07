import { BaseInfiniteResponse } from "@/shared/type";

interface Tag {
  id: number;
  name: string;
}

interface Like {
  id: number;
  userId: number;
  lpId: number;
}

export interface Lp {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  likes: Like[];
}

export type LpListRes = BaseInfiniteResponse<Lp>;
