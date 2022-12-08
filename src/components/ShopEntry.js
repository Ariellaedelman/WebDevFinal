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
      <View style={{ width: "35%" }}>
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
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "crimson",
    width: "97%",
    marginBottom: 30,
    borderRadius: 20,
    padding: 25,
  },
  unlockedContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "crimson",
    width: "97%",
    marginBottom: 30,
    borderRadius: 20,
    padding: 25,
  },
  exerciseLockedText: {
    color: "black",
    //fontSize: "20",
    fontWeight: "bold",
  },
  exerciseUnlockedText: {
    color: "white",
    //fontSize: "20",
    fontWeight: "bold",
  },
});
export default ShopEntry;
