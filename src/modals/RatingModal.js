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

function RatingModal(props) {
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
            Rating
          </Text>
          <Paragraph style={{ color: "white" }}>
            Rating shows you how well you are following your calorie and macro
            budgets. The highest rating you can have is a 10 and the lowest is a
            0. Calories have the biggest weight on your rating they account for
            58% of the rating. Fat, Protein, Carbs each account for 16% of the
            rating. The closer your daily calories/macros are to your budget the
            higher your rating will be.
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

export default RatingModal;
