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
import FontAwesome from "@expo/vector-icons/FontAwesome";

function HeaderModal(props) {
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
      <Text>HeaderModal Container</Text>
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

export default HeaderModal;
