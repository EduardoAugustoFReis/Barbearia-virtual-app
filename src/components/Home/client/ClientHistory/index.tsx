import useAppointment from "@/src/context/Appointments/useAppointment";
import { api } from "@/src/services/api";
import { IAppointment } from "@/src/types";
import React, { useEffect } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { theme } from "@/src/Theme";
import { Feather } from "@expo/vector-icons";

const ClientHistory = () => {
  const { clientAppointments, setClientAppointments, removeAppointment } =
    useAppointment();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get<IAppointment[]>(`/appointments/client`);
        setClientAppointments(response.data);
      } catch (error) {
        console.log("erro ao buscar compromissos", error);
      }
    };
    fetchAppointments();
  }, [setClientAppointments]);

  const deleteAppointment = async (id: number) => {
    Alert.alert(
      "Cancelar compromisso",
      "Tem certeza que deseja excluir esse compromisso?",
      [
        { text: "Não", style: "cancel" },
        {
          text: "Sim",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/appointments/${id}`);
              removeAppointment(id, 'client' );
            } catch (error) {
              console.log("erro ao deletar agendamento", error);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.clientHistoryContainer}>
      {clientAppointments.map((appoint) => {
        const startTime = new Date(appoint.startTime);
        const endTime = new Date(appoint.endTime);

        const startFormatted = startTime.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        });

        const endFormatted = endTime.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <View key={appoint.id} style={styles.historyCard}>
            <Text style={styles.serviceName}>{appoint.service?.name}</Text>

            <Text style={styles.line}>
              <Text style={styles.label}>Barbeiro: </Text>
              {appoint.barber?.name}
            </Text>

            <Text style={styles.line}>
              <Text style={styles.label}>Email: </Text>
              {appoint.barber?.email}
            </Text>

            <Text style={styles.line}>
              <Text style={styles.label}>Telefone: </Text>
              {appoint.barber?.phone}
            </Text>

            <Text style={styles.line}>
              <Text style={styles.label}>Horário: </Text>
              {`${startFormatted} - ${endFormatted}`}
            </Text>

            <View style={styles.footer}>
              <Pressable
                style={styles.deleteButton}
                onPress={() => deleteAppointment(appoint.id)}
              >
                <Feather name="trash-2" size={20} color="white" />
              </Pressable>

              <View style={[styles.status, styles[appoint.status]]}>
                <Text style={styles.statusText}>{appoint.status}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default ClientHistory;

const styles = StyleSheet.create({
  clientHistoryContainer: {
    padding: 16,
  },
  historyCard: {
    backgroundColor: theme.colors.backgroundColorForm,
    marginBottom: 14,
    padding: 16,
    borderRadius: 10,
    elevation: 2,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.white,
    marginBottom: 10,
  },
  line: {
    fontSize: 15,
    color: theme.colors.grey,
    marginBottom: 4,
  },
  label: {
    fontWeight: "600",
    color: theme.colors.white,
  },
  footer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: theme.colors.red,
    padding: 10,
    borderRadius: 6,
  },
  status: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  statusText: {
    fontWeight: "700",
    textTransform: "uppercase",
    color: theme.colors.white,
  },
  pending: { backgroundColor: theme.colors.pending },
  confirmed: { backgroundColor: theme.colors.green },
  canceled: { backgroundColor: theme.colors.red },
});
