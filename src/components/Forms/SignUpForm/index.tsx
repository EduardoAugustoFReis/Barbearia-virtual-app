import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { Link } from "expo-router";
import { theme } from "@/src/Theme";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleSignUp = async () => {};

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Crie sua conta</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        keyboardType="name-phone-pad"
        autoCapitalize="none"
        accessibilityLabel="Campo do nome"
        placeholder="Digite o seu nome"
        placeholderTextColor={"#aaa"}
      />

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        accessibilityLabel="Campo do e-mail"
        placeholder="Digite seu E-mail"
        placeholderTextColor={"#aaa"}
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        accessibilityLabel="Campo da senha"
        placeholder="Digite sua senha"
        placeholderTextColor={"#aaa"}
      />

      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        accessibilityLabel="Campo do telefone"
        placeholder="Digite seu telefone"
        placeholderTextColor={"#aaa"}
      />

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>Criar conta</Text>
      </Pressable>

      <Link href={`/`} style={styles.link}>
        Já tem uma conta? faça o login
      </Link>
    </View>
  );
};

export default SignUpForm;

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
  link: {
    marginTop: 10,
    color: theme.colors.grey,
    textAlign: "center",
    fontSize: 16,
  },
});
