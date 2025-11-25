import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { View, Text, StyleSheet } from "react-native";
import useAuth from "@/src/context/Auth/useAuth";
import { theme } from "@/src/Theme";

export default function CustomDrawerContent({
  navigation,
  state,
  descriptors,
}: DrawerContentComponentProps) {
  const { logout, user } = useAuth();

  return (
    <DrawerContentScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>{user?.name ?? "Usuário"}</Text>
        <Text style={styles.email}>E-mail: {user?.email}</Text>
        <Text style={styles.phone}>Telefone: {user?.phone}</Text>
      </View>

      <DrawerItemList
        state={state}
        descriptors={descriptors}
        navigation={navigation}
      />

      <View style={styles.footer}>
        <DrawerItem
          label="Sair"
          labelStyle={{ color: theme.colors.white }}
          onPress={logout}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundColorForm,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderDrawer,
  },
  username: {
    color: theme.colors.green,
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    color: theme.colors.grey,
    fontSize: 14,
  },
  phone: {
    color: theme.colors.grey,
    fontSize: 14,
  },
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderDrawer,
  },
});
