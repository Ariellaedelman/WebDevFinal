import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  Modal,
} from "react-native";
import { useEffect, useState } from "react";
import ShopEntry from "../components/ShopEntry";
import UnlockModal from "../modals/UnlockModal";
import { Entypo } from "@expo/vector-icons";
import ExerciseModal from "../modals/ExerciseModal";
//import RootStack from "./navigators/RootStack";

export default function Shop() {
  const [totalStars, setTotalStars] = useState(500);
  const [shopData, setShopData] = useState([
    {
      name: "Cardio",
      points: 500,
      locked: true,
      data: [
        {
          id: "3220",
          name: "astride jumps",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/3220.gif",
        },
        {
          id: "3672",
          name: "back and forth step",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/3672.gif",
        },
        {
          id: "3360",
          name: "bear crawl",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/3360.gif",
        },
        {
          id: "1160",
          name: "burpee",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/1160.gif",
        },
        {
          id: "2331",
          name: "cycle cross trainer",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/2331.gif",
        },
      ],
    },
    {
      name: "Back",
      points: 500,
      locked: true,
      data: [
        {
          id: "0007",
          name: "alternate lateral pulldown",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/0007.gif",
        },
        {
          id: "3293",
          name: "archer pull up",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/3293.gif",
        },
        {
          id: "0015",
          name: "assisted parallel close grip pull-up",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/0015.gif",
        },
        {
          id: "0017",
          name: "assisted pull-up",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/0017.gif",
        },
        {
          id: "1431",
          name: "assisted standing chin-up",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/1431.gif",
        },
      ],
    },
    {
      name: "Chest",
      points: 500,
      locked: true,
      data: [
        {
          id: "3145",
          name: "push-up plus",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/3145.gif",
        },
        {
          id: "0666",
          name: "raise single arm push-up",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/0666.gif",
        },
        {
          id: "3124",
          name: "resistance band seated chest press",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/3124.gif",
        },
        {
          id: "2203",
          name: "roller seated shoulder flexor depresor retractor",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/2203.gif",
        },
        {
          id: "2209",
          name: "roller seated single leg shoulder flexor depresor retractor",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/2209.gif",
        },
      ],
    },
    {
      name: "Shoulders",
      points: 500,
      locked: true,
      data: [
        {
          id: "3122",
          name: "resistance band seated shoulder press",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/3122.gif",
        },
        {
          id: "0747",
          name: "smith behind neck press",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/0747.gif",
        },
        {
          id: "0762",
          name: "smith rear delt row",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/0762.gif",
        },
        {
          id: "0765",
          name: "smith seated shoulder press",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/0765.gif",
        },
        {
          id: "0766",
          name: "smith shoulder press",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/0766.gif",
        },
      ],
    },
    {
      name: "Legs",
      points: 500,
      locked: true,
      data: [
        {
          id: "0768",
          name: "smith single leg split squat",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/0768.gif",
        },
        {
          id: "0752",
          name: "smith deadlift",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/0752.gif",
        },
        {
          id: "3645",
          name: "single leg bridge with outstretched leg",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/3645.gif",
        },
        {
          id: "0108",
          name: "barbell standing leg calf raise",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/0108.gif",
        },
        {
          id: "0111",
          name: "barbell standing rocking leg calf raise",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/0111.gif",
        },
      ],
    },
    {
      name: "Arms",
      points: 500,
      locked: true,
      data: [
        {
          id: "0390",
          name: "dumbbell seated biceps curl (on stability ball)",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/0390.gif",
        },
        {
          id: "3547",
          name: "dumbbell seated biceps curl to shoulder press",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/3547.gif",
        },
        {
          id: "0391",
          name: "dumbbell seated curl",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/0391.gif",
        },
        {
          id: "0104",
          name: "barbell standing back wrist curl",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/0104.gif",
        },
        {
          id: "0126",
          name: "barbell wrist curl",
          gif: "http://d205bpvrqc9yn1.cloudfront.net/0126.gif",
        },
      ],
    },
  ]);
  const [unlockModalVisible, setUnlockModalVisible] = useState(false);
  const [exerciseModalVisible, setExerciseModalVisible] = useState(false);
  const [chosenExercise, setChosenExercise] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);

  function handlePress(exercise) {
    if (exercise.locked && totalStars >= exercise.points) {
      setChosenExercise(exercise);
      setUnlockModalVisible(true);
    } else if (!exercise.locked) {
      setExerciseModalVisible(true);
    } else {
      setErrorMessage(true);
      setTimeout(() => setErrorMessage(false), 1000);
    }
  }
  function unlockExercise() {
    setTotalStars((prevStars) => prevStars - chosenExercise.points);
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
      {errorMessage && (
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
          NOT ENOUGH POINTS!
        </Text>
      )}
      <View style={styles.pointsContainer}>
        <Entypo name="star" size={24} color="white" />
        <Text style={styles.pointsText}> : {totalStars} </Text>
      </View>
      {shopData.map((exercise, index) => (
        <ShopEntry key={index} exercise={exercise} handlePress={handlePress} />
      ))}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#003f5c",
    //borderWidth: 2,
    //borderColor: "red",
  },
  pointsContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "flex-end",
    marginRight: 40,
    //borderWidth: 2,
    //borderColor: "red",
    padding: 10,
  },
  pointsText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "red",
    borderRadius: 20,
    padding: 10,
    width: "40%",
    alignItems: "center",
    //marginTop: 100,
  },
});
