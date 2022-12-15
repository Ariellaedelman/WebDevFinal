import {
  View,
  Button,
  SafeAreaView,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";

import { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Text, Paragraph } from "react-native-paper";

function CaloriesModal(props) {
  function handleYes() {
    props.unlockExercise();
    props.close();
  }
  return (
    <TouchableWithoutFeedback onPress={props.close}>
      <View style={styles.modalContainer}>
        <View style={styles.modalBox}>
          <Text
            variant={"headlineMedium"}
            style={{ color: "white", fontWeight: "600", marginBottom: 20 }}
          >
            Calories
          </Text>
          <Paragraph style={{ color: "white" }}>
            Our bodies need calories for energy. An overconsumption leads to
            weight gain and an underconsumption leaves our body with little
            energy. Make sure to stay within your calorie budget so that you hit
            your fitness goals!
          </Paragraph>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  openModalButton: {
    backgroundColor: "crimson",
    borderRadius: 20,
    padding: 10,
    width: "35%",
    marginRight: 20,
    alignItems: "center",
    //marginTop: 100,
  },

  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    //borderWidth: 2,
    //borderColor: "blue",
  },
  modalBox: {
    backgroundColor: "grey",
    width: "80%",
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 0.25,
    padding: 10,
    borderRadius: 20,
  },
});

export default CaloriesModal;
