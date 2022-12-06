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
import ListPicks from "../components/ListPicks";
import client from "../api/client";
//import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "../context/auth";

function Macros({ navigation, route }) {
  const [macroPlans, setMacroPlans] = useState([]);
  const [chosenPlan, setChosenPlan] = useState(null);

  useEffect(() => {
    route.params.data = {
      ...route.params.data,
      balanced: { ...route.params.data.balanced, name: "Balanced" },
      highprotein: { ...route.params.data.highprotein, name: "High Protein" },
      lowcarbs: { ...route.params.data.lowcarbs, name: "Low Carbs" },
      lowfat: { ...route.params.data.lowfat, name: "Low Fat" },
    };
    setMacroPlans((prevPlans) => {
      return [
        route.params.data.balanced,
        route.params.data.highprotein,
        route.params.data.lowcarbs,
        route.params.data.lowfat,
      ];
    });
  }, []);

  console.log("route params in macros screen", route.params);

  function handleChoice(plan) {
    setChosenPlan(plan);
  }

  //put it here?

  /*
  const [state, setState] = useContext(AuthContext);

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "Access-Control-Allow-Origin": "*",
    },
  };

  try {
    const res = await client.post("/api/signup", { ...values }, config);
    console.log(res.data);

    if (res.data.error) {
      alert(res.data.error);
    } else {
      setState(res.data);
      await AsyncStorage.setItem("auth-rn", JSON.stringify(res.data));
      alert("Sign Up Successful");
    }
  } catch (error) {
    console.log(error.message);
  }
  */

  function finishSignup() {
    const userInfo = {
      name: route.params.name,
      email: route.params.email,
      password: route.params.password,
      age: route.params.age,
      height_ft: route.params.height_ft,
      height_inch: route.params.height_inch,
      weight: route.params.weight,
      gender: route.params.gender,
      activitylevel: route.params.activitylevel,
      goal: route.params.goal,
      macro_plan: route.params.data.plan,
      carbs: route.params.data.plan.carbs,
      fat: route.params.data.fat,
      protein: route.params.data.protein,
      calories: route.params.data.calorie,
      // calories: 0,
    };
  
    const {
      name,
      email,
      password,
      age,
      height_ft,
      height_inch,
      weight,
      gender,
      activitylevel,
      goal,
      macro_plan,
      carbs,
      fat,
      protein,
      calories,
      // calories,
    } = userInfo;

    console.log("this is the user now w/ all info: ", userInfo)

    let userCalories = route.params.data.calorie;
    let userName = route.params.name;
    let personObject = { userCalories, chosenPlan, userName };
    navigation.navigate("BottomTab", {
      screen: "Home",
      params: personObject,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          color: "white",
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Calorie Budget: {Math.round(route.params.data.calorie)}
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 25,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Choose a Macro Plan:
      </Text>
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

      {chosenPlan && (
        <Pressable style={styles.button} onPress={finishSignup}>
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Sign Up
          </Text>
        </Pressable>
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
    width: "40%",
    alignItems: "center",
    //marginTop: 100,
  },
});

export default Macros;
