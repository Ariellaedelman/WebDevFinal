import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

function ExerciseModal(props) {
  const renderItem = ({ item }) => (
    <View style={styles.exerciseContainer}>
      <Text style={styles.pageText}>Name: {item.name}</Text>
      <Image source={{ uri: item.gif }} style={{ width: 200, height: 200 }} />
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
