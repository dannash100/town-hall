import Post, { PostData, PostUpdateData } from "../types/Post"
import { TagData } from "../types/Tags";
import { postService, tagService } from "./client"

// include: [{
//   model:db.Product, 
//   attributes: ['id', 'name', 'nameKh'], 
//   through: { where: { amount: 10 } }
// }]

export const deletePost = (id: number) => postService.remove(id);

export const updatePost = (id: number, data: PostUpdateData): Promise<Post> => postService.patch(id, data)

export const createPost = (data: PostData): Promise<Post> => postService.create(data);

export const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await postService.find();
  return data;
}

export const createTag = (data: TagData) => tagService.create(data)