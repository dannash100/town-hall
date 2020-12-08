import { makeAutoObservable } from "mobx";
import {
  createPost,
  fetchPosts,
  updatePost,
  deletePost,
  createTag,
} from "../api/posts";
import Post, { PostData, PostUpdateData } from "../types/Post";
import Tag, { TagData } from "../types/Tags";

class BlogStore {
  activeTag?: string;
  tags?: Tag[];

  posts: Post[] = [];
  postsError?: Error;

  constructor() {
    makeAutoObservable(this);
  }

  setActiveTag(tag?: string) {
    this.activeTag = tag;
  }

  async deletePost(id: number) {
    try {
      this.posts = this.posts.filter((post) => post.id !== id);
      await deletePost(id);
    } catch (err) {
      console.error(err);
    }
  }

  async updatePost(id: number, data: PostUpdateData) {
    try {
      this.posts = this.posts.map((post) =>
        post.id === id ? { ...post, ...data } : post
      );
      const update = await updatePost(id, data);
      console.log(update);
    } catch (err) {
      console.error(err);
    }
  }

  async createPost(data: PostData) {
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

  async createTag(data: TagData) {
    try {
      const tag = await createTag(data);
      if (!this.tags) {
        this.tags = [tag];
      } else {
        this.tags.push(tag);
      }
    } catch (err) {
      console.error(err);
    }
  }
}

export default BlogStore;
