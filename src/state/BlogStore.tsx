import { makeAutoObservable } from "mobx";
import {
  createPost,
  fetchPosts,
  updatePost,
  deletePost,
  createTag,
  fetchTags,
  deleteTag,
  createPostToTag,
  fetchPostsByTag,
} from "../api/posts";
import Post, { PostData, PostUpdateData } from "../types/Post";
import Tag, { TagData } from "../types/Tags";

class BlogStore {
  activeTag?: number;
  tags?: Tag[];

  posts: Post[] = [];
  postsError?: Error;

  postsByTags: Post[] = [];
  postsByTagsCache = new Map<number, Array<Post>>();
  postsByTagsError?: Error;

  constructor() {
    makeAutoObservable(this);
  }

  setActiveTag(id?: number) {
    this.activeTag = id;
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
      this.posts.push(post);
      return post;
    } catch (err) {
      throw err;
    }
  }

  async fetchPosts() {
    try {
      const cachedPosts = localStorage.getItem("posts");
      if (cachedPosts) {
        this.posts = JSON.parse(cachedPosts);
      }
      const posts = await fetchPosts();
      try {
        localStorage.setItem("posts", JSON.stringify(posts));
      } catch (err) {}
      this.posts = posts;
    } catch (err) {
      this.postsError = err;
      console.error(err);
    }
  }

  async fetchPostsByTags(tagId: number) {
    try {
      const cached = this.postsByTagsCache.get(tagId);
      if (cached) {
        this.postsByTags = cached;
      } else {
        const posts = await fetchPostsByTag(tagId);
        this.postsByTagsCache.set(tagId, posts);
        this.postsByTags = posts;
      }
    } catch (err) {
      this.postsByTagsError = err;
      console.error(err);
    }
  }

  async fetchTags() {
    try {
      const { data } = await fetchTags();
      this.tags = data;
    } catch (err) {
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

  async deleteTag(id: number) {
    try {
      await deleteTag(id);
      this.tags = this.tags?.filter((tag) => tag.id !== id);
    } catch (err) {
      console.error(err);
    }
  }

  async createPostToTags(postId: number, tagIds: Array<number>) {
    try {
      for await (let tagId of tagIds) {
        const res = await createPostToTag(postId, tagId);
        console.log(res);
      }
    } catch (err) {
      console.error(err);
    }
  }
}

export default BlogStore;
