import BarberHistory from "@/src/components/Home/Barber/BarberHistory";
import AppointmentForm from "@/src/components/Home/client/AppointmentForm";
import ClientHistory from "@/src/components/Home/client/ClientHistory";
import FetchBarbers from "@/src/components/Home/FetchBarbers";
import FetchServices from "@/src/components/Home/FetchServices";
import GreetingSection from "@/src/components/Home/GreetingSection";
import useAuth from "@/src/context/Auth/useAuth";
import { theme } from "@/src/Theme";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const Home = () => {
  const { user } = useAuth();
  return (
    <ScrollView
      style={styles.homeContainer}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <GreetingSection />

      <View style={styles.contentHome}>
        <Text style={styles.contentHomeTitle}>Conheça nossos barbeiros</Text>
        <FetchBarbers />
      </View>

      <View style={styles.contentHome}>
        <Text style={styles.contentHomeTitle}>Conheça nossos Serviços</Text>
        <FetchServices />
      </View>

      {user?.role === "cliente" && (
        <View style={styles.contentHome}>
          <Text style={styles.contentHomeTitle}>Agende seu horário</Text>
          <AppointmentForm />
        </View>
      )}

      {user?.role === "cliente" && (
        <View style={styles.contentHome}>
          <Text style={styles.contentHomeTitle}>Seu histórico</Text>
          <ClientHistory />
        </View>
      )}


       {user?.role === "barbeiro" && (
        <View style={styles.contentHome}>
          <Text style={styles.contentHomeTitle}>Seu histórico</Text>
          <BarberHistory />
        </View>
      )}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: theme.colors.backgroundScreen,
    flex: 1,
    padding: 12,
  },
  contentHome: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: theme.colors.green,
    borderRadius: 8,
    marginVertical: 10,
    padding: 12,
  },
  contentHomeTitle: {
    color: theme.colors.white,
    fontSize: 20,
  },
});
