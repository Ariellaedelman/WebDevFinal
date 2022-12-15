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

function ShopInfoModal(props) {
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
            style={{ color: "white", fontWeight: "600" }}
          >
            The Shop
          </Text>
          <Paragraph style={{ color: "white" }}>
            The shop sells exercises by different body parts. Each body part
            contains 5 exercises. Shop refreshes on the first of every month.
            Use stars to buy exercises.
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

export default ShopInfoModal;
