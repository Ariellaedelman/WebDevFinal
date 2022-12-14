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

function StarsModal(props) {
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
            Stars
          </Text>
          <Paragraph style={{ color: "white" }}>
            Stars are used to buy exercises from the shop. You gain stars at the
            end of the day and they are proportiante to your rating. So if by
            the end of the day your rating is and 8 you will get 8 stars.
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

export default StarsModal;
