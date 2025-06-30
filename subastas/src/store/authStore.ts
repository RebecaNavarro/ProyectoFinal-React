import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../interfaces/userInterface";

interface authStoreInterface{
    user: User;
    token: string;
    isAdmin: boolean;
    isAuth: boolean;
    setIsAuth: (isAuth: boolean) => void;
    setUser: (user: User) => void;
    setToken: (token: string) => void;
    setIsAdmin: (isAdmin: boolean) => void;
    resetAuth: () => void;
}

export const useAuthStore = create<authStoreInterface>()(
  persist(
    (set) => ({
      user: {} as User,
      token: "",
      isAdmin: false,
      isAuth: false,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setIsAdmin: (isAdmin) => set({ isAdmin }),
      setIsAuth: (isAuth) => set({ isAuth }),
      resetAuth: () => set({ user: {} as User, token: "", isAdmin: false }),
    }),
    {
      name: "auth",
    }
  )
);