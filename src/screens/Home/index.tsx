import FetchBarbers from "@/src/components/Home/FetchBarbers";
import FetchServices from "@/src/components/Home/FetchServices";
import GreetingSection from "@/src/components/Home/GreetingSection";
import { theme } from "@/src/Theme";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const Home = () => {
  return (
    <ScrollView
      style={styles.HomeContainer}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <GreetingSection />
      <View style={styles.fetchApiContainerHome}>
        <Text style={styles.fetchApiContainerHomeTitle}>
          Conheça nossos barbeiros
        </Text>
        <FetchBarbers />
      </View>

      <View style={styles.fetchApiContainerHome}>
        <Text style={styles.fetchApiContainerHomeTitle}>
          Conheça nossos Serviços
        </Text>
        <FetchServices />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  HomeContainer: {
    backgroundColor: theme.colors.backgroundScreen,
    flex: 1,
  },
  fetchApiContainerHome: {
    justifyContent: "center",
    alignItems: "center",
  },
  fetchApiContainerHomeTitle: {
    color: theme.colors.white,
    fontSize: 20,
  },
});
