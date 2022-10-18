import {
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

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
    <KeyboardAvoidingView
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.signUpContainer}>
          <ScrollView>
            <SignupForm onSignup={onSignup} onClose={onClose} />
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  container: {
    flex: 1,
  },
});

export default Signup;
