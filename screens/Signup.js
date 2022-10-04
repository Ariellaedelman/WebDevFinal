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

function Signup({ navigation }) {
  function onSignUp() {
    navigation.navigate("BottomTab", { screen: "Home" });
  }
  function onCancel() {
    navigation.navigate("Login");
  }
  return (
    <View style={styles.pageContainer}>
      <View style={styles.signupContainer}>
        <Text style={styles.logo}>SIGNUP</Text>
        <View style={styles.input}>
          <TextInput
            style={styles.text}
            placeholder="name"
            placeholderTextColor={"white"}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            style={styles.text}
            placeholder="email"
            placeholderTextColor={"white"}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            style={styles.text}
            placeholder="username"
            placeholderTextColor={"white"}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            style={styles.text}
            placeholder="create a password"
            placeholderTextColor={"white"}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity style={styles.loginbttn} onPress={onSignUp}>
          <Text style={styles.text}>REGISTER</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginbttn} onPress={onCancel}>
          <Text style={styles.text}>CANCEL</Text>
        </TouchableOpacity>
      </View>
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
