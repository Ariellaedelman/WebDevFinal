import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import UploadImage from "../components/UploadImage";
import EditProfile from "../modals/EditProfile";
import History from "../modals/History";
import { useState } from "react";

function Profile() {
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [testObject, setTestObject] = useState({});
  function openProfile() {
    setEditProfileVisible(true);
  }
  function closeProfile() {
    setEditProfileVisible(false);
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
  return (
    <SafeAreaView style={styles.profileContainer}>
      <UploadImage />
      <View style={styles.bttnsContainer}>
        <TouchableOpacity style={styles.historyBttn} onPress={openHistory}>
          <Text>History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileBttn} onPress={openProfile}>
          <Text>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={editProfileVisible} animationType={"slide"}>
        <EditProfile close={closeProfile} updateObject={updateTestObject} />
      </Modal>
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
    backgroundColor: "#fb5b5a",
    width: "40%",
    alignItems: "center",
    borderRadius: 25,
    padding: 10,
  },
  historyBttn: {
    backgroundColor: "#fb5b5a",
    width: "40%",
    alignItems: "center",
    borderRadius: 25,
    padding: 10,
    marginRight: 20,
  },
  bttnsContainer: {
    marginTop: 30,
    flexDirection: "row",
    //borderWidth: 2,
  },
});

export default Profile;
