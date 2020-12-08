import User, { LoginCredentials, RegistrationCredentials, UserPatchData } from "../types/User";
import { client, userService } from "./client";

export const logout = () => client.logout();

export const login = async (credentials?: LoginCredentials) => {
  try {
    if (!credentials) {
      // Try to authenticate using an existing token
      const res = await client.reAuthenticate()
      return res
    } else {
      // Otherwise log in with the `local` strategy using credentials
      const res = await client
        .authenticate({
          strategy: "local",
          ...credentials,
        })
      return res
    }
  } catch (err) {
    throw err;
  }
};

export const register = async (credentials: RegistrationCredentials) => {
  try {
    await userService.create(credentials);
    const { username, password } = credentials;
    return await login({ username, password });
  } catch (err) {
    throw err;
  }
};

export const fetchUsers = async () : Promise<User[]> => {
  try {
    const { data } = await userService.find({
      query: {
        $select: ['id', 'username', 'email', 'approved']
      }
    });
    return data;
  } catch (err) {
    throw err
  }
}

export const patchUser = (id: number, data: UserPatchData) => userService.patch(id, data)

export const deleteUser = (id: number) => userService.remove(id)