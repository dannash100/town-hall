import { makeAutoObservable } from "mobx";

class UserStore {
  user = undefined;

  testCount = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increment() {
    this.testCount++;
  }
}

export default UserStore;
