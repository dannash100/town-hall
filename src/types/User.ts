type User = {
  email: string;
  username: string;
  id?: number;
  approved?: boolean;
}

export type LoginCredentials = {
  username: string;
  password: string;
}

export type RegistrationCredentials = User & {
  password: string
}

export type UserPatchData = {
  approved?: boolean;
  username?: string;
  email?: string;
}

export default User