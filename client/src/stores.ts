import { ICurrentUser } from "./../type";
import { create } from "zustand";
import axios from "axios";

const getLocalStorage = <T>(key: string) => {
  const dataString = localStorage.getItem(key);
  return dataString ? (JSON.parse(dataString) as T) : null;
};
const setLocalStorage = (key: string, value: any) =>
  localStorage.setItem(key, JSON.stringify(value));

export interface IAuthState {
  loading: boolean;
  error: string | null;
  currentUser: ICurrentUser | null;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<IAuthState>()((set, get) => ({
  loading: false,
  error: null,
  currentUser: getLocalStorage<ICurrentUser>("currentUser"),
  login: async (identifier: string, password: string) => {
    try {
      set({ error: null, loading: true, currentUser: null });
      const res = await axios.post<ICurrentUser>(
        "http://localhost:1337/api/auth/local",
        {
          identifier,
          password,
        }
      );
      set({ loading: false, currentUser: res.data });
      setLocalStorage("currentUser", res.data);
    } catch (error) {
      set({ error: (error as any).message, loading: false });
      localStorage.removeItem("currentUser");
    }
  },
  logout: () => {
    set({ currentUser: null, error: null, loading: false });
    localStorage.removeItem("currentUser");
  },
}));
