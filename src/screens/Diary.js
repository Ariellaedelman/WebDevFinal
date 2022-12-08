import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import { useEffect, useState, useContext } from "react";
import Nutritionix from "../apis/Nutritionix";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import DiaryEntry from "../components/DiaryEntry";
import Rating from "../modals/Rating";
import { useSelector, useDispatch } from "react-redux";
import { deleteGlobalFood } from "../redux/foods";
import { decrementCalories } from "../redux/calories";
import { decrementFat } from "../redux/fat";
import { decrementProtein } from "../redux/protein";
import { decrementCarbs } from "../redux/carbs";
import { setRating } from "../redux/rating";
import { calculateRating } from "../utils/helperFunctions";

import client from "../../api/client";
//import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "../../context/auth";

function Diary() {
  const [nutritionixVisible, setNutritionixVisible] = useState(false);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [foodList, setFoodList] = useState([]);
  const [date, setDate] = useState("");
  const [chosenEntry, setChosenEntry] = useState(null);

  //const user = useSelector((state) => state.user.value);
  const [state, setState] = useContext(AuthContext);

  const foods = useSelector((state) => state.foods.value);
  const calories = useSelector((state) => state.calories.value);
  const fat = useSelector((state) => state.fat.value);
  const carbs = useSelector((state) => state.carbs.value);
  const protein = useSelector((state) => state.protein.value);
  const dispatch = useDispatch();

  useEffect(() => {
    setDate(new Date().toDateString());
  }, []);

  /* For user info to stay on page (get food route)
  const todayDate = new Date().toISOString().split('T')[0];
  console.log(new Date().toISOString().split('T')[0])

  const userDBFoods = {
    user_id: state.user._id,
    createdAt: todayDate,
  }
  */

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
  function openRating() {
    setRatingVisible(true);
  }
  function closeRating() {
    setRatingVisible(false);
  }
  function addFoodItem(foodItem) {
    setFoodList((currentFoods) => {
      return [foodItem, ...currentFoods];
    });
    setChosenEntry(foodItem);
  }

  /*
  //showing already added foods in db on diary page
  const showingFoods = async (values, actions) => {

    console.log("these are the values: ", values)

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        "Access-Control-Allow-Origin": "*",
      },
    };

    try {
      const res = await client.get("/api/get-foods", values, config);
      console.log(res.data);

      if (res.data.error) {
        alert(res.data.error);
      } else {
        //setState(res.data);
        //await AsyncStorage.setItem("auth-rn", JSON.stringify(res.data))
        alert("Getting Foods Successful");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  showingFoods(userDBFoods);
  */

  const deletingFoodDB = async (values, actions) => {
    //remove method for database

    console.log("these are the values: ", values)

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        "Access-Control-Allow-Origin": "*",
      },
    };

    try {
      const res = await client.post("/api/remove-food", values, config);
      console.log(res.data);

      if (res.data.error) {
        alert(res.data.error);
      } else {
        //setState(res.data);
        //await AsyncStorage.setItem("auth-rn", JSON.stringify(res.data))
        alert("Removing Food Successful");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  function deleteFoodItem(item) {
    dispatch(deleteGlobalFood(item));
    dispatch(decrementCalories(item.nf_calories));
    dispatch(decrementCarbs(item.nf_total_carbohydrate));
    dispatch(decrementProtein(item.nf_protein));
    dispatch(decrementFat(item.nf_total_fat));
    const budget = { calories: 2500, protein: 250, carbs: 250, fat: 55 };
    const newRating = calculateRating(budget, {
      calories: calories - item.nf_calories,
      protein: protein - item.nf_protein,
      fat: fat - item.nf_total_fat,
      carbs: carbs - item.nf_total_carbohydrate,
    }).toFixed(1);
    dispatch(setRating(newRating));

    const removingThisFood = {
      user_id: state.user._id,
      food_specific_id: item.item_id,
    };

    //console.log(user)
    console.log(removingThisFood)

    deletingFoodDB(removingThisFood);

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
        <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
          Add Food <FontAwesome name="plus" size={18} color={"white"} />
        </Text>
      </TouchableOpacity>
      <FlatList
        style={styles.foodFlatList}
        data={foods}
        renderItem={renderItem}
        keyExtractor={(item) => item.item_id}
      />
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.diaryText}>Total Calories: {totalCalories} |</Text>
        <Text style={styles.diaryText}> Total Protein: {totalProtein}g</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.diaryText}> Total Fat: {totalFat}g |</Text>
        <Text style={styles.diaryText}> Total Carbs: {totalCarbs}g</Text>
      </View>

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
  ratingBttn: {
    backgroundColor: "crimson",
    width: "80%",
    alignItems: "center",
    borderRadius: 25,
    padding: 10,
    marginBottom: 20,
  },
});
export default Diary;
