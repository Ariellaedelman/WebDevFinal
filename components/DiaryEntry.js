import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Pressable,
} from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";
function DiaryEntry(props) {
  function handleDelete() {
    props.deleteFoodItem(props.item);
  }
  function handlePress() {
    props.handleChoice(props.item);
  }
  return (
    <Pressable onPress={handlePress}>
      <View style={styles.foodItem}>
        <View
          style={{
            alignSelf: "flex-start",
            //marginLeft: 1,
          }}
        >
          <Entypo.Button
            name="trash"
            size={20}
            color="black"
            backgroundColor={"crimson"}
            onPress={handleDelete}
          />
        </View>
        <Text style={styles.foodText}>{props.item.item_name}</Text>

        <Text style={styles.foodText}>Calories: {props.item.nf_calories}</Text>
        <Text style={styles.foodText}>
          QTY: {props.item.nf_serving_size_qty}
        </Text>
        {props.chosen && (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={styles.foodText}>Brand:{props.item.brand_name}</Text>
            <Text style={styles.foodText}>
              Protein: {props.item.nf_protein}g
            </Text>
            <Text style={styles.foodText}>Fat: {props.item.nf_total_fat}g</Text>
            <Text style={styles.foodText}>
              Carbs: {props.item.nf_total_carbohydrate}g
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  foodItem: {
    backgroundColor: "crimson",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    padding: 5,
    borderRadius: 20,
  },

  foodText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
});

export default DiaryEntry;
