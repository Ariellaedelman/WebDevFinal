import { StatusBar } from "expo-status-bar";
import React, { useState, useContext } from "react";
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
import { Formik } from "formik";
import * as yup from "yup";
import { FontAwesome } from "@expo/vector-icons";

import client from "../../api/client";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "../../context/auth";

const LoginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});

function LoginForm(loginProps) {
  const userInfo = {
    email: "",
    password: "",
  };

  const { email, password } = userInfo;

  const [state, setState] = useContext(AuthContext);
  const [hidePassword, setHidePassword] = useState(true);

  const signIn = async (values, actions) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        "Access-Control-Allow-Origin": "*",
      },
    };

    try {
      const res = await client.post("/api/signin", { ...values }, config);
      console.log("is this it?", res.data);

      if (res.data.error) {
        alert(res.data.error);
      } else {
        setState(res.data);
        await AsyncStorage.setItem("auth-rn", JSON.stringify(res.data));
        alert("Sign In Successful");
        console.log("this is the state right now: ", state)
      }
    } catch (error) {
      console.log(error.message);
    }

    loginProps.onLogin(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={userInfo}
      validationSchema={LoginSchema}
      onSubmit={signIn}
    >
      {(props) => (
        <View style={styles.inputContainer}>
          <View style={styles.userInput}>
            <FontAwesome name="envelope" size={24} color="white" />
            <TextInput
              style={styles.inputText}
              placeholder="Enter Email"
              placeholderTextColor={"white"}
              onChangeText={props.handleChange("email")}
              value={props.values.email}
              onBlur={props.handleBlur("email")}
            />
          </View>
          <Text style={styles.text}>
            {props.touched.email && props.errors.email}
          </Text>
          <View style={styles.passInput}>
            <FontAwesome name="key" size={24} color="white" />
            <TextInput
              style={styles.inputText}
              placeholder="Enter Password"
              placeholderTextColor={"white"}
              secureTextEntry={hidePassword}
              onChangeText={props.handleChange("password")}
              value={props.values.password}
              onBlur={props.handleBlur("password")}
            />
            {props.values.password.length > 0 && hidePassword && (
              <FontAwesome.Button
                name="eye"
                size={24}
                color="white"
                backgroundColor={"#465881"}
                onPress={() => setHidePassword(!hidePassword)}
              />
            )}
            {props.values.password.length > 0 && !hidePassword && (
              <FontAwesome.Button
                name="eye-slash"
                size={24}
                color="white"
                backgroundColor={"#465881"}
                onPress={() => setHidePassword(!hidePassword)}
              />
            )}
          </View>
          <Text style={styles.text}>
            {props.touched.password && props.errors.password}
          </Text>
          <TouchableOpacity
            style={styles.loginbttn}
            onPress={props.handleSubmit}
          >
            <Text style={styles.text}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginbttn}
            onPress={loginProps.onSignup}
          >
            <Text style={styles.text}>SIGNUP</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  forgotPass: {
    marginBottom: 20,
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  inputContainer: {
    alignItems: "center",
    //justifyContent: "center",
    width: "100%",
    //borderColor: "red",
    //borderRadius: 50,
    //borderWidth: 2,
    paddingTop: 60,
    //backgroundColor: "rgba(147,250,165,0.5)",
    marginBottom: 50,
  },

  userInput: {
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: "#465881",
    marginBottom: 20,
    padding: 20,
    width: "90%",
    color: "white",
    flexDirection: "row",
  },

  passInput: {
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: "#465881",
    marginBottom: 30,
    padding: 20,
    width: "90%",
    color: "white",
    flexDirection: "row",
    //justifyContent: "center",
    alignItems: "center",
  },

  loginbttn: {
    backgroundColor: "crimson",
    width: "80%",
    alignItems: "center",
    borderRadius: 25,
    padding: 10,
    marginBottom: 20,
  },

  text: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  inputText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
    width: "77%",
  },
});
export default LoginForm;
