import useAuth from "@/src/context/Auth/useAuth";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { Drawer } from "expo-router/drawer";
import CustomDrawerContent from "@/src/components/CustomDrawer";
import { theme } from "@/src/Theme";
import AppointmentProvider from "@/src/context/Appointments/AppointmentProvider";

export default function PrivateLayout() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!user && !loading) {
      router.replace("/");
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={theme.colors.green} />
      </View>
    );
  }

  return (
    <AppointmentProvider>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.backgroundColorForm,
          },
          headerTintColor: theme.colors.white,
          drawerStyle: {
            backgroundColor: theme.colors.backgroundColorForm,
          },
          drawerActiveTintColor: theme.colors.green,
          drawerInactiveTintColor: theme.colors.white,
          drawerLabelStyle: {
            fontSize: 16,
          },
        }}
      >
        <Drawer.Screen
          name="home"
          options={{
            drawerLabel: "Home",
            title: "Home",
          }}
        />

        <Drawer.Screen
          name="newService"
          options={{
            drawerLabel: "Novo Serviço",
            title: "Novo Serviço",
            drawerItemStyle: user?.role === "admin" ? {} : { display: "none" },
          }}
        />

        <Drawer.Screen
          name="newEmployee"
          options={{
            drawerLabel: "Novo Funcionário",
            title: "Novo Funcionário",
            drawerItemStyle: user?.role === "admin" ? {} : { display: "none" },
          }}
        />

        <Drawer.Screen
          name="myAccount"
          options={{
            drawerLabel: "Minha conta",
            title: "Minha conta",
          }}
        />
      </Drawer>
    </AppointmentProvider>
  );
}
