import FormScreenContainer from "@/src/components/Containers/FormScreenContainer";
import NewEmployeeForm from "@/src/components/Forms/NewEmployeeForm";
import { StyleSheet } from "react-native";

const NewEmployee = () => {
  return (
    <FormScreenContainer>
      <NewEmployeeForm />
    </FormScreenContainer>
  );
};

export default NewEmployee;

const styles = StyleSheet.create({
  
});
