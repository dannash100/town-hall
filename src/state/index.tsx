import React, { createContext, useContext } from "react";
import BlogStore from "./BlogStore";
import UserStore from "./UserStore";

const UserContext = createContext<UserStore | null>(null);
const BlogContext = createContext<BlogStore | null>(null);

interface ProviderProps {
  children: React.ReactNode;
}

const providerError = (storeName: string): never => {
  throw new Error(`You have forgotten to use ${storeName} provider`);
};

export const UserProvider = ({ children }: ProviderProps) => (
  <UserContext.Provider value={new UserStore()}>
    {children}
  </UserContext.Provider>
);

export const useUserStore = () => {
  const store = useContext(UserContext);
  if (!store) throw providerError("User Store");
  return store;
};

export const BlogProvider = ({ children }: ProviderProps) => (
  <BlogContext.Provider value={new BlogStore()}>
    {children}
  </BlogContext.Provider>
);

export const useBlogStore = () => {
  const store = useContext(BlogContext);
  if (!store) throw providerError("Blog Store");
  return store;
};
