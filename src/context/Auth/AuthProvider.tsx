import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { IUser } from "@/src/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "@/src/services/api";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserAndToken = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      const token = await AsyncStorage.getItem("token");

      if (storedUser && token) setUser(JSON.parse(storedUser));
      setLoading(false);
    };
    loadUserAndToken();
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; user: IUser | null }> => {
    setLoading(true);
    try {
      const response = await api.post("/login", { email, password });

      const { user: loggedUser, token } = response.data;

      await AsyncStorage.setItem("user", JSON.stringify(loggedUser));
      await AsyncStorage.setItem("token", token);

      setUser(loggedUser);
      return { success: true, user: loggedUser };
    } catch (error) {
      console.log("Erro ao fazer login.", error);
      return { success: false, user: null };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ login, loading, user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
