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
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

const LoginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(7),
});

function Login({ navigation }) {
  function onLogin() {
    navigation.navigate("BottomTab");
  }
  function onSignUp() {
    navigation.navigate("Signup");
  }
  return (
    <View style={styles.pageContainer}>
      <Formik
        initialValues={{ email: "", password: "" }}
        // validationSchema={LoginSchema}
        onSubmit={(values, actions) => {
          actions.resetForm();
          onLogin();
        }}
      >
        {(props) => (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputContainer}>
              <Text style={styles.logo}>CAL-UTRITION</Text>
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
              <TouchableOpacity style={styles.loginbttn} onPress={onSignUp}>
                <Text style={styles.text}>SIGNUP</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        )}
      </Formik>

      <StatusBar style="light" />
    </View>
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
    flex: 1,
    alignItems: "center",
    //justifyContent: "center",
    width: "90%",
    //borderColor: "white",
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
  logo: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fb5b5a",
    marginBottom: 30,
  },

  pageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 80,
    backgroundColor: "#003f5c",
  },

  text: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
});

export default Login;
