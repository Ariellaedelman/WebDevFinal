import {
  View,
  Button,
  SafeAreaView,
  StyleSheet,
  Pressable,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Text } from "react-native-paper";

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
      <View style={{ width: "38%" }}>
        {props.exercise.locked ? (
          <Text style={styles.exerciseLockedText} variant="headlineSmall">
            {props.exercise.name}
          </Text>
        ) : (
          <Text style={styles.exerciseUnlockedText} variant="headlineSmall">
            {props.exercise.name}
          </Text>
        )}
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {props.exercise.locked ? (
          <FontAwesome5 name="star" size={20} color="yellow" />
        ) : (
          <FontAwesome5 name="star" size={20} color="yellow" />
        )}
        {props.exercise.locked ? (
          <Text style={styles.exerciseLockedText} variant="headlineSmall">
            {props.exercise.points}
          </Text>
        ) : (
          <Text style={styles.exerciseUnlockedText} variant="headlineSmall">
            {props.exercise.points}
          </Text>
        )}
      </View>
      {props.exercise.locked ? (
        <FontAwesome5 name="lock" size={20} color="white" />
      ) : (
        <FontAwesome5 name="lock-open" size={20} color="black" />
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
    color: "white",
    //fontSize: "20",
    fontWeight: "bold",
  },
  exerciseUnlockedText: {
    color: "black",
    //fontSize: "20",
    fontWeight: "bold",
  },
});
export default ShopEntry;
