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
import RatingModal from "./RatingModal";
import StarsModal from "./StarsModal";
import CaloriesModal from "./CaloriesModal";

function HeaderModal(props) {
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [starsModalVisible, setStarsModalVisible] = useState(false);
  const [caloriesModalVisible, setCaloriesModalVisible] = useState(false);
  const calories = useSelector((state) => state.calories.value);
  const rating = useSelector((state) => state.rating.value);
  const stars = useSelector((state) => state.stars.value);
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
      <Text
        variant={"headlineLarge"}
        style={{ color: "white", marginBottom: 20, fontWeight: "600" }}
      >
        Today's Stats
      </Text>
      <View style={styles.calorieContainer}>
        <Pressable onPress={() => setCaloriesModalVisible(true)}>
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
      <View style={styles.ratingContainer}>
        <Pressable onPress={() => setRatingModalVisible(true)}>
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
      <View style={styles.starContainer}>
        <Pressable onPress={() => setStarsModalVisible(true)}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text variant="titleLarge">Stars</Text>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="black"
            />
          </View>
          <Text variant="titleLarge">
            <FontAwesome5 name="star" size={28} color="yellow" /> {stars}
          </Text>
        </Pressable>
      </View>

      <Modal
        visible={ratingModalVisible}
        transparent={true}
        animationType={"slide"}
      >
        <RatingModal close={() => setRatingModalVisible(false)} />
      </Modal>
      <Modal
        visible={starsModalVisible}
        transparent={true}
        animationType={"slide"}
      >
        <StarsModal close={() => setStarsModalVisible(false)} />
      </Modal>
      <Modal
        visible={caloriesModalVisible}
        transparent={true}
        animationType={"slide"}
      >
        <CaloriesModal close={() => setCaloriesModalVisible(false)} />
      </Modal>
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
    width: "60%",
    padding: 20,
    borderRadius: 20,
    borderColor: "#E19C02",
    borderWidth: 2,
    marginBottom: 20,
  },
  starContainer: {
    backgroundColor: "#C2D3F7",
    width: "60%",
    padding: 20,
    borderRadius: 20,
    borderColor: "blue",
    borderWidth: 2,
    marginBottom: 20,
  },
  ratingContainer: {
    backgroundColor: "#E6C2F7",
    width: "60%",
    padding: 20,
    borderRadius: 20,
    borderColor: "#7a49a5",
    borderWidth: 2,
    marginBottom: 20,
  },
});

export default HeaderModal;
