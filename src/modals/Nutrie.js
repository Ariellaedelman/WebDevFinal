import {
  View,
  Button,
  SafeAreaView,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Text } from "react-native-paper";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function Nutrie(props) {
  const user = useSelector((state) => state.user.value);
  const calories = useSelector((state) => state.calories.value);
  const protein = useSelector((state) => state.protein.value);
  const carbs = useSelector((state) => state.carbs.value);
  const fat = useSelector((state) => state.fat.value);
  const rating = useSelector((state) => state.rating.value);
  const [calorieBool, setCalorieBool] = useState(false);
  const [proteinBool, setProteinBool] = useState(false);
  const [carbsBool, setCarbsBool] = useState(false);
  const [fatBool, setFatBool] = useState(false);
  const [suggestion, setSuggestion] = useState("this is the suggestion");
  function marginCheck(budget, current) {
    const margin = budget * 0.1;
    const higherBound = budget + margin;
    const lowerBound = budget - margin;

    if (current <= higherBound && current >= lowerBound) return true;
    else return false;
  }

  function getLowestMacro() {
    const proteinGrade = (protein / user.protein) * 100;
    const fatGrade = (fat / user.fat) * 100;
    const carbGrade = (carbs / user.carbs) * 100;

    if (proteinGrade <= fatGrade) {
      if (proteinGrade <= carbGrade) {
        return "protein";
      }
    }

    if (fatGrade <= proteinGrade) {
      if (fatGrade <= carbGrade) {
        return "fat";
      }
    }
    if (carbGrade <= proteinGrade) {
      if (carbGrade <= fatGrade) {
        return "carbs";
      }
    }
  }

  function getHighestMacro() {
    const proteinGrade = (protein / user.protein) * 100;
    const fatGrade = (fat / user.fat) * 100;
    const carbGrade = (carbs / user.carbs) * 100;

    if (proteinGrade >= fatGrade) {
      if (proteinGrade >= carbGrade) {
        return "protein";
      }
    }

    if (fatGrade >= proteinGrade) {
      if (fatGrade >= carbGrade) {
        return "fat";
      }
    }
    if (carbGrade >= proteinGrade) {
      if (carbGrade >= fatGrade) {
        return "carbs";
      }
    }
  }

  function getSuggestion() {
    const calorieCheck = marginCheck(user.calories, calories);
    const proteinCheck = marginCheck(user.protein, protein);
    const carbCheck = marginCheck(user.carbs, carbs);
    const fatCheck = marginCheck(user.fat, fat);
    if (calorieCheck && proteinCheck && carbCheck && fatCheck)
      return "No Suggestion. Everything Looks Good!";
    else if (!calorieCheck && !proteinCheck && !carbCheck && !fatCheck) {
      if (calories < user.calories) {
        const lowestMacro = getLowestMacro();
        if (lowestMacro === "protein") {
          return (
            "You are missing calories. Try focusing on foods with high " +
            lowestMacro +
            ". Such as Fish, Milk, Greek Yogurt, Eggs, Almonds, and Chicken Breast."
          );
        } else if (lowestMacro === "carbs") {
          return (
            "You are missing calories. Try focusing on foods with high " +
            lowestMacro +
            ". Such as Oats, Bananas, Sweet Potatoes, Oranges, Apples, and Blueberries."
          );
        } else if (lowestMacro === "fat") {
          return (
            "You are missing calories. Try focusing on foods with high " +
            lowestMacro +
            ". Such as Avocados, Cheese, Dark Chocolate, Nuts, Fatty Fish, and eggs."
          );
        }
      }
      if (calories > user.calories) {
        const highestMacro = getHighestMacro();
        return (
          "You ate too many calories. Your highest macro was " +
          highestMacro +
          "." +
          "Try eating less " +
          highestMacro
        );
      }
    }

    if (calorieCheck) {
      const highestMacro = getHighestMacro();
      const lowestMacro = getLowestMacro();
      return (
        "Your calories are fine but try eating more " +
        lowestMacro +
        " and less " +
        highestMacro
      );
    } else if (!calorieCheck) {
      if (calories < user.calories) {
        const lowestMacro = getLowestMacro();
        if (lowestMacro === "protein") {
          return (
            "You are missing calories. Try focusing on foods with high " +
            lowestMacro +
            ". Such as Fish, Milk, Greek Yogurt, Eggs, Almonds, and Chicken Breast."
          );
        } else if (lowestMacro === "carbs") {
          return (
            "You are missing calories. Try focusing on foods with high " +
            lowestMacro +
            ". Such as Oats, Bananas, Sweet Potatoes, Oranges, Apples, and Blueberries."
          );
        } else if (lowestMacro === "fat") {
          return (
            "You are missing calories. Try focusing on foods with high " +
            lowestMacro +
            ". Such as Avocados, Cheese, Dark Chocolate, Nuts, Fatty Fish, and eggs."
          );
        }
      } else if (calories > user.calories) {
        const highestMacro = getHighestMacro();
        return (
          "You ate too many calories. Your highest macro was " +
          highestMacro +
          "." +
          "Try eating less " +
          highestMacro
        );
      }
    }
  }

  useEffect(() => {
    setCalorieBool(marginCheck(user.calories, calories));
    setProteinBool(marginCheck(user.protein, protein));
    setCarbsBool(marginCheck(user.carbs, carbs));
    setFatBool(marginCheck(user.fat, fat));
    setSuggestion(getSuggestion());
  }, []);

  return (
    <SafeAreaView style={styles.modalContainer}>
      <View
        style={{
          alignSelf: "flex-start",
          marginLeft: 10,
        }}
      >
        <FontAwesome.Button
          name="close"
          size={25}
          onPress={props.close}
          backgroundColor={"#003f5c"}
        />
      </View>
      <Text
        style={{ color: "white", fontWeight: "bold" }}
        variant={"displayLarge"}
      >
        Nutrie
      </Text>
      <View style={{ flexDirection: "row", marginBottom: 10, marginTop: 20 }}>
        <Text style={{ color: "white" }} variant={"displayMedium"}>
          Rating:{" "}
        </Text>
        {rating < 7 ? (
          <Text style={{ color: "red" }} variant={"displayMedium"}>
            {rating} / 10
          </Text>
        ) : (
          <Text style={{ color: "green" }} variant={"displayMedium"}>
            {rating} / 10
          </Text>
        )}
      </View>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Text style={{ color: "white" }} variant={"displayMedium"}>
          Calories:{" "}
        </Text>
        {calorieBool ? (
          <Text style={{ color: "green" }} variant={"displayMedium"}>
            {calories} / {user.calories}
          </Text>
        ) : (
          <Text style={{ color: "red" }} variant={"displayMedium"}>
            {calories} / {user.calories}
          </Text>
        )}
      </View>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Text style={{ color: "white" }} variant={"displayMedium"}>
          Protein:{" "}
        </Text>
        {proteinBool ? (
          <Text style={{ color: "green" }} variant={"displayMedium"}>
            {protein} / {user.protein}
          </Text>
        ) : (
          <Text style={{ color: "red" }} variant={"displayMedium"}>
            {protein} / {user.protein}
          </Text>
        )}
      </View>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Text style={{ color: "white" }} variant={"displayMedium"}>
          Carbs:{" "}
        </Text>
        {carbsBool ? (
          <Text style={{ color: "green" }} variant={"displayMedium"}>
            {carbs} / {user.carbs}
          </Text>
        ) : (
          <Text style={{ color: "red" }} variant={"displayMedium"}>
            {carbs} / {user.carbs}
          </Text>
        )}
      </View>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Text style={{ color: "white" }} variant={"displayMedium"}>
          Fat:{" "}
        </Text>
        {fatBool ? (
          <Text style={{ color: "green" }} variant={"displayMedium"}>
            {fat} / {user.fat}
          </Text>
        ) : (
          <Text style={{ color: "red" }} variant={"displayMedium"}>
            {fat} / {user.fat}
          </Text>
        )}
      </View>
      <Text style={{ color: "white" }} variant={"headlineMedium"}>
        Suggestion:{" "}
      </Text>
      <Text style={{ color: "white", padding: 10 }} variant={"headlineSmall"}>
        {suggestion}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#003f5c",
    //borderWidth: 2,
    //borderColor: "blue",
  },
});
