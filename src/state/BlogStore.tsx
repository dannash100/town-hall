import { makeAutoObservable } from "mobx";

class BlogStore {
  posts = [];

  constructor() {
    makeAutoObservable(this);
  }
}

export default BlogStore;
