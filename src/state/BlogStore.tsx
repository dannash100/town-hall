import { makeAutoObservable } from "mobx";
import { createPost, fetchPosts } from "../api/posts";
import Post from "../types/Post";

class BlogStore {
  posts: Post[] = [];
  postsError?: Error;

  constructor() {
    makeAutoObservable(this);
  }

  async createPost(data: Post) {
    try {
      const post = await createPost(data);
      console.log(post);
      this.posts.push(post);
    } catch (err) {
      throw err;
    }
  }

  async fetchPosts() {
    try {
      const posts = await fetchPosts();
      this.posts = posts;
    } catch (err) {
      this.postsError = err;
      console.error(err);
    }
  }
}

export default BlogStore;
