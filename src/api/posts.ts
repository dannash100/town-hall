import Post, { PostData, PostUpdateData } from "../types/Post"
import { TagData } from "../types/Tags";
import { postService, postToTagService, tagService } from "./client"

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

export const deleteTag = (id: number) => tagService.remove(id);

export const createTag = (data: TagData) => tagService.create(data)

export const fetchTags = () => tagService.find();

export const createPostToTag = (postId: number, tagId: number) => postToTagService.create({
  postId,
  tagId
})

export const fetchPostsByTag = async (tag: number) => {
  const { data } = await postService.find({
    query: {
      include:
      {
        service: 'tag',
        through: {
          where: {
            tagId: tag
          }
        },
        required: true
      }

    }
  })
  return data
}