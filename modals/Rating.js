import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Pressable,
} from "react-native";

import { useEffect, useState } from "react";

function Rating(props) {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setRating(calculateRating());
  }, []);

  function calculateRating() {
    const budget = { calories: 2500, protein: 250, carbs: 250, fat: 55 };
    let calorieRatio = props.totalCalories / budget.calories;
    let proteinRatio = props.totalProtein / budget.protein;
    let carbsRatio = props.totalCarbs / budget.carbs;
    let fatRatio = props.totalFat / budget.fat;

    if (calorieRatio <= 1) {
      calorieRatio = calorieRatio * 0.52;
    } else {
      calorieRatio = (1 - (calorieRatio - 1)) * 0.52;
    }

    if (proteinRatio <= 1) {
      proteinRatio = proteinRatio * 0.16;
    } else {
      proteinRatio = (1 - (proteinRatio - 1)) * 0.16;
    }

    if (carbsRatio <= 1) {
      carbsRatio = carbsRatio * 0.16;
    } else {
      carbsRatio = (1 - (carbsRatio - 1)) * 0.16;
    }

    if (fatRatio <= 1) {
      fatRatio = fatRatio * 0.16;
    } else {
      fatRatio = (1 - (fatRatio - 1)) * 0.16;
    }

    let totalSum = (calorieRatio + proteinRatio + fatRatio + carbsRatio) * 10;

    return totalSum;
  }
  return (
    <SafeAreaView style={styles.ratingContainer}>
      <Text style={styles.ratingText}>Your Rating is: {rating.toFixed(1)}</Text>
      <Pressable onPress={props.closeRating} style={styles.closeBttn}>
        <Text style={styles.ratingText}>Close Rating</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ratingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#003f5c",
  },
  ratingText: {
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
  },
  closeBttn: {
    backgroundColor: "crimson",
    width: "80%",
    alignItems: "center",
    borderRadius: 25,
    padding: 10,
    marginBottom: 20,
  },
});
export default Rating;
