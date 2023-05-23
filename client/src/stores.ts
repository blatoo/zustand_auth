import { ICurrentUser } from "./../type";
import { create } from "zustand";
import axios from "axios";
import { createJSONStorage, persist } from "zustand/middleware";
import { mountStoreDevtool } from "simple-zustand-devtools";

export interface IAuthState {
  loading: boolean;
  error: string | null;
  currentUser: ICurrentUser | null;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<IAuthState>()(
  persist(
    (set, get) =>
      ({
        loading: false,
        error: null,

        currentUser: null,
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
          } catch (error) {
            set({ error: (error as any).message, loading: false });
            localStorage.removeItem("currentUser");
          }
        },
        logout: () => {
          set({ currentUser: null, error: null, loading: false });
        },
      } as any),
    {
      name: "currentUser",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ currentUser: state.currentUser }),
    }
  )
);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Store", useAuthStore);
}
