import Post from "../types/Post"
import { postService } from "./client"

// include: [{
//   model:db.Product, 
//   attributes: ['id', 'name', 'nameKh'], 
//   through: { where: { amount: 10 } }
// }]

export const createPost = (data: Post): Promise<Post> => postService.create(data);

export const fetchPosts = () => postService.find();