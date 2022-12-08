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
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native-paper";

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
  async function onSignup(personObject) {
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
    const { data } = await axios.request(options);

    //console.log("personobject", personObject);
    navigation.navigate("Macros", { ...personObject, ...data });
  }
  function onClose() {
    navigation.navigate("Login");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.signUpContainer}>
        <View style={{ alignSelf: "flex-start" }}>
          <Ionicons.Button
            name="arrow-back"
            size={30}
            backgroundColor={"#003f5c"}
            //color="black"
            onPress={onClose}
          />
        </View>
        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <Text variant="displaySmall" style={{ color: "white" }}>
            Signup
          </Text>
        </View>
        <KeyboardAwareScrollView>
          <SignupForm onSignup={onSignup} onClose={onClose} />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  signUpContainer: {
    flex: 1,
    backgroundColor: "#003f5c",
    //borderWidth: 2,
    //borderColor: "red",
  },
});

export default Signup;
