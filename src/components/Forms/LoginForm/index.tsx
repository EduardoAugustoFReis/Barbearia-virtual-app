import useAuth from "@/src/context/Auth/useAuth";
import { theme } from "@/src/Theme";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Preencha todos os campos");
      return;
    }
    try {
      const { success, user } = await login(email, password);

      if (success && user) {
        router.replace("/(app)/home");
      } else {
        alert("E-mail ou senha inválidos.");
      }
    } catch (error) {
      console.error("Erro inesperado no login:", error);
      alert("Erro ao conectar ao servidor. Tente novamente mais tarde.");
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.subtitle}>Faça o seu login</Text>
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
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Acessar</Text>
      </Pressable>

      <Link href={`/signUp`} style={styles.link}>
        Não tem uma conta? crie já
      </Link>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  form: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: theme.colors.backgroundColorForm,
    padding: 24,
    borderRadius: 8,
  },
  subtitle: {
    color: theme.colors.white,
    textAlign: "center",
    fontSize: 24,
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
