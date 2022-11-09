import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useEffect, useState } from "react";
import Nutritionix from "../apis/Nutritionix";
import { FontAwesome } from "@expo/vector-icons";

function Diary() {
  const [nutritionixVisible, setNutritionixVisible] = useState(false);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [foodList, setFoodList] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(new Date().toDateString());
  }, []);

  useEffect(() => {
    let calories = 0;
    let fat = 0;
    let protein = 0;
    let carbs = 0;
    for (let i = 0; i < foodList.length; i++) {
      calories += foodList[i].nf_calories;
      fat += foodList[i].nf_total_fat;
      protein += foodList[i].nf_protein;
      carbs += foodList[i].nf_total_carbohydrate;
    }
    setTotalCalories(calories.toFixed(2));
    setTotalProtein(protein.toFixed(2));
    setTotalFat(fat.toFixed(2));
    setTotalCarbs(carbs.toFixed(2));
  }, [foodList]);

  function openNutritionix() {
    setNutritionixVisible(true);
  }
  function closeNutritionix() {
    setNutritionixVisible(false);
  }
  function addFoodItem(foodItem) {
    setFoodList((currentFoods) => {
      return [foodItem, ...currentFoods];
    });
  }
  const renderItem = ({ item }) => (
    <View style={styles.foodItem}>
      <Text style={styles.foodText}>Name: {item.item_name}</Text>
      <Text style={styles.foodText}>Calories: {item.nf_calories}</Text>
      <Text style={styles.foodText}>Protein: {item.nf_protein}g</Text>
      <Text style={styles.foodText}>Fat: {item.nf_total_fat}g</Text>
      <Text style={styles.foodText}>Carbs: {item.nf_total_carbohydrate}</Text>
    </View>
  );
  return (
    <SafeAreaView style={styles.diaryContainer}>
      <Text style={styles.diaryText}>{date}</Text>
      <TouchableOpacity style={styles.addFoodBttn} onPress={openNutritionix}>
        <FontAwesome name="plus" size={20} color={"white"} />
      </TouchableOpacity>
      <FlatList
        style={styles.foodFlatList}
        data={foodList}
        renderItem={renderItem}
        keyExtractor={(item) => item.item_id}
      />
      <Text style={styles.diaryText}> Total Calories: {totalCalories}</Text>
      <Text style={styles.diaryText}> Total Protein: {totalProtein}</Text>
      <Text style={styles.diaryText}> Total Fat: {totalFat}</Text>
      <Text style={styles.diaryText}> Total Carbs: {totalCarbs}</Text>
      <Modal visible={nutritionixVisible} animationType={"slide"}>
        <Nutritionix
          closeNutritionix={closeNutritionix}
          addFoodItem={addFoodItem}
        />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  diaryContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#003f5c",
  },
  addFoodBttn: {
    backgroundColor: "crimson",
    width: "80%",
    alignItems: "center",
    borderRadius: 25,
    padding: 10,
    marginBottom: 20,
  },
  foodItem: {
    backgroundColor: "crimson",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    padding: 20,
    borderRadius: 20,
  },
  diaryText: {
    fontSize: 20,
    color: "white",
    marginBottom: 10,
    marginTop: 10,
  },
  foodFlatList: {
    width: "90%",
  },
  foodText: {
    fontSize: 20,
    color: "white",
  },
});
export default Diary;
