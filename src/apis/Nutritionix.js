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
import { AuthContext } from '../../context/auth';

export default function Nutritionix(props) {
  const [state, setState] = useContext(AuthContext);
  const [searchString, setSearchString] = useState(null);
  const [foodData, setFoodData] = useState(null);
  const [chosenFood, setChosenFood] = useState(null);
  const [servingSize, setServingSize] = useState(1);

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

  function addFood() {
    let newObj = {
      ...chosenFood,
      nf_calories: parseFloat(
        (chosenFood.nf_calories * servingSize).toFixed(2)
      ),
      nf_protein: parseFloat((chosenFood.nf_protein * servingSize).toFixed(2)),
      nf_total_fat: parseFloat(
        (chosenFood.nf_total_fat * servingSize).toFixed(2)
      ),
      nf_total_carbohydrate: parseFloat(
        (chosenFood.nf_total_carbohydrate * servingSize).toFixed(2)
      ),
      nf_serving_size_qty: parseFloat(
        (chosenFood.nf_serving_size_qty * servingSize).toFixed(2)
      ),
    };

    
    props.addFoodItem(newObj);
    props.closeNutritionix();
  }
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
