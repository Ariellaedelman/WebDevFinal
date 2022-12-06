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

function ListPicks(props) {
  function handlePress() {
    props.handleChoice(props.plan);
    //console.log(props.plan);
  }
  return (
    <Pressable onPress={handlePress}>
      <View style={props.chosen ? styles.chosenContainer : styles.container}>
        <Text style={styles.macroTitle}>{props.plan.name}</Text>
        <Text style={styles.macroType}>
          Protein: {Math.round(props.plan.protein)}g
        </Text>
        <Text style={styles.macroType}>
          Carbs: {Math.round(props.plan.carbs)}g
        </Text>
        <Text style={styles.macroType}>Fat: {Math.round(props.plan.fat)}g</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "red",
    marginBottom: 25,
    opacity: 0.5,
    padding: 15,
    //borderWidth: 2,
    //borderColor: "red",
  },
  chosenContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "red",
    marginBottom: 25,
    padding: 15,
    //borderWidth: 2,
    //borderColor: "red",
  },
  macroTitle: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    paddingBottom: 5,
  },
  macroType: {
    fontSize: 20,
    color: "white",
  },
});

export default ListPicks;
