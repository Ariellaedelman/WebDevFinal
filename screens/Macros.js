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

  function finishSignup() {
    let calories = route.params.data.calorie;
    let name = route.params.name;
    let personObject = { calories, chosenPlan, name };
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
