import { api } from "@/src/services/api";
import { theme } from "@/src/Theme";
import { IUser } from "@/src/types";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const FetchBarbers = () => {
  const [barbers, setBarbers] = useState<IUser[] | []>([]);

  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const response = await api.get(`/users/barbers`);

        setBarbers(response.data);
      } catch (error) {
        console.log("Erro ao buscar barbeiros", error);
      }
    };
    fetchBarbers();
  }, []);

  return (
    <View style={styles.fetchBarbersContainer}>
      {barbers.map((barber) => {
        return (
          <View key={barber.id} style={styles.barberCard}>
            <Image
              source={{
                uri: `${api.defaults.baseURL}${barber.avatar}`,
              }}
              style={styles.avatarCard}
            />
            <Text style={styles.textCard}>{barber.name}</Text>
            <Text style={styles.textCard}>{barber.email}</Text>
            <Text style={styles.textCard}>{barber.phone}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default FetchBarbers;

const styles = StyleSheet.create({
  fetchBarbersContainer: {
    width: "90%",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  barberCard: {
    backgroundColor: theme.colors.backgroundColorForm,
    gap: 6,
    borderRadius: 10,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarCard: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  textCard: {
    color: theme.colors.grey,
    fontSize: 16,
  },
});
