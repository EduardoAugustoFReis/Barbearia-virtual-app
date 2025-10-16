import { theme } from "@/src/Theme";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const NewEmployeeForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleNewEmployee = async () => {
    try {
    } catch (error) {
      console.log("Erro ao cadastrar funcionário", error);
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Cadastre um novo funcionário</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Digite seu e-mail"
        placeholderTextColor={"#aaa"}
        keyboardType="email-address"
        accessibilityLabel="Campo do e-mail"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu e-mail"
        placeholderTextColor={"#aaa"}
        keyboardType="email-address"
        accessibilityLabel="Campo do e-mail"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Digite seu e-mail"
        placeholderTextColor={"#aaa"}
        keyboardType="email-address"
        accessibilityLabel="Campo do e-mail"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Digite sua senha"
        placeholderTextColor={"#aaa"}
        accessibilityLabel="Campo da senha"
        secureTextEntry
      />

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={handleNewEmployee}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </Pressable>
    </View>
  );
};

export default NewEmployeeForm;

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
    fontSize: 20,
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
