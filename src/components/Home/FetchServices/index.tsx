import { api } from "@/src/services/api";
import { theme } from "@/src/Theme";
import { IService } from "@/src/types";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const FetchServices = () => {
  const [services, setServices] = useState<IService[] | []>([]);

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

  return (
    <View style={styles.fetchServicesContainer}>
      {services.map((service) => {
        return (
          <View style={styles.serviceCard} key={service.id}>
            <Text style={styles.textCard}>{service.name}</Text>
            <Text style={styles.textCard}>Preço: {service.price}</Text>
            <Text style={styles.textCard}>Duração: {service.duration}</Text>
          </View>
        );
      })}
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
  },
  textCard: {
    textAlign: 'center',
    color: theme.colors.grey,
    fontSize: 16,
  },
});
