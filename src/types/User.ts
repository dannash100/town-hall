type User = {
  email: string;
  username: string;
}

export type LoginCredentials = {
  username: string;
  password: string;
}

export type RegistrationCredentials = User & {
  password: string
}

export default User