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
import Cardio from "../modals/Cardio";
import Chest from "../modals/Chest";
import Back from "../modals/Back";
import Legs from "../modals/Legs";
import Arms from "../modals/Arms";
import Shoulders from "../modals/Shoulders";

function Shop() {
  const [cardioVisible, setCardioVisible] = useState(false);
  const [backVisible, setBackVisible] = useState(false);
  const [chestVisible, setChestVisible] = useState(false);
  const [legsVisible, setLegsVisible] = useState(false);
  const [armsVisible, setArmsVisible] = useState(false);
  const [shouldersVisible, setShouldersVisible] = useState(false);
  const [points, setpoints] = useState(1500);
  const [cardioLock, setCardioLock] = useState("Locked");
  const [backLock, setBackLock] = useState("Locked");
  const [chestLock, setChestLock] = useState("Locked");
  const [shouldersLock, setShouldersLock] = useState("Locked");
  const [legsLock, setLegsLock] = useState("Locked");
  const [armsLock, setArmsLock] = useState("Locked");

  function closeCardio() {
    setCardioVisible(false);
  }
  function openCardio() {
    if (cardioLock === "Unlocked") {
      setCardioVisible(true);
    }
  }
  function closeBack() {
    setBackVisible(false);
  }
  function openBack() {
    if (backLock === "Unlocked") {
      setBackVisible(true);
    }
  }
  function closeChest() {
    setChestVisible(false);
  }
  function openChest() {
    if (chestLock === "Unlocked") {
      setChestVisible(true);
    }
  }
  function closeLegs() {
    setLegsVisible(false);
  }
  function openLegs() {
    if (legsLock === "Unlocked") {
      setLegsVisible(true);
    }
  }
  function closeArms() {
    setArmsVisible(false);
  }
  function openArms() {
    if (armsLock === "Unlocked") {
      setArmsVisible(true);
    }
  }
  function closeShoulders() {
    setShouldersVisible(false);
  }
  function openShoulders() {
    if (shouldersLock === "Unlocked") {
      setShouldersVisible(true);
    }
  }
  function unlockCardio() {
    if (points >= 500) {
      setCardioLock("Unlocked");
      setpoints((previousState) => {
        return previousState - 500;
      });
    }
  }
  function unlockBack() {
    if (points >= 500) {
      setBackLock("Unlocked");
      setpoints((previousState) => {
        return previousState - 500;
      });
    }
  }
  function unlockChest() {
    if (points >= 500) {
      setChestLock("Unlocked");
      setpoints((previousState) => {
        return previousState - 500;
      });
    }
  }
  function unlockShoulders() {
    if (points >= 500) {
      setShouldersLock("Unlocked");
      setpoints((previousState) => {
        return previousState - 500;
      });
    }
  }
  function unlockLegs() {
    if (points >= 500) {
      setLegsLock("Unlocked");
      setpoints((previousState) => {
        return previousState - 500;
      });
    }
  }
  function unlockArms() {
    if (points >= 500) {
      setArmsLock("Unlocked");
      setpoints((previousState) => {
        return previousState - 500;
      });
    }
  }
  return (
    <SafeAreaView style={styles.shopContainer}>
      <View style={styles.points}>
        <Text style={{ fontSize: 20, color: "white" }}>Points: {points}</Text>
      </View>
      <View style={styles.exercises}>
        <TouchableOpacity style={styles.exerciseCategory} onPress={openCardio}>
          <View style={styles.name}>
            <Text style={styles.shopText}>Cardio</Text>
          </View>
          <Text style={styles.pointsText}>500 points</Text>
          <Text style={styles.lockedText} onPress={unlockCardio}>
            {cardioLock}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.exerciseCategory} onPress={openBack}>
          <View style={styles.name}>
            <Text style={styles.shopText}>Back</Text>
          </View>
          <Text style={styles.pointsText}>500 points</Text>
          <Text style={styles.lockedText} onPress={unlockBack}>
            {backLock}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.exerciseCategory} onPress={openChest}>
          <View style={styles.name}>
            <Text style={styles.shopText}>Chest</Text>
          </View>
          <Text style={styles.pointsText}>500 points</Text>
          <Text style={styles.lockedText} onPress={unlockChest}>
            {chestLock}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.exerciseCategory}
          onPress={openShoulders}
        >
          <View style={styles.name}>
            <Text style={styles.shopText}>Shoulders</Text>
          </View>
          <Text style={styles.pointsText}>500 points</Text>
          <Text style={styles.lockedText} onPress={unlockShoulders}>
            {shouldersLock}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.exerciseCategory} onPress={openLegs}>
          <View style={styles.name}>
            <Text style={styles.shopText}>Legs</Text>
          </View>
          <Text style={styles.pointsText}>500 points</Text>
          <Text style={styles.lockedText} onPress={unlockLegs}>
            {legsLock}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.exerciseCategory} onPress={openArms}>
          <View style={styles.name}>
            <Text style={styles.shopText}>Arms</Text>
          </View>
          <Text style={styles.pointsText}>500 points</Text>
          <Text style={styles.lockedText} onPress={unlockArms}>
            {armsLock}
          </Text>
        </TouchableOpacity>
      </View>
      <Modal visible={cardioVisible} animationType={"slide"}>
        <Cardio closeCardio={closeCardio} />
      </Modal>
      <Modal visible={chestVisible} animationType={"slide"}>
        <Chest closeChest={closeChest} />
      </Modal>
      <Modal visible={backVisible} animationType={"slide"}>
        <Back closeBack={closeBack} />
      </Modal>
      <Modal visible={armsVisible} animationType={"slide"}>
        <Arms closeArms={closeArms} />
      </Modal>
      <Modal visible={legsVisible} animationType={"slide"}>
        <Legs closeLegs={closeLegs} />
      </Modal>
      <Modal visible={shouldersVisible} animationType={"slide"}>
        <Shoulders closeShoulders={closeShoulders} />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  shopContainer: {
    flex: 1,
    backgroundColor: "#003f5c",
    //borderWidth: 2,
    //borderColor: "red",
  },
  shopText: {
    fontSize: 20,
    color: "white",
  },
  exerciseCategory: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    alignItems: "center",
    marginBottom: 15,
    justifyContent: "space-between",
    //backgroundColor: "red",
    //padding: 10,
  },
  points: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    //borderWidth: 2,
    //borderColor: "red",
    width: "30%",
    marginBottom: 20,
    padding: 20,
  },
  exercises: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    //borderWidth: 2,
    //borderColor: "red",
  },
  pointsText: {
    //marginLeft: 150,
    color: "white",
    fontSize: 15,
  },
  lockedText: {
    borderWidth: 2,
    borderColor: "black",
    fontSize: "15",
    color: "white",
    //marginLeft: 1,
    padding: 10,
  },
  name: {
    width: "25%",
  },
});
export default Shop;
