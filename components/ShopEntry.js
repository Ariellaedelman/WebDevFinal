import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  Pressable,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

function ShopEntry(props) {
  function handlePress() {
    props.handlePress(props.exercise);
  }
  return (
    <Pressable
      onPress={handlePress}
      style={
        props.exercise.locked ? styles.container : styles.unlockedContainer
      }
    >
      <View style={{ width: "26%" }}>
        {props.exercise.locked ? (
          <Text style={styles.exerciseLockedText}>{props.exercise.name}</Text>
        ) : (
          <Text style={styles.exerciseUnlockedText}>{props.exercise.name}</Text>
        )}
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {props.exercise.locked ? (
          <Entypo name="star" size={20} color="black" />
        ) : (
          <Entypo name="star" size={20} color="white" />
        )}
        {props.exercise.locked ? (
          <Text style={styles.exerciseLockedText}>{props.exercise.points}</Text>
        ) : (
          <Text style={styles.exerciseUnlockedText}>
            {props.exercise.points}
          </Text>
        )}
      </View>
      {props.exercise.locked ? (
        <FontAwesome5 name="lock" size={20} color="black" />
      ) : (
        <FontAwesome5 name="lock-open" size={20} color="white" />
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
    marginBottom: 25,
    borderRadius: 20,
    opacity: ".85",
    //padding: 20,
    //borderWidth: 2,
    //borderColor: "red",
  },
  unlockedContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "crimson",
    width: "90%",
    marginBottom: 25,
    borderRadius: 20,
  },
  exerciseLockedText: {
    color: "black",
    fontSize: "20",
    fontWeight: "bold",
  },
  exerciseUnlockedText: {
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
