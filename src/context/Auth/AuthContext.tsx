import { IUser } from "@/src/types";
import { createContext } from "react";

interface AuthContextProps {
  user: IUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{success: boolean; user: IUser | null}>;
  logout: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);