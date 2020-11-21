import { makeAutoObservable } from "mobx";
import { login, logout, register } from "../api/auth";
import User, { LoginCredentials, RegistrationCredentials } from "../types/User";

class UserStore {
  user?: User;

  constructor() {
    makeAutoObservable(this);
  }

  async register(credentials: RegistrationCredentials) {
    try {
      const { user } = await register(credentials);
      this.user = user;
      return user;
    } catch (err) {
      console.log(err)
      throw err;
    }
  }

  async login(credentials?: LoginCredentials) {
    try {
      const { user } = await login(credentials);
      this.user = user;
      return user;
    } catch (err) {
      throw err;
    }
  }

  async logout() {
    await logout();
    this.user = undefined;
  }
}

export default UserStore;
