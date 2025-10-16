import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"

export const api = axios.create({
  baseURL: "http://192.168.15.95:3333",
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    // se não existir headers ainda, inicializa
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
