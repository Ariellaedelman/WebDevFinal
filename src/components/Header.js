import {
  SafeAreaView,
  Text,
  Button,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementCalories, decrementCalories } from "../redux/calories";
import { incrementStars, decrementStars } from "../redux/stars";
import { setRating } from "../redux/rating";
import { FontAwesome5 } from "@expo/vector-icons";
import HeaderModal from "../modals/HeaderModal";

export default function Header() {
  const [headerModalVisible, setHeaderModalVisible] = useState(false);
  const calories = useSelector((state) => state.calories.value);
  const rating = useSelector((state) => state.rating.value);
  const stars = useSelector((state) => state.stars.value);
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      onPress={() => setHeaderModalVisible(true)}
      activeOpacity={0.9}
    >
      <SafeAreaView style={styles.headerContainer}>
        <Text style={styles.textStyle}>
          <FontAwesome5 name="cloudscale" size={28} color="lawngreen" />{" "}
          {rating}
        </Text>
        <Text style={styles.textStyle}>
          <FontAwesome5 name="fire-alt" size={28} color="#ff3333" /> {calories}
        </Text>
        <Text style={styles.textStyle}>
          <FontAwesome5 name="star" size={28} color="yellow" /> {stars}
        </Text>
        <Modal
          visible={headerModalVisible}
          animationType={"slide"}
          //transparent={true}
        >
          <HeaderModal close={() => setHeaderModalVisible(false)} />
        </Modal>
      </SafeAreaView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomColor: "white",
    borderBottomWidth: 0.25,
    backgroundColor: "#003f5c",
    padding: 20,
  },
  textStyle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
  },
});
