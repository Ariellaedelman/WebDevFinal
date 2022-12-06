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
} from "react-native";
import { useEffect, useState } from "react";
import ListPicks from "./components/ListPicks";

const options = {
  method: "GET",
  url: "https://fitness-calculator.p.rapidapi.com/macrocalculator",
  params: {
    age: "25",
    gender: "male",
    height: "180",
    weight: "70",
    activitylevel: "3",
    goal: "weightgain",
  },
  headers: {
    "X-RapidAPI-Key": "c6fdd0dd35msh8e2a7fa3cc90a5dp19f305jsnad757856109b",
    "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com",
  },
};

function MacroPlans() {
  const [macros, setMacros] = useState(null);
  const [macroPlans, setMacroPlans] = useState([]);
  const [chosenPlan, setChosenPlan] = useState(null);

  function getMacros() {
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setMacros(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function logMacros() {
    let macroArr = [];
    //macroArr.push(macros.data.calorie);
    macroArr.push(macros.data.balanced);
    macroArr.push(macros.data.highprotein);
    macroArr.push(macros.data.lowcarbs);
    macroArr.push(macros.data.lowfat);
    macroArr[0] = { ...macroArr[0], name: "Balanced" };
    macroArr[1] = { ...macroArr[1], name: "High Protein" };
    macroArr[2] = { ...macroArr[2], name: "Low Carbs" };
    macroArr[3] = { ...macroArr[3], name: "Low Fat" };
    setMacroPlans(macroArr);
    console.log(macroArr);
  }

  function handleChoice(plan) {
    setChosenPlan(plan);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.button} onPress={getMacros}>
        <Text>Get Macros</Text>
      </Pressable>
      {macros ? (
        <Text style={{ color: "white", fontSize: 20 }}>
          Calories: {macros.data.calorie}
        </Text>
      ) : (
        <Text style={{ color: "white", fontSize: 20 }}>
          No Calories Available
        </Text>
      )}

      <Pressable style={styles.button} onPress={logMacros}>
        <Text>Console Log Macros</Text>
      </Pressable>

      <ScrollView>
        {macroPlans.map((plan, index) => (
          <ListPicks
            key={index}
            plan={plan}
            chosen={chosenPlan === plan}
            handleChoice={handleChoice}
          />
        ))}
      </ScrollView>
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
    //marginTop: 100,
  },
});

export default MacroPlans;
