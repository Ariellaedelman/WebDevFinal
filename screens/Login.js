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
} from "react-native";
import Signup from "./Signup";

function Login({ navigation }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  function signupHandler() {
    setModalIsOpen(true);
  }
  function onCancelClick() {
    setModalIsOpen(false);
  }
  return (
    <View style={styles.pageContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.logo}>CAL-UTRITION</Text>

        <View style={styles.userInput}>
          <TextInput
            style={styles.text}
            placeholder="Username"
            placeholderTextColor={"white"}
          />
        </View>
        <View style={styles.passInput}>
          <TextInput
            style={styles.text}
            placeholder="Password"
            placeholderTextColor={"white"}
            secureTextEntry={true}
          />
        </View>
        <Pressable>
          <Text style={styles.forgotPass}>Forgot Password?</Text>
        </Pressable>
        <TouchableOpacity
          style={styles.loginbttn}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.text}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginbttn} onPress={signupHandler}>
          <Text style={styles.text}>SIGNUP</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="light" />
      {modalIsOpen && <Signup onCancelClick={onCancelClick} />}
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
    marginBottom: 10,
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
