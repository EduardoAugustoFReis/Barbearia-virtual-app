import FormScreenContainer from "@/src/components/Containers/FormScreenContainer";
import { Link } from "expo-router";
import { StyleSheet, Text } from "react-native";

const NewEmployee = () => {
  return (
    <FormScreenContainer>
      <Link href={`/home`} style={styles.link}>
        Voltar para a Home
      </Link>
      <Text>Novo funcionário</Text>
    </FormScreenContainer>
  );
};

export default NewEmployee;

const styles = StyleSheet.create({
  link: {
    marginTop: 10,
    color: "#ccc",
    textAlign: "center",
    fontSize: 16,
  },
});
