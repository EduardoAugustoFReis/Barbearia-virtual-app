import { theme } from "@/src/Theme";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import useAuth from "@/src/context/Auth/useAuth";
import { api } from "@/src/services/api";

const FormMyAccount = () => {
  const { setUser } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);

  const handlePickImage = async () => {
    Alert.alert(
      "Permissão necessária",
      "Precisamos do acesso à sua galeria para escolher uma imagem.",
      [
        {
          text: "OK",
          onPress: async () => {
            const permission =
              await ImagePicker.requestCameraPermissionsAsync();

            if (!permission.granted) {
              alert(
                "Você precisa permitir o acesso às imagens para continuar."
              );
              return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ["images"],
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });

            if (!result.canceled) {
              setAvatar(result.assets[0].uri);
            }
          },
        },
      ]
    );
  };

  const handleMyAccount = async () => {
    const formData = new FormData();

    if (name.trim()) formData.append("name", name);
    if (email.trim()) formData.append("email", email);
    if (password.trim()) formData.append("password", password);
    if (phone.trim()) formData.append("phone", phone);

    if (avatar) {
      formData.append("avatar", {
        uri: avatar,
        name: "avatar.png",
        type: "image/jpeg",
      } as any);
    }

    try {
      const response = await api.put(`/users`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUser(response.data);
      alert("Dados atualizados com sucesso.");
    } catch (error) {
      console.log("Erro ao atualizar dados cadastrais", error);
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Atualize os dados da sua conta</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        keyboardType="default"
        autoCapitalize="none"
        placeholder="Digite o novo nome"
        placeholderTextColor={theme.colors.grey}
      />

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="default"
        autoCapitalize="none"
        placeholder="Digite o novo e-mail"
        placeholderTextColor={theme.colors.grey}
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        keyboardType="default"
        secureTextEntry
        autoCapitalize="none"
        placeholder="Digite a nova senha"
        placeholderTextColor={theme.colors.grey}
      />

      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="default"
        autoCapitalize="none"
        placeholder="Ex: (61) 99999-9999"
        placeholderTextColor={theme.colors.grey}
      />

      <Pressable
        style={({ pressed }) => [
          styles.buttonPick,
          pressed && styles.buttonPressed,
        ]}
        onPress={handlePickImage}
      >
        <Text style={styles.buttonText}>Selecione sua imagem</Text>
      </Pressable>

      <View style={styles.imageContainer}>
        {avatar && <Image source={{ uri: avatar }} style={styles.image} />}
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={handleMyAccount}
      >
        <Text style={styles.buttonText}>Criar conta</Text>
      </Pressable>
    </View>
  );
};

export default FormMyAccount;

const styles = StyleSheet.create({
  form: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: theme.colors.backgroundColorForm,
    padding: 24,
    borderRadius: 8,
    gap: 10,
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
  buttonPick: {
    backgroundColor: theme.colors.red,
    paddingVertical: 12,
    borderRadius: 8,
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
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
});
