import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Calendar from "../components/Calendar";

function History(props) {
  return (
    <SafeAreaView style={styles.editProfileContainer}>
      <Calendar/>
      <TouchableOpacity style={styles.closeBttn} onPress={props.close}>
        <Text>Close</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  editProfileContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#003f5c",
  },
  text: {
    color: "white",
    fontSize: 25,
  },
  closeBttn: {
    backgroundColor: "#fb5b5a",
    width: "40%",
    alignItems: "center",
    borderRadius: 25,
    padding: 10,
  },
});

export default History;
