import { useContext } from "react"
import { AuthContext } from "./AuthContext";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error ("Esse contexto deve ser usado com o provider respectivo.");
  }

  return context;
}

export default useAuth
