import axios from "axios";
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
  FlatList,
} from "react-native";
// import { useEffect, useState } from "react";
import Foods from "../components/Foods";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useContext, useEffect, useState } from "react";
import client from "../../api/client";
//import AsyncStorage from "@react-native-async-storage/async-storage";
//import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../context/auth";
import { useSelector, useDispatch } from "react-redux";
import { addGlobalFood } from "../redux/foods";
import { incrementCalories } from "../redux/calories";
import { incrementFat } from "../redux/fat";
import { incrementProtein } from "../redux/protein";
import { incrementCarbs } from "../redux/carbs";
import { setRating } from "../redux/rating";
import { calculateRating } from "../utils/helperFunctions";

export default function Nutritionix(props) {
  const [state, setState] = useContext(AuthContext);
  const [searchString, setSearchString] = useState(null);
  const [foodData, setFoodData] = useState(null);
  const [chosenFood, setChosenFood] = useState(null);
  const [servingSize, setServingSize] = useState(1);

  const dispatch = useDispatch();
  const calories = useSelector((state) => state.calories.value);
  const fat = useSelector((state) => state.fat.value);
  const carbs = useSelector((state) => state.carbs.value);
  const protein = useSelector((state) => state.protein.value);
  const user = useSelector((state) => state.user.value);

  function checkString() {
    let regex = /[0-9]{12}/;
    Keyboard.dismiss();
    if (searchString === null) {
      return;
    } else if (regex.test(searchString)) {
      getFoodByUPC();
    } else {
      getFoodByName();
    }
  }

  function getFoodByName() {
    const options = {
      method: "GET",
      url:
        "https://nutritionix-api.p.rapidapi.com/v1_1/search/" +
        encodeURIComponent(searchString),
      params: {
        fields:
          "item_name,item_id,brand_name,nf_calories,nf_total_fat,nf_total_carbohydrate,nf_protein",
      },
      headers: {
        "X-RapidAPI-Key": "c6fdd0dd35msh8e2a7fa3cc90a5dp19f305jsnad757856109b",
        "X-RapidAPI-Host": "nutritionix-api.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        //console.log(response.data.hits);
        if (response.data.hits.length === 0) {
          setFoodData(null);
        } else {
          let hitsArr = response.data.hits;
          for (let i = 0; i < hitsArr.length; i++) {
            hitsArr[i] = hitsArr[i].fields;
          }

          setFoodData(response.data.hits);
          setChosenFood(response.data.hits[0]);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function getFoodByUPC() {
    const options = {
      method: "GET",
      url: "https://nutritionix-api.p.rapidapi.com/v1_1/item",
      params: { upc: searchString },
      headers: {
        "X-RapidAPI-Key": "c6fdd0dd35msh8e2a7fa3cc90a5dp19f305jsnad757856109b",
        "X-RapidAPI-Host": "nutritionix-api.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        let tempArr = [];
        tempArr.push(response.data);
        setFoodData(tempArr);
        setChosenFood(tempArr[0]);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function handleChoice(food) {
    setChosenFood(food);
  }

  function upServing() {
    setServingSize(servingSize + 1);
  }

  function downServing() {
    if (servingSize === 1) {
      return;
    }
    setServingSize(servingSize - 1);
  }

  const addFood = async (values, actions) => {
    let newObj = {
      ...chosenFood,
      nf_calories: Math.round(chosenFood.nf_calories * servingSize),

      nf_protein: Math.round(chosenFood.nf_protein * servingSize),
      nf_total_fat: Math.round(chosenFood.nf_total_fat * servingSize),
      nf_total_carbohydrate: Math.round(
        chosenFood.nf_total_carbohydrate * servingSize
      ),
      nf_serving_size_qty: Math.round(
        chosenFood.nf_serving_size_qty * servingSize
      ),
    };

    dispatch(addGlobalFood(newObj));
    dispatch(incrementCalories(newObj.nf_calories));
    dispatch(incrementCarbs(newObj.nf_total_carbohydrate));
    dispatch(incrementProtein(newObj.nf_protein));
    dispatch(incrementFat(newObj.nf_total_fat));
    
    const budget = {
      calories: user.calories,
      protein: user.protein,
      carbs: user.carbs,
      fat: user.fat,
    };

    const newRating = calculateRating(budget, {
      calories: calories + newObj.nf_calories,
      protein: protein + newObj.nf_protein,
      fat: fat + newObj.nf_total_fat,
      carbs: carbs + newObj.nf_total_carbohydrate,
    }).toFixed(1);
    dispatch(setRating(newRating));
    /*
    setFoodItem({
      user_id: state.user._id,
      name: chosenFood.item_name,
      brand: chosenFood.brand_name,
      calories: chosenFood.nf_calories,
      carbohydrates: chosenFood.nf_total_carbohydrate,
      protein: chosenFood.nf_protein,
      fat: chosenFood.nf_total_fat,
      serving_size: chosenFood.nf_serving_size_qty,
    });
    */

    const foodItem = {
      user_id: state.user._id,
      name: newObj.item_name,
      brand: newObj.brand_name,
      calories: newObj.nf_calories,
      carbohydrates: newObj.nf_total_carbohydrate,
      protein: newObj.nf_protein,
      fat: newObj.nf_total_fat,
      serving_size: newObj.nf_serving_size_qty,
      food_specific_id: newObj.item_id,
      //key: "",
    };

    console.log(foodItem);

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        "Access-Control-Allow-Origin": "*",
      },
    };

    try {
      // console.log(state.user._id)
      const res = await client.post("/api/add-food", foodItem, config);
      console.log(res.data);

      if (res.data.error) {
        alert(res.data.error);
      } else {
        //setState(res.data);
        //await AsyncStorage.setItem("auth-rn", JSON.stringify(res.data))
        alert("Adding Food Successful");
      }
    } catch (error) {
      console.log(error.message);
    }

    props.closeNutritionix();
  };

  const renderItem = ({ item }) => {
    return (
      <Foods
        food={item}
        handleChoice={handleChoice}
        chosen={chosenFood === item}
        upServing={upServing}
        downServing={downServing}
        servingSize={servingSize}
      />
    );
  };
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
          onPress={props.closeNutritionix}
          backgroundColor={"#003f5c"}
        />
      </View>
      <Text style={{ fontSize: 30, color: "white", marginBottom: 30 }}>
        Food Search
      </Text>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={styles.searchBar}
          placeholder="Input Food Name or UPC"
          placeholderTextColor={"white"}
          onChangeText={(text) => setSearchString(text)}
        />
        <FontAwesome.Button
          name="search"
          size={25}
          backgroundColor={"#003f5c"}
          onPress={checkString}
        />
      </View>

      {foodData ? (
        <FlatList
          data={foodData}
          renderItem={renderItem}
          keyExtractor={(item) => item.item_id}
          //extraData={foodData}
        />
      ) : (
        <Text style={{ fontSize: 20, color: "white" }}>No Results</Text>
      )}

      {foodData ? (
        <Pressable onPress={addFood} style={styles.button}>
          <Text style={{ fontSize: 20, color: "white" }}>Add Food</Text>
        </Pressable>
      ) : (
        <Text></Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#003f5c",
    //borderWidth: 2,
    //borderColor: "red",
  },
  button: {
    backgroundColor: "red",
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    width: "50%",
    alignItems: "center",
    //marginBottom: 30,
    //marginTop: 100,
  },
  searchBar: {
    borderBottomWidth: 2,
    borderBottomColor: "white",
    marginBottom: 30,
    color: "white",
    fontSize: 20,
    width: "60%",
    alignItems: "flex-end",
    justifyContent: "center",
    padding: 10,
  },
});
