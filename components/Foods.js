import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

function Foods(props) {
  function handlePress() {
    props.handleChoice(props.food);
  }

  function handleServingUp() {
    props.upServing();
  }

  function handleServingDown() {
    props.downServing();
  }
  return (
    <Pressable onPress={handlePress}>
      <View style={props.chosen ? styles.chosenContainer : styles.container}>
        <Text style={{ color: "white", fontSize: 20 }}>
          {props.food.item_name}
        </Text>
        <Text style={{ color: "white", fontSize: 20 }}>
          Brand: {props.food.brand_name}
        </Text>
        <Text style={{ color: "white", fontSize: 20 }}>
          Calories: {props.food.nf_calories}
        </Text>
        <Text style={{ color: "white", fontSize: 20 }}>
          Protein: {props.food.nf_protein}g
        </Text>
        <Text style={{ color: "white", fontSize: 20 }}>
          Fat: {props.food.nf_total_fat}g
        </Text>
        <Text style={{ color: "white", fontSize: 20 }}>
          Carbs: {props.food.nf_total_carbohydrate}g
        </Text>
        {props.chosen ? (
          <View style={styles.servingSizeContainer}>
            <Text style={{ color: "white", fontSize: 20 }}>QTY: </Text>
            <FontAwesome.Button
              name="caret-left"
              size={20}
              onPress={handleServingDown}
            ></FontAwesome.Button>
            <Text style={{ color: "white", fontSize: 20, margin: 10 }}>
              {props.servingSize}
            </Text>
            <FontAwesome.Button
              name="caret-right"
              size={20}
              onPress={handleServingUp}
            ></FontAwesome.Button>
          </View>
        ) : (
          <Text></Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "crimson",
    marginBottom: 25,
    opacity: 0.5,
    borderRadius: 20,
    padding: 10,
    //borderWidth: 2,
    //borderColor: "red",
  },
  chosenContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "crimson",
    marginBottom: 25,
    borderRadius: 20,
    padding: 10,
    //borderWidth: 2,
    //borderColor: "red",
  },
  button: {
    backgroundColor: "red",
    borderRadius: 20,
    padding: 10,
    marginBottom: 30,
    //marginTop: 100,
  },
  searchBar: {
    borderBottomWidth: 2,
    borderBottomColor: "white",
    marginBottom: 30,
  },
  servingSizeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
export default Foods;
