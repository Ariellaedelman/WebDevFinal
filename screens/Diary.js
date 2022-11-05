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
import CalorieNinjas from "../apis/CalorieNinjas";

function Diary() {
  const [calNinjaVisible, setCalNinjaVisible] = useState(false);
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
      calories += parseInt(foodList[i].calories, 10);
      fat += parseInt(foodList[i].fat, 10);
      protein += parseInt(foodList[i].protein, 10);
      carbs += parseInt(foodList[i].carbohydrates, 10);
    }
    setTotalCalories(calories);
    setTotalProtein(protein);
    setTotalFat(fat);
    setTotalCarbs(carbs);
  }, [foodList]);

  function openCalNinja() {
    setCalNinjaVisible(true);
  }
  function closeCalNinja() {
    setCalNinjaVisible(false);
  }
  function addFoodItem(foodItem) {
    setFoodList((currentFoods) => {
      return [foodItem, ...currentFoods];
    });
  }
  const renderItem = ({ item }) => (
    <View style={styles.foodItem}>
      <Text style={styles.foodText}>Name: {item.name}</Text>
      <Text style={styles.foodText}>Serving Size: {item.serving_size}g </Text>
      <Text style={styles.foodText}>Calories: {item.calories}</Text>
    </View>
  );
  return (
    <SafeAreaView style={styles.diaryContainer}>
      <Text style={styles.diaryText}>{date}</Text>
      <TouchableOpacity style={styles.addFoodBttn} onPress={openCalNinja}>
        <Text style={{ fontSize: 15, color: "white" }}>Add Food</Text>
      </TouchableOpacity>
      <FlatList
        style={styles.foodFlatList}
        data={foodList}
        renderItem={renderItem}
      />
      <Text style={styles.diaryText}> Total Calories: {totalCalories}</Text>
      <Text style={styles.diaryText}> Total Protein: {totalProtein}</Text>
      <Text style={styles.diaryText}> Total Fat: {totalFat}</Text>
      <Text style={styles.diaryText}> Total Carbs: {totalCarbs}</Text>
      <Modal visible={calNinjaVisible} animationType={"slide"}>
        <CalorieNinjas onCancel={closeCalNinja} addFoodItem={addFoodItem} />
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
    backgroundColor: "#fb5b5a",
    width: "80%",
    alignItems: "center",
    borderRadius: 25,
    padding: 10,
    marginBottom: 20,
  },
  foodItem: {
    backgroundColor: "#fb5b5a",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    padding: 20,
  },
  diaryText: {
    fontSize: 20,
    color: "white",
    marginBottom: 20,
    marginTop: 20,
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
