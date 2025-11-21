import { theme } from "@/src/Theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const GreetingSection = () => {
  return (
    <View style={styles.GreetingSectionContainer}>
      <Text style={styles.title}>Bem vindo a Barbearia Virtual!</Text>
      <Text style={styles.subtitle}>Agende seu corte já</Text>
    </View>
  );
};

export default GreetingSection;

const styles = StyleSheet.create({
  GreetingSectionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: theme.colors.white,
    fontSize: 22,
  },
  subtitle: {
    color: theme.colors.grey,
    fontSize: 18,
  },
});
