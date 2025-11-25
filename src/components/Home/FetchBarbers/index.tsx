import { api } from "@/src/services/api";
import { theme } from "@/src/Theme";
import { IUser } from "@/src/types";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import useAuth from "@/src/context/Auth/useAuth";

const FetchBarbers = () => {
  const { user } = useAuth();
  const [barbers, setBarbers] = useState<IUser[]>([]);

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

  const handleDeleteBarber = async (id: number) => {
    try {
      await api.delete(`/users/${id}`);
      setBarbers((prev) => prev.filter((b) => b.id !== id));
    } catch (error) {
      console.log("Erro ao deletar barbeiro", error);
    }
  };

  return (
    <View style={styles.fetchBarbersContainer}>
      {barbers.map((barber) => (
        <View key={barber.id} style={styles.barberCard}>
          
          {user?.role === "admin" && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteBarber(barber.id)}
            >
              <Feather name="trash-2" size={22} color={theme.colors.red} />
            </TouchableOpacity>
          )}

          <Image
            source={{ uri: `${api.defaults.baseURL}${barber.avatar}` }}
            style={styles.avatarCard}
          />
          <Text style={styles.textCard}>{barber.name}</Text>
          <Text style={styles.textCard}>{barber.email}</Text>
          <Text style={styles.textCard}>{barber.phone}</Text>
        </View>
      ))}
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
    position: "relative", 
  },
  deleteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    padding: 6,
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
