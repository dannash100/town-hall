export type PostUpdateData = {
  title?: string;
  pdf?: string;
  excerpt?: string;
  author?: string;
  image?: string;
  published?: boolean;
}

export type PostData = {
  title: string;
  pdf: string;
  excerpt: string;
  author: string;
  image: any;
}

type Post = PostData & {
  id: number;
  published: boolean;
  createdAt: string;
}

export default Post 