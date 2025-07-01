import { create } from 'zustand';
import { deleteUser, getUsers, updateUser } from '../services/Auth';
import type { User } from "../interfaces/userInterface";

interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
  deleteUser: (userId: string) => void;
  editUser: (user: User) => void;
  fetchUsers: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    try {
      set({ isLoading: true });
      const usersData = await getUsers();
      set({ users: usersData });
    } catch (err) {
      console.error('Error:', err);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteUser: async (userId: string) => {
    try {
      await deleteUser(userId);
      set((state) => ({
        users: state.users.filter((user) => user.id !== userId),
      }));
    } catch (err) {
      console.error('Error deleting user:', err);
    } finally {
      set({ isLoading: false });
    }
  },

  editUser: async (user: User) => {
  try {
    await updateUser(user);
    set((state) => ({
      users: state.users.map((u) => (u.id === user.id ? user : u)),
    }));
  } catch (err) {
    console.error("Error updating user:", err);
  } finally {
    set({ isLoading: false });
  }
},

}));