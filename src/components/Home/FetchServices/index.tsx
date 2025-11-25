import { api } from "@/src/services/api";
import { theme } from "@/src/Theme";
import { IService } from "@/src/types";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import useAuth from "@/src/context/Auth/useAuth";

const FetchServices = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<IService[]>([]);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await api.get(`/services`);
        setServices(response.data);
      } catch (error) {
        console.log("Erro ao buscar serviço", error);
      }
    };
    fetchService();
  }, []);

  const handleDeleteService = async (id: number) => {
    try {
      await api.delete(`/services/${id}`);
      setServices(prev => prev.filter(service => service.id !== id));
    } catch (error) {
      console.log("Erro ao deletar serviço", error);
    }
  };

  return (
    <View style={styles.fetchServicesContainer}>
      {services.map((service) => (
        <View style={styles.serviceCard} key={service.id}>

          
          {user?.role === "admin" && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteService(service.id)}
            >
              <Feather name="trash-2" size={22} color={theme.colors.red} />
            </TouchableOpacity>
          )}

          <Text style={styles.textCard}>{service.name}</Text>
          <Text style={styles.textCard}>Preço: {service.price}</Text>
          <Text style={styles.textCard}>Duração: {service.duration}</Text>
        </View>
      ))}
    </View>
  );
};

export default FetchServices;

const styles = StyleSheet.create({
  fetchServicesContainer: {
    width: "90%",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  serviceCard: {
    backgroundColor: theme.colors.backgroundColorForm,
    gap: 6,
    borderRadius: 10,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    position: "relative", 
  },
  deleteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    padding: 6,
  },
  textCard: {
    textAlign: "center",
    color: theme.colors.grey,
    fontSize: 16,
  },
});
