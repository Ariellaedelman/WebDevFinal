import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LoginForm from "../forms/LoginForm";

function Login({ navigation }) {
  function onLogin(personObject) {
    navigation.navigate("BottomTab", {
      screen: "Home",
      params: personObject,
      /*
      {
        name: "Cal-U-Trition",
        calories: 2000,
      },
      */
    });
  }
  function onSignup() {
    navigation.navigate("Signup");
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.loginContainer}>
        <Text style={styles.logo}>CAL-UTRITION</Text>
        <KeyboardAwareScrollView style={styles.scrollViewContainer}>
          <LoginForm onLogin={onLogin} onSignup={onSignup} />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 80,
    backgroundColor: "#003f5c",
    //borderWidth: 2,
    //borderColor: "red",
  },
  logo: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fb5b5a",
    marginBottom: 30,
    marginTop: 50,
  },
  scrollViewContainer: {
    //borderWidth: 2,
    //borderColor: "white",
    width: "90%",
  },
});

export default Login;
