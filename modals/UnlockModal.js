import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";

import { useEffect, useState } from "react";

function UnlockModal(props) {
  function handleYes() {
    props.unlockExercise();
    props.close();
  }
  return (
    <TouchableWithoutFeedback onPress={props.close}>
      <View style={styles.modalContainer}>
        <View style={styles.modalBox}>
          <Text>Are you sure you want to unlock {props.exercise.name}</Text>
          <Text>for {props.exercise.points} stars?</Text>
          <View style={{ flexDirection: "row" }}>
            <Pressable style={styles.openModalButton} onPress={handleYes}>
              <Text>Yes</Text>
            </Pressable>
            <Pressable style={styles.openModalButton} onPress={props.close}>
              <Text>No</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  openModalButton: {
    backgroundColor: "red",
    borderRadius: 20,
    padding: 10,
    width: "20%",
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
    backgroundColor: "white",
    width: "80%",
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 0.25,
  },
});

export default UnlockModal;
