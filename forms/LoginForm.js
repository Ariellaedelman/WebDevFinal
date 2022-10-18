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
import { Formik } from "formik";
import * as yup from "yup";

const LoginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(7),
});

function LoginForm(loginProps) {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      // validationSchema={LoginSchema}
      onSubmit={(values, actions) => {
        actions.resetForm();
        loginProps.onLogin();
      }}
    >
      {(props) => (
        <View style={styles.inputContainer}>
          <View style={styles.userInput}>
            <TextInput
              style={styles.text}
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
            <TextInput
              style={styles.text}
              placeholder="Password"
              placeholderTextColor={"white"}
              secureTextEntry={true}
              onChangeText={props.handleChange("password")}
              value={props.values.password}
              onBlur={props.handleBlur("password")}
            />
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
  },

  passInput: {
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: "#465881",
    marginBottom: 30,
    padding: 20,
    width: "90%",
    color: "white",
  },

  loginbttn: {
    backgroundColor: "#fb5b5a",
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
});
export default LoginForm;
