import useAppointment from "@/src/context/Appointments/useAppointment";
import { api } from "@/src/services/api";
import { IAppointment } from "@/src/types";
import React, { useEffect } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "@/src/Theme";

const BarberHistory = () => {
  const { barberAppointments, setBarberAppointments } = useAppointment();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get<IAppointment[]>(`/appointments/barbers`);
        setBarberAppointments(response.data);
      } catch (error) {
        console.log("erro ao buscar compromissos", error);
      }
    };
    fetchAppointments();
  }, [setBarberAppointments]);

  const handleChangeAppointmentStatus = async (
    id: number,
    statusChanged: "confirmed" | "canceled"
  ) => {
    try {
      await api.patch(`/appointments/${id}`, { status: statusChanged });

      setBarberAppointments((prev) =>
        prev.map((appoint) =>
          appoint.id === id ? { ...appoint, status: statusChanged } : appoint
        )
      );
    } catch (error) {
      console.log("erro ao alterar status", error);
    }
  };

  const deleteAppointment = async (id: number) => {
    Alert.alert(
      "Atenção",
      "Tem certeza que deseja excluir esse compromisso?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`/appointments/${id}`);
              setBarberAppointments((prev) => prev.filter((a) => a.id !== id));
            } catch (error) {
              console.log("Erro ao deletar", error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {barberAppointments.map((appoint) => {
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
          <View key={appoint.id} style={styles.card}>
            <Text style={styles.serviceName}>{appoint.service?.name}</Text>

            <Text style={styles.text}>
              <Text style={styles.bold}>Cliente: </Text>
              {appoint.client?.name}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>E-mail: </Text>
              {appoint.client?.email}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Telefone: </Text>
              {appoint.client?.phone}
            </Text>

            <Text style={styles.text}>
              <Text style={styles.bold}>Horário: </Text>
              {`${startFormatted} - ${endFormatted}`}
            </Text>

            <View style={styles.buttonsRow}>
              <Pressable
                style={[styles.button, styles.cancelBtn]}
                onPress={() =>
                  handleChangeAppointmentStatus(appoint.id, "canceled")
                }
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.confirmBtn]}
                onPress={() =>
                  handleChangeAppointmentStatus(appoint.id, "confirmed")
                }
              >
                <Text style={styles.buttonText}>Confirmar</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.deleteBtn]}
                onPress={() => deleteAppointment(appoint.id)}
              >
                <Text style={styles.buttonText}>Excluir</Text>
              </Pressable>
            </View>

            <View style={[styles.status, styles[appoint.status]]}>
              <Text style={styles.statusText}>{appoint.status}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default BarberHistory;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: theme.colors.backgroundColorForm,
    marginBottom: 16,
    padding: 16,
    borderRadius: 10,
    elevation: 4,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.white,
    marginBottom: 8,
  },
  text: {
    color: theme.colors.white,
    marginBottom: 4,
  },
  bold: {
    fontWeight: "700",
    color: theme.colors.white,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
    gap: 5,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  cancelBtn: {
    backgroundColor: theme.colors.red,
  },
  confirmBtn: {
    backgroundColor: theme.colors.green,
  },
  deleteBtn: {
    backgroundColor: theme.colors.grey,
  },
  buttonText: {
    fontWeight: "600",
    color: theme.colors.white,
  },
  status: {
    marginTop: 10,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: "center",
  },

  pending: { backgroundColor: theme.colors.pending },
  canceled: { backgroundColor: theme.colors.red },
  confirmed: { backgroundColor: theme.colors.green },

  statusText: {
    fontWeight: "700",
    textTransform: "uppercase",
    color: theme.colors.white,
  },
});
