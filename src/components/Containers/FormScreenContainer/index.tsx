import { theme } from "@/src/Theme";
import { ReactNode } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface FormScreenContainerProps {
  children: ReactNode;
}


const FormScreenContainer = ({children}: FormScreenContainerProps) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
      style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default FormScreenContainer;

const styles = StyleSheet.create({
   safeArea: {
    flex: 1,
    backgroundColor: theme.colors.backgroundScreen,
  },
  flex: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
})