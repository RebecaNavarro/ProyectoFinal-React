import jsonServerInstance from "../api/jsonInstance";
import type { User } from "../interfaces/userInterface";

const USERS_URL = "users";

export const getUser = async (name: string) => {
  try {
    const response = await jsonServerInstance.get(USERS_URL, {
      params: { name },
    });
    return response.data[0];
  } catch (error) {
    console.error("Error searching user by name", error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await jsonServerInstance.get(USERS_URL);
    return response.data;
  } catch (error) {
    console.error("Error getting users", error);
    throw error;
  }
};

export const registerUser = async (
  name: string,
  password: string,
  role: string
) => {
  try {
    const response = await jsonServerInstance.post(USERS_URL, {
      name,
      password,
      role,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user", error);
    throw error;
  }
};

export const updateUser = async (user: User) => {
  try {
    const response = await jsonServerInstance.put(`${USERS_URL}/${user.id}`, user);
    return response.data;
  } catch (error) {
    console.error("Error updating user", error);
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await jsonServerInstance.delete(`${USERS_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user", error);
    throw error;
  }
};