import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
  Modal,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import { Formik } from "formik";
import * as yup from "yup";

import axios from "axios";

const LoginSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  username: yup.string().required(),
  password: yup.string().required().min(7),
});

function Signup({ navigation }) {
  function onSignUp() {
    navigation.navigate("BottomTab", { screen: "Home" });
  }

  function SignUpData(inputs) {
    inputs 

  }
  function onCancel() {
    navigation.navigate("Login");
  }

  return (
    <View style={styles.pageContainer}>
      <Formik
        initialValues={{ name: "", email: "", username: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values, actions) => {
          const resp = axios.post("http://146.95.39.202:8080/api/auth/signup", { values });
          console.log(resp.data);
          alert("Sign Up Successful");
          console.log(values);
          actions.resetForm();
          onSignUp();
        }}
      >
        {(props) => (
          <View style={styles.signupContainer}>
            <Text style={styles.logo}>SIGNUP</Text>
            <View style={styles.input}>
              <TextInput
                style={styles.text}
                placeholder="name"
                placeholderTextColor={"white"}
                onChangeText={props.handleChange("name")}
                value={props.values.name}
                onBlur={props.handleBlur("name")}
              />
            </View>
            <Text style={styles.text}>
              {props.touched.name && props.errors.name}
            </Text>
            <View style={styles.input}>
              <TextInput
                style={styles.text}
                placeholder="email"
                placeholderTextColor={"white"}
                onChangeText={props.handleChange("email")}
                value={props.values.email}
                onBlur={props.handleBlur("email")}
              />
            </View>
            <Text style={styles.text}>
              {props.touched.email && props.errors.email}
            </Text>
            <View style={styles.input}>
              <TextInput
                style={styles.text}
                placeholder="username"
                placeholderTextColor={"white"}
                onChangeText={props.handleChange("username")}
                value={props.values.username}
                onBlur={props.handleBlur("username")}
              />
            </View>
            <Text style={styles.text}>
              {props.touched.username && props.errors.username}
            </Text>
            <View style={styles.input}>
              <TextInput
                style={styles.text}
                placeholder="create a password"
                placeholderTextColor={"white"}
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
              <Text style={styles.text}>REGISTER</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginbttn} onPress={onCancel}>
              <Text style={styles.text}>CANCEL</Text>
            </TouchableOpacity>
          </View>
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
  signupContainer: {
    flex: 1,
    alignItems: "center",
    //justifyContent: "center",
    width: "90%",
    //borderColor: "white",
    //borderRadius: 50,
    //borderWidth: 2,
    paddingTop: 30,
    //backgroundColor: "rgba(147,250,165,0.5)",
    marginBottom: 50,
  },

  input: {
    //borderWidth: 1,
    //borderRadius: 50,
    //backgroundColor: "#465881",
    marginBottom: 20,
    padding: 20,
    width: "90%",
    color: "white",
    borderBottomWidth: 2,
    borderBottomColor: "white",
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
    fontSize: 30,
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

export default Signup;
