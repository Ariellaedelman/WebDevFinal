import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import UploadImage from "../components/UploadImage";
import History from "../modals/History";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import { white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

function HomeProfile({ navigation }) {
  const [historyVisible, setHistoryVisible] = useState(false);
  const [testObject, setTestObject] = useState({});

  const [state, setState] = useContext(AuthContext);

  console.log('this is state on homeprofile rn: ', state)

  function openProfile() {
    navigation.navigate("EditProfile");
  }
  function openHistory() {
    setHistoryVisible(true);
  }
  function closeHistory() {
    setHistoryVisible(false);
  }
  function updateTestObject(inputObject) {
    setTestObject(inputObject);
    console.log(setTestObject);
  }
  
  const onLogOut = async () => {
    setState({ token: "", user: null });
    await AsyncStorage.removeItem("auth-rn");
    console.log(state)
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.profileContainer}>
      <UploadImage />
      <View style={styles.bttnsContainer}>
        <TouchableOpacity style={styles.historyBttn} onPress={openHistory}>
          <Text style={styles.text}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileBttn} onPress={openProfile}>
          <Text style={styles.text}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <Pressable onPress={onLogOut} style={styles.logoutBttn}>
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          Logout
        </Text>
      </Pressable>

      <Modal visible={historyVisible} animationType={"slide"}>
        <History close={closeHistory} />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#003f5c",
  },
  profileBttn: {
    backgroundColor: "crimson",
    width: "40%",
    alignItems: "center",
    borderRadius: 25,
    padding: 10,
  },
  historyBttn: {
    backgroundColor: "crimson",
    width: "40%",
    alignItems: "center",
    borderRadius: 25,
    padding: 10,
    marginRight: 20,
  },
  bttnsContainer: {
    marginTop: 30,
    flexDirection: "row",
    marginBottom: 20,
    //borderWidth: 2,
  },
  text: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  logoutBttn: {
    backgroundColor: "crimson",
    alignItems: "center",
    borderRadius: 25,
    padding: 10,
    width: "40%",
  },
});

export default HomeProfile;
