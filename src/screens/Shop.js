import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  Modal,
  ScrollView,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import ShopEntry from "../components/ShopEntry";
import UnlockModal from "../modals/UnlockModal";
import { Entypo } from "@expo/vector-icons";
import ExerciseModal from "../modals/ExerciseModal";
import { useSelector, useDispatch } from "react-redux";
import { decrementStars } from "../redux/stars";
import { Ionicons } from "@expo/vector-icons";
import ShopInfoModal from "../modals/ShopInfoModal";
//import RootStack from "./navigators/RootStack";

export default function Shop() {
  const stars = useSelector((state) => state.stars.value);
  const dispatch = useDispatch();
  const [shopData, setShopData] = useState([
    {
      name: "Cardio",
      points: 50,
      locked: true,
      data: [
        {
          id: "3220",
          name: "Astride Jumps",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/3220.gif",

          target: "Cardiovascular System",
          equipment: "Body Weight",
        },
        {
          id: "2612",
          name: "Jump Rope",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/2612.gif",

          target: "Cardiovascular System",
          equipment: "Rope",
        },
        {
          id: "2141",
          name: "Walk Elliptical Cross Trainer",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/2141.gif",

          target: "Cardiovascular System",
          equipment: "Elliptical Machine",
        },
        {
          id: "1201",
          name: "Dumbbell Burpee",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/1201.gif",

          target: "Cardiovascular System",
          equipment: "Dumbbell",
        },
        {
          id: "2331",
          name: "Cycle Cross Trainer",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/2331.gif",

          target: "Cardiovascular System",
          equipment: "Leverage Machine",
        },
      ],
    },
    {
      name: "Back",
      points: 50,
      locked: true,
      data: [
        {
          id: "0007",
          name: "Alternate Lateral Pulldown",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/0007.gif",
          target: "Lats",
          equipment: "Cable",
        },
        {
          id: "1314",
          name: "Back Extension on Exercise Ball",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/1314.gif",
          target: "Spine",
          equipment: "Stability Ball",
        },
        {
          id: "3297",
          name: "Back Lever",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/3297.gif",
          target: "Upper Back",
          equipment: "Body Weight",
        },
        {
          id: "0406",
          name: "Dumbbell Shrug",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/0406.gif",
          target: "Traps",
          equipment: "Dumbbell",
        },
        {
          id: "1431",
          name: "Assisted Standing Chin-Up",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/1431.gif",
          target: "Lats",
          equipment: "Leverage Machine",
        },
      ],
    },
    {
      name: "Chest",
      points: 50,
      locked: true,
      data: [
        {
          id: "3294",
          name: "Archer Push-Up",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/3294.gif",
          target: "Pectorals",
          equipment: "Body Weight",
        },
        {
          id: "0009",
          name: "Assisted Chest Dip (Kneeling)",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/0009.gif",
          target: "Pectorals",
          equipment: "Leverage Machine",
        },
        {
          id: "1254",
          name: "Band Bench Press",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/1254.gif",
          target: "Pectorals",
          equipment: "Band",
        },
        {
          id: "0025",
          name: "Barbell Bench Press",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/0025.gif",
          target: "Pectorals",
          equipment: "Barbell",
        },
        {
          id: "0171",
          name: "Cable Incline Fly",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/0171.gif",
          target: "Pectorals",
          equipment: "Cable",
        },
      ],
    },
    {
      name: "Shoulders",
      points: 50,
      locked: true,
      data: [
        {
          id: "3122",
          name: "Resistance Band Seated Shoulder Press",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/3122.gif",
          target: "Delts",
          equipment: "Resistance Band",
        },
        {
          id: "0747",
          name: "Smith Behind Neck Press",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/0747.gif",
          target: "Delts",
          equipment: "Smith Machine",
        },
        {
          id: "0762",
          name: "Smith Rear Delt Row",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/0762.gif",
          target: "Delts",
          equipment: "Smith Machine",
        },
        {
          id: "0765",
          name: "Smith Seated Shoulder Press",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/0765.gif",
          target: "Delts",
          equipment: "Smith Machine",
        },
        {
          id: "0766",
          name: "Smith Shoulder Press",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/0766.gif",
          target: "Delts",
          equipment: "Smith Machine",
        },
      ],
    },
    {
      name: "Legs",
      points: 50,
      locked: true,
      data: [
        {
          id: "0768",
          name: "Smith Single Leg Split Squat",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/0768.gif",
          target: "Quads",
          equipment: "Smith Machine",
        },
        {
          id: "0752",
          name: "Smith Deadlift",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/0752.gif",
          target: "Glutes",
          equipment: "Smith Machine",
        },
        {
          id: "3645",
          name: "Single Leg Bridge with Outstretched Leg",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/3645.gif",
          target: "Glutes",
          equipment: "Body Weight",
        },
        {
          id: "0108",
          name: "Barbell Standing Leg Calf Raise",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/0108.gif",
          target: "Calves",
          equipment: "Barbell",
        },
        {
          id: "0111",
          name: "Barbell Standing Rocking Leg Calf Raise",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/0111.gif",
          target: "Calves",
          equipment: "Barbell",
        },
      ],
    },
    {
      name: "Arms",
      points: 50,
      locked: true,
      data: [
        {
          id: "0018",
          name: "Assisted Standing Triceps Extension (with towel)",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/0018.gif",
          equipment: "Assisted",
          target: "Triceps",
        },
        {
          id: "0975",
          name: "Band Close-Grip Push-Up",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/0975.gif",
          equipment: "Band",
          target: "Triceps",
        },
        {
          id: "0968",
          name: "Band Alternating Biceps Curl",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/0968.gif",
          equipment: "Band",
          target: "Biceps",
        },
        {
          id: "0994",
          name: "Band Reverse Wrist Curl",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/0994.gif",
          equipment: "Band",
          target: "Forearms",
        },
        {
          id: "0455",
          name: "Finger Curls",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/0455.gif",
          equipment: "Barbell",
          target: "Forearms",
        },
      ],
    },
  ]);
  const [unlockModalVisible, setUnlockModalVisible] = useState(false);
  const [shopInfoVisible, setShopInfoVisible] = useState(false);
  const [exerciseModalVisible, setExerciseModalVisible] = useState(false);
  const [chosenExercise, setChosenExercise] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);

  function handlePress(exercise) {
    if (exercise.locked && stars >= exercise.points) {
      setChosenExercise(exercise);
      setUnlockModalVisible(true);
    } else if (!exercise.locked) {
      setChosenExercise(exercise);
      setExerciseModalVisible(true);
    } else {
      setErrorMessage(true);
      setTimeout(() => setErrorMessage(false), 1000);
    }
  }
  function unlockExercise() {
    dispatch(decrementStars(chosenExercise.points));
    setShopData((prevExercises) => {
      return prevExercises.map((exercise) => {
        if (exercise.name === chosenExercise.name) {
          return { ...exercise, locked: false };
        } else {
          return exercise;
        }
      });
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={{
          alignSelf: "flex-end",
          marginRight: 30,
          marginTop: 20,

          //borderWidth: 2,
          //borderColor: "red",
        }}
        onPress={() => setShopInfoVisible(true)}
      >
        <Ionicons name="information-circle-outline" size={30} color="white" />
      </Pressable>
      {errorMessage && (
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
          NOT ENOUGH POINTS!
        </Text>
      )}
      <ScrollView style={{ padding: 25 }}>
        {shopData.map((exercise, index) => (
          <ShopEntry
            key={index}
            exercise={exercise}
            handlePress={handlePress}
          />
        ))}
      </ScrollView>
      <Modal
        visible={unlockModalVisible}
        transparent={true}
        animationType={"slide"}
      >
        <UnlockModal
          close={() => setUnlockModalVisible(false)}
          exercise={chosenExercise}
          unlockExercise={unlockExercise}
        />
      </Modal>
      <Modal visible={exerciseModalVisible} animationType={"slide"}>
        <ExerciseModal
          close={() => setExerciseModalVisible(false)}
          exercise={chosenExercise}
        />
      </Modal>
      <Modal
        visible={shopInfoVisible}
        transparent={true}
        animationType={"slide"}
      >
        <ShopInfoModal close={() => setShopInfoVisible(false)} />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#003f5c",
  },
});
