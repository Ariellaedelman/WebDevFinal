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
import { FontAwesome, Entypo } from "@expo/vector-icons";
import DiaryEntry from "../components/DiaryEntry";

function Diary() {
  const [nutritionixVisible, setNutritionixVisible] = useState(false);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [foodList, setFoodList] = useState([]);
  const [date, setDate] = useState("");
  const [chosenEntry, setChosenEntry] = useState(null);

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
    setTotalCalories(Math.round(calories));
    setTotalProtein(Math.round(protein));
    setTotalFat(Math.round(fat));
    setTotalCarbs(Math.round(carbs));
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
    setChosenEntry(foodItem);
  }

  function deleteFoodItem(item) {
    setFoodList((prevFoods) => {
      return prevFoods.filter((foodItem) => foodItem.item_id !== item.item_id);
    });
  }

  function handleChoice(food) {
    if (food === chosenEntry) {
      setChosenEntry(null);
      return;
    }
    setChosenEntry(food);
  }

  const renderItem = ({ item }) => (
    <DiaryEntry
      item={item}
      deleteFoodItem={deleteFoodItem}
      handleChoice={handleChoice}
      chosen={chosenEntry === item}
    />
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
      <Text style={styles.diaryText}> Total Protein: {totalProtein}g</Text>
      <Text style={styles.diaryText}> Total Fat: {totalFat}g</Text>
      <Text style={styles.diaryText}> Total Carbs: {totalCarbs}g</Text>
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
    fontWeight: "bold",
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
