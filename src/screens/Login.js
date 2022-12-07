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

import React, { useEffect, useContext } from "react";

import client from "../../api/client";
//import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "../../context/auth";

function Login({ navigation }) {
  const [state, setState] = useContext(AuthContext);

  function onLogin(personObject) {
    
    //console.log(personObject)
    console.log(state.user.calories)
    console.log(state.user.name)

    navigation.navigate("BottomTab", {
      screen: "Home",
      params: {
        ...personObject,
        chosenPlan: { carbs: state.user.carbs, protein: state.user.protein, fat: state.user.fat },
        userCalories: state.user.calories,
        userName: state.user.name,
      },
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
    color: "crimson",
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
