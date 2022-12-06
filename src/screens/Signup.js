import {
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SignupForm from "../forms/SignupForm";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import axios from "axios";

function Signup({ navigation }) {
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
  function onSignup(personObject) {
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
        navigation.navigate("Macros", { ...response.data, ...personObject });
        //apiObject = response.data;
        // let tempArr = [];
        // tempArr.push(
        //   response.data.balanced,
        //   response.data.lowfat,
        //   response.data.lowcarbs,
        //   response.data.highprotein
        // );
        // setMacroPlans(tempArr);
      })
      .catch(function (error) {
        console.error(error);
      });
    //console.log("personobject", personObject);
    //navigation.navigate("Macros", apiObject);
  }
  function onClose() {
    navigation.navigate("Login");
  }

  return (
    <SafeAreaView style={styles.signUpContainer}>
      <View
        style={{
          alignSelf: "flex-start",
          marginLeft: 10,
        }}
      >
        <FontAwesome.Button
          name="close"
          size={20}
          onPress={onClose}
          backgroundColor={"#003f5c"}
          color={"white"}
        />
      </View>
      <KeyboardAwareScrollView>
        <SignupForm onSignup={onSignup} onClose={onClose} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  signUpContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#003f5c",
    //borderWidth: 2,
    //borderColor: "red",
  },
});

export default Signup;
