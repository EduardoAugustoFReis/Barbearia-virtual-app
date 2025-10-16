import Logo from "@/src/components/Logo";
import { theme } from "@/src/Theme";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WelcomeScreen = () => {
  const handleToLogin = () => {
    router.replace("/login");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "right", "left"]}>
      <Logo width={180} height={180}/>
      <View style={styles.content}>
        <Text style={styles.title}>Bem vindo(a) Barbearia Vitual!</Text>
        <Text style={styles.subtitle}>
          Venha agendar o seu corte!
        </Text>

        <Pressable onPress={handleToLogin} style={styles.button}>
          <Text style={styles.buttonText}>Iniciar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundScreen,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 12,
    backgroundColor: theme.colors.backgroundColorForm,
    borderRadius: 8,
    gap: 12,
  },
  title: {
    color: theme.colors.white,
    fontSize: 22,
    textAlign: "center",

  },
  subtitle: {
    color: theme.colors.grey,
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    backgroundColor: theme.colors.green,
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    color: theme.colors.white,
  },
});
