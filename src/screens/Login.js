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

import { useDispatch } from "react-redux";
import { setUser } from "../redux/user";
import { setCalories } from "../redux/calories";
import { setGlobalFoods } from "../redux/foods";
import { setFat } from "../redux/fat";
import { setProtein } from "../redux/protein";
import { setCarbs } from "../redux/carbs";
import { setStars } from "../redux/stars";
import { setRating } from "../redux/rating";

function Login({ navigation }) {
  const [state, setState] = useContext(AuthContext);
  const dispatch = useDispatch();

  async function onLogin(personObject) {
    //const macro_plan = state.user.curr_macro_plan;
    
    // const { data } = await client.get();

    //const todayDate = new Date().toISOString().split('T')[0]; *OLD METHOD*
    const todayDate = new Date().toLocaleDateString('en-CA').split('T')[0];
  
    //testing
    console.log('this is the date rn: ', new Date().toLocaleDateString('en-CA').split('T')[0]);

    const userDBFoods = {
      user_id: state.user._id,
      date: todayDate,
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        "Access-Control-Allow-Origin": "*",
      },
    };

    try {
      const res = await client.post("/api/get-foods", userDBFoods, config);
      console.log("foods array: ", res.data);

      if (res.data.error) {
        alert(res.data.error);
      } else {
        //setState(res.data);
        //await AsyncStorage.setItem("auth-rn", JSON.stringify(res.data))
        dispatch(setGlobalFoods(res.data))
        console.log(state.user)
        alert("Update Successful");
      }
    } catch (error) {
      console.log(error.message);
    }


    dispatch(
      setUser({
        macro_plan: state.user.macro_plan,
        calories: state.user.calories,
        protein: state.user.protein,
        carbs: state.user.carbs,
        fat: state.user.fat,
        name: state.user.name,
      })
    );

    //const calories = state.user.curr_calories;
    //const fat = state.user.curr_fat;
    //const protein = state.user.curr_protein;
    //const carbs = state.user.curr_carbs;
    //const rating = state.user.rating;
    //const stars = state.user.stars;

    dispatch(setCalories(state.user.curr_calories));
    dispatch(setProtein(state.user.curr_protein));
    dispatch(setFat(state.user.curr_fat));
    dispatch(setCarbs(state.user.curr_carbs));
    dispatch(setStars(state.user.stars));
    dispatch(setRating(state.user.rating));

    navigation.navigate("BottomTab", {
      screen: "Home",
      params: {
        ...personObject,
        chosenPlan: {
          carbs: state.user.carbs,
          protein: state.user.protein,
          fat: state.user.fat,
        },
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
