import { LoginCredentials, RegistrationCredentials } from "../types/User";
import { client, userService } from "./client";


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