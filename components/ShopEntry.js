import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  Pressable,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

function ShopEntry(props) {
  function handlePress() {
    props.handlePress(props.exercise);
  }
  return (
    <Pressable onPress={handlePress} style={styles.container}>
      <Text style={styles.exerciseText}>{props.exercise.name}</Text>
      <Text style={styles.exerciseText}>{props.exercise.points}</Text>
      {props.exercise.locked ? (
        <FontAwesome5 name="lock" size={20} color="black" />
      ) : (
        <FontAwesome5 name="lock-open" size={20} color="black" />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "crimson",
    width: "90%",
    marginBottom: 20,
    borderRadius: 20,
    //padding: 20,
    //borderWidth: 2,
    //borderColor: "red",
  },
  exerciseText: {
    color: "white",
    fontSize: "20",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "red",
    borderRadius: 20,
    padding: 10,
    width: "40%",
    alignItems: "center",
    //marginTop: 100,
  },
});
export default ShopEntry;
