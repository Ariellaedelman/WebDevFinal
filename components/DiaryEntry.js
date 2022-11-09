import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";
function DiaryEntry(props) {
  function handleDelete() {
    props.deleteFoodItem(props.item);
  }
  return (
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
      <Text style={styles.foodText}>Brand:{props.item.brand_name}</Text>
      <Text style={styles.foodText}>QTY: {props.item.nf_serving_size_qty}</Text>
      <Text style={styles.foodText}>Calories: {props.item.nf_calories}</Text>
      <Text style={styles.foodText}>Protein: {props.item.nf_protein}g</Text>
      <Text style={styles.foodText}>Fat: {props.item.nf_total_fat}g</Text>
      <Text style={styles.foodText}>
        Carbs: {props.item.nf_total_carbohydrate}g
      </Text>
    </View>
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
  },
});

export default DiaryEntry;
