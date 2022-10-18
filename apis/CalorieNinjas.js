import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "c6fdd0dd35msh8e2a7fa3cc90a5dp19f305jsnad757856109b",
    "X-RapidAPI-Host": "calorieninjas.p.rapidapi.com",
  },
};

function CalorieNinjas(props) {
  const [inputName, setInputName] = useState("");
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState(0);
  const [carbohydrates, setCarbohydrates] = useState("");
  const [protein, setProtein] = useState("");
  const [fat, setFat] = useState("");
  const [servingSize, setServingSize] = useState("");

  function getFoodDetails() {
    fetch(
      "https://calorieninjas.p.rapidapi.com/v1/nutrition?query=" + inputName,
      options
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.items[0] != undefined) {
          console.log("success");
          setFoodName(json.items[0].name);
          setCalories(json.items[0].calories);
          setCarbohydrates(json.items[0].carbohydrates_total_g);
          setProtein(json.items[0].protein_g);
          setFat(json.items[0].fat_total_g);
          setServingSize(json.items[0].serving_size_g);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.text}
            placeholder="Enter Food"
            placeholderTextColor={"white"}
            onChangeText={(text) => setInputName(text)}
          />
        </View>

        <TouchableOpacity style={styles.searchBttn} onPress={getFoodDetails}>
          <Text style={styles.searchText}> SEARCH</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.informationContainer}>
        <Text style={styles.text}>Food Name: {foodName}</Text>
        <Text style={styles.text}>Serving Size: {servingSize}g</Text>
        <Text style={styles.text}>Calories: {calories}</Text>
        <Text style={styles.text}>Carobhydrate: {carbohydrates}g</Text>
        <Text style={styles.text}>Protein: {protein}g</Text>
        <Text style={styles.text}>Fat: {fat}g</Text>
      </View>
      <TouchableOpacity style={styles.searchBttn} onPress={props.onCancel}>
        <Text>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#003f5c",
    paddingTop: 50,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  informationContainer: {
    flex: 4,
  },
  searchBttn: {
    backgroundColor: "#fb5b5a",
    width: "35%",
    alignItems: "center",
    borderRadius: 25,
    padding: 10,
    marginBottom: 20,
  },
  text: {
    color: "white",
    fontSize: 25,
  },
  searchText: {
    color: "white",
    fontSize: 15,
  },
  searchBar: {
    borderWidth: 2,
    borderColor: "white",
    marginRight: 10,
    width: "60%",
    alignItems: "center",
  },
});

export default CalorieNinjas;
