import { theme } from "@/src/Theme";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

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
        placeholder="Digite o nome"
        placeholderTextColor={"#aaa"}
        accessibilityLabel="Campo do e-mail"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Digite o e-mail"
        placeholderTextColor={"#aaa"}
        keyboardType="email-address"
        accessibilityLabel="Campo do e-mail"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Digite o telefone ex: 61 999999999"
        placeholderTextColor={"#aaa"}
        accessibilityLabel="Campo do e-mail"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Digite a senha"
        placeholderTextColor={"#aaa"}
        accessibilityLabel="Campo da senha"
        secureTextEntry
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={role}
          onValueChange={(itemValue) => setRole(itemValue)}
          style={styles.picker}
          dropdownIconColor={theme.colors.grey}
        >
          <Picker.Item label="Barbeiro" value="barbeiro" />
          <Picker.Item label="Admin" value="admin" />
        </Picker>
      </View>

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
  pickerContainer: {
    borderWidth: 1,
    borderColor: theme.colors.grey,
    borderRadius: 8,
    marginVertical: 10,
    overflow: "hidden",
  },
  picker: {
    color: theme.colors.grey,
    backgroundColor: theme.colors.backgroundColorForm,
  },
  buttonPressed: {
    opacity: 0.7,
  },
});
