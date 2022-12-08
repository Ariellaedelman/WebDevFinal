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
import { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native-paper";

function HeaderModal(props) {
  const calories = useSelector((state) => state.calories.value);
  const rating = useSelector((state) => state.rating.value);
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
      <View style={styles.calorieContainer}>
        <Pressable>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text variant="titleLarge">Calories</Text>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="black"
            />
          </View>
          <Text variant="titleLarge">
            <FontAwesome5 name="fire-alt" size={28} color="#ff3333" />{" "}
            {calories}
          </Text>
        </Pressable>
      </View>
      <View style={styles.calorieContainer}>
        <Pressable>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text variant="titleLarge">Rating</Text>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="black"
            />
          </View>
          <Text variant="titleLarge">
            <FontAwesome5 name="cloudscale" size={28} color="lawngreen" />{" "}
            {rating}
          </Text>
        </Pressable>
      </View>
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
  calorieContainer: {
    backgroundColor: "#F7E6C2",
    width: "50%",
    padding: 20,
    borderRadius: 20,
    borderColor: "#E19C02",
    borderWidth: 2,
    marginBottom: 20,
  },
});

export default HeaderModal;
