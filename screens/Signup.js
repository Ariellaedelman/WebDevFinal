import {
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SignupForm from "../forms/SignupForm";

function Signup({ navigation }) {
  function onSignup(personObject) {
    navigation.navigate("BottomTab", {
      screen: "Home",
      params: personObject,
    });
  }
  function onClose() {
    navigation.navigate("Login");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.signUpContainer}>
        <KeyboardAwareScrollView>
          <SignupForm onSignup={onSignup} onClose={onClose} />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  signUpContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#003f5c",
    //borderWidth: 2,
    //borderColor: "red",
  },
});

export default Signup;
