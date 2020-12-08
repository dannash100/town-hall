import { makeAutoObservable } from "mobx";
import {
  login,
  logout,
  register,
  fetchUsers,
  patchUser,
  deleteUser,
} from "../api/auth";
import User, {
  LoginCredentials,
  RegistrationCredentials,
  UserPatchData,
} from "../types/User";

class UserStore {
  user?: User;
  users?: Array<User>;

  constructor() {
    makeAutoObservable(this);
  }

  async register(credentials: RegistrationCredentials) {
    try {
      const { user } = await register(credentials);
      this.user = user;
      return user;
    } catch (err) {
      console.log(err);
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

  async fetchUsers() {
    try {
      const users = await fetchUsers();
      this.users = users.filter(user => user.id !== this?.user?.id);
    } catch (err) {
      console.error(err);
    }
  }

  async patchUser(id: number, data: UserPatchData) {
    try {
      const updatedUser = await patchUser(id, data);
      this.users = this.users?.map((user) =>
        user.id === id ? updatedUser : user
      );
    } catch (err) {
      console.error(err);
    }
  }

  async deleteUser(id: number) {
    try {
      await deleteUser(id);
      this.users = this.users?.filter((user) => user.id !== id);
    } catch (err) {
      console.error(err);
    }
  }
}

export default UserStore;
