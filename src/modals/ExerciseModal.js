import {
  View,
  Button,
  SafeAreaView,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Text } from "react-native-paper";

function ExerciseModal(props) {
  const renderItem = ({ item }) => (
    <View style={styles.exerciseContainer}>
      <Text
        style={{ color: "white", marginBottom: 10, fontWeight: "800" }}
        variant={"labelLarge"}
      >
        Name: {item.name}
      </Text>
      <Text
        style={{ color: "white", marginBottom: 10, fontWeight: "800" }}
        variant={"labelLarge"}
      >
        Equipment: {item.equipment}
      </Text>
      <Text
        style={{ color: "white", marginBottom: 10, fontWeight: "800" }}
        variant={"labelLarge"}
      >
        Target: {item.target}
      </Text>
      <Image source={{ uri: item.gif }} style={{ width: 250, height: 250 }} />
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          alignSelf: "flex-start",
          marginLeft: 10,
        }}
      >
        <FontAwesome.Button
          name="close"
          size={25}
          onPress={props.close}
          backgroundColor={"#003f5c"}
        />
      </View>
      <Text
        variant={"headlineLarge"}
        style={{ color: "white", fontWeight: "bold" }}
      >
        {props.exercise.name}
      </Text>
      <FlatList
        style={styles.exerciseFlatList}
        data={props.exercise.data}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
  },
  exerciseContainer: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "crimson",
    margin: 10,
    borderRadius: 20,
  },
  exerciseFlatList: {
    width: "90%",
  },
  pageText: {
    //fontSize: 20,
    color: "white",
  },
});

export default ExerciseModal;
