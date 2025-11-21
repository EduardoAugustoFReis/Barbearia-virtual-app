import FormScreenContainer from "@/src/components/Containers/FormScreenContainer";
import FormMyAccount from "@/src/components/Forms/MyAccountForm";
import { Text } from "react-native";

const MyAccount = () => {
  return (
    <FormScreenContainer>
      <Text>Minha conta</Text>
      <FormMyAccount />
    </FormScreenContainer>
  );
};

export default MyAccount;
