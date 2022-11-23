import {
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
//import { View } from "react-native-web";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import EditProfileForm from "../forms/EditProfileForm";
import axios from "axios";

function EditProfile({ navigation }) {
  function poundsToKG(pounds) {
    let kg = Math.round(pounds / 2.205);
    return kg.toString();
  }
  function feetToCM(feet, inches) {
    let cm = Math.round(feet * 30.48 + inches * 2.54);
    return cm.toString();
  }
  function converActivityLevel(activitylevel) {
    if (activitylevel.toLowerCase() === "low") {
      return "2";
    } else if (activitylevel.toLowerCase() === "high") {
      return "6";
    } else {
      return "4";
    }
  }

  function convertGoal(goal) {
    if (goal.toLowerCase() === "lose") {
      return "weightlose";
    } else if (goal.toLowerCase() === "gain") {
      return "weightgain";
    } else {
      return "maintain";
    }
  }
  function onSubmit(personObject) {
    const apiObject = {
      age: personObject.age.toString(),
      gender: personObject.gender.toLowerCase(),
      height: feetToCM(personObject.height_ft, personObject.height_inch),
      weight: poundsToKG(personObject.weight),
      activitylevel: converActivityLevel(personObject.activitylevel),
      goal: convertGoal(personObject.goal),
    };
    console.log("api object before call", apiObject);
    const options = {
      method: "GET",
      url: "https://fitness-calculator.p.rapidapi.com/macrocalculator",
      params: apiObject,
      headers: {
        "X-RapidAPI-Key": "c6fdd0dd35msh8e2a7fa3cc90a5dp19f305jsnad757856109b",
        "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        console.log("response data", response.data);
        navigation.navigate("EditMacros", {
          ...response.data,
          ...personObject,
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  function goToHomeProfile() {
    navigation.navigate("HomeProfile");
  }
  return (
    <SafeAreaView style={styles.editProfileContainer}>
      <View style={{ alignSelf: "flex-start", marginLeft: 10 }}>
        <Ionicons.Button
          name="arrow-back"
          size={24}
          backgroundColor={"#003f5c"}
          //color="black"
          onPress={goToHomeProfile}
        />
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.editProfileContainer}>
          <KeyboardAwareScrollView style={styles.container}>
            <EditProfileForm
              goToHomeProfile={goToHomeProfile}
              onSubmit={onSubmit}
            />
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  editProfileContainer: {
    flex: 1,
    alignItems: "center",

    backgroundColor: "#003f5c",
    //borderWidth: 2,
    //borderColor: "red",
  },
  container: {
    //borderWidth: 2,
    //borderColor: "red",
  },
});

export default EditProfile;
