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
  const [date, setDate] = useState("");
  const [chosenEntry, setChosenEntry] = useState(null);

  const user = useSelector((state) => state.user.value);
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

  const deletingFoodDB = async (values, actions) => {
    //remove method for database

    console.log("these are the values: ", values);

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
    const budget = {
      calories: user.calories,
      protein: user.protein,
      carbs: user.carbs,
      fat: user.fat,
    };
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
    console.log(removingThisFood);

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
        <Text style={styles.diaryText}>Total Calories: {calories} |</Text>
        <Text style={styles.diaryText}> Total Protein: {protein}g</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.diaryText}> Total Fat: {fat}g |</Text>
        <Text style={styles.diaryText}> Total Carbs: {carbs}g</Text>
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
