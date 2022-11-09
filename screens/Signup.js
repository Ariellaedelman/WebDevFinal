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
import FontAwesome from "@expo/vector-icons/FontAwesome";

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
        <View
          style={{
            alignSelf: "flex-start",
            marginLeft: 10,
          }}
        >
          <FontAwesome.Button
            name="close"
            size={25}
            onPress={onClose}
            backgroundColor={"#003f5c"}
          />
        </View>
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
