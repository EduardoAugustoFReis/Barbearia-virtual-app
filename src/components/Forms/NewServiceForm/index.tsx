import { theme } from "@/src/Theme";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const NewServiceForm = () => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");

  const handleNewService = async () => {
    
  }

  return (
    <View>
      <Text>Cadastre um novo Serviço</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        keyboardType="default"
        autoCapitalize="none"
        placeholder="Digite o nome do serviço"
        placeholderTextColor={theme.colors.grey}
      />

      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={setDuration}
        keyboardType="number-pad"
        autoCapitalize="none"
        placeholder="Digite a duração do serviço"
        placeholderTextColor={theme.colors.grey}
      />

      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="number-pad"
        autoCapitalize="none"
        placeholder="Digite o preço do serviço"
        placeholderTextColor={theme.colors.grey}
      />

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={handleNewService}
      >
        <Text style={styles.buttonText}>Criar conta</Text>
      </Pressable>
    </View>
  );
};

export default NewServiceForm;
const styles = StyleSheet.create({
  form: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: theme.colors.backgroundColorForm,
    padding: 24,
    borderRadius: 8,
  },
  title: {
    color: theme.colors.white,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
  },
  input: {
    color: theme.colors.white,
    fontSize: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: theme.colors.grey,
    borderRadius: 8,
    marginVertical: 10,
  },
  button: {
    backgroundColor: theme.colors.green,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: theme.colors.white,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonPressed: {
    opacity: 0.7,
  },
});
