import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useEffect, useState } from "react";
import Exercises from "../apis/Exercises";

function Shop() {
  const [modalVisible, setModalVisible] = useState(false);
  function closeModal() {
    setModalVisible(false);
  }
  function openModal() {
    setModalVisible(true);
  }
  return (
    <SafeAreaView style={styles.shopContainer}>
      <TouchableOpacity style={styles.exerciseCategory} onPress={openModal}>
        <Text style={styles.shopText}>Cardio</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType={"slide"}>
        <Exercises closeModal={closeModal} />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  shopContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#003f5c",
    justifyContent: "center",
  },
  shopText: {
    fontSize: 20,
    color: "white",
  },
  exerciseCategory: {
    width: "60%",
    backgroundColor: "#fb5b5a",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Shop;
