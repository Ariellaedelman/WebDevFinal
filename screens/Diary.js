import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import CalorieNinjas from "../apis/CalorieNinjas";

function Diary() {
  const [calNinjaVisible, setCalNinjaVisible] = useState(false);
  function openCalNinja() {
    setCalNinjaVisible(true);
  }
  function closeCalNinja() {
    setCalNinjaVisible(false);
  }
  return (
    <View style={styles.diaryContainer}>
      <Text>This is the Diary page</Text>
      <TouchableOpacity style={styles.addFoodBttn} onPress={openCalNinja}>
        <Text>Add Food</Text>
      </TouchableOpacity>
      <Modal visible={calNinjaVisible} animationType={"slide"}>
        <CalorieNinjas onCancel={closeCalNinja} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  diaryContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addFoodBttn: {
    backgroundColor: "#fb5b5a",
    width: "80%",
    alignItems: "center",
    borderRadius: 25,
    padding: 10,
    marginBottom: 20,
  },
});
export default Diary;
