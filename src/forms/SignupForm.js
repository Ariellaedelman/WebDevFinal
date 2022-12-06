import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useContext } from "react";
import { Formik } from "formik";
import * as yup from "yup";

import client from "../../api/client";

//import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "../../context/auth";

const LoginSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(7),
  age: yup.number().required().integer().min(1),
  height: yup.number().required(),
  weight: yup.number().required(),
  gender: yup
    .string()
    .required()
    .test("genderCheck", "not male or female", (gender) => {
      if (gender.toLowerCase() === "male" || gender.toLowerCase === "female") {
        return true;
      } else {
        return false;
      }
    }),
  activitylevel: yup.string().required(),
});

function SignupForm(props) {
  const userInfo = {
    name: "",
    email: "",
    password: "",
    age: 0,
    height_ft: 0,
    height_inch: 0,
    weight: 0,
    gender: "",
    activitylevel: "",
    goal: "",
    calories: 0,
  };

  const {
    name,
    email,
    password,
    age,
    height_ft,
    height_inch,
    weight,
    gender,
    activitylevel,
    goal,
    calories,
  } = userInfo;

  const [state, setState] = useContext(AuthContext);

  const signUp = async (values, actions) => {
    values.age = parseInt(values.age, 10);
    values.height_ft = parseInt(values.height_ft, 10);
    values.height_inch = parseInt(values.height_inch, 10);
    values.weight = parseInt(values.weight, 10);
    values.calories = calorieBudget(
      values.age,
      values.height_ft,
      values.height_inch,
      values.weight,
      values.gender,
      values.activitylevel,
      values.goal
    );

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        "Access-Control-Allow-Origin": "*",
      },
    };

    try {
      const res = await client.post("/api/signup", { ...values }, config);
      console.log(res.data);

      if (res.data.error) {
        alert(res.data.error);
      } else {
        setState(res.data);
        await AsyncStorage.setItem("auth-rn", JSON.stringify(res.data));
        alert("Sign Up Successful");
      }
    } catch (error) {
      console.log(error.message);
    }
    console.log("values passed to signup", values);

    props.onSignup(values);

    actions.resetForm();
  };

  function poundsToKG(pounds) {
    let kg = pounds / 2.205;
    return kg;
  }
  function feetToCM(feet) {
    let cm = feet * 30.48;
    return cm;
  }
  function inchToCM(inch) {
    let cm = inch * 2.54;
    return cm;
  }
  function calorieBudget(
    age,
    height_ft,
    height_inch,
    weight,
    gender,
    activitylevel,
    goal
  ) {
    weight = poundsToKG(weight);
    height_ft = feetToCM(height_ft);
    height_inch = inchToCM(height_inch);
    let total_height_cm = height_ft + height_inch;
    let BMR = 0;
    if (gender.toLowerCase() === "male") {
      BMR = 10 * weight + 6.25 * total_height_cm - 5 * age + 5;
    } else {
      BMR = 10 * weight + 6.25 * total_height_cm - 5 * age - 161;
    }

    if (activitylevel.toLowerCase() === "high") {
      BMR = BMR * 1.75;
    } else if (activitylevel.toLowerCase() == "medium") {
      BMR = BMR * 1.5;
    } else {
      BMR = BMR * 1.25;
    }

    if (goal.toLowerCase() === "lose") {
      BMR = BMR - 500;
    } else if (goal.toLowerCase() === "gain") {
      BMR = BMR + 500;
    }

    return Math.round(BMR);
  }
  return (
    <Formik
      initialValues={userInfo}
      //validationSchema={LoginSchema}
      onSubmit={signUp}
    >
      {(formProps) => (
        <View style={styles.editSignupFormContainer}>
          <Text style={styles.inputTitle}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. John Doe"
            placeholderTextColor={"grey"}
            onChangeText={formProps.handleChange("name")}
            value={formProps.values.name}
          />
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. rocket@gmail.com"
            placeholderTextColor={"grey"}
            onChangeText={formProps.handleChange("email")}
            value={formProps.values.email}
          />
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            placeholderTextColor={"white"}
            onChangeText={formProps.handleChange("password")}
            value={formProps.values.password}
          />
          <Text style={styles.inputTitle}>Age</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            placeholderTextColor={"white"}
            onChangeText={formProps.handleChange("age")}
            value={formProps.values.age}
            keyboardType="numeric"
          />
          <Text style={styles.inputTitle}>Height</Text>
          <View style={styles.heightContainer}>
            <TextInput
              style={styles.feetInput}
              placeholder=""
              placeholderTextColor={"white"}
              onChangeText={formProps.handleChange("height_ft")}
              value={formProps.values.height_ft}
              keyboardType="numeric"
            />
            <Text style={styles.text}> feet </Text>
            <TextInput
              style={styles.inchInput}
              placeholder=""
              placeholderTextColor={"white"}
              onChangeText={formProps.handleChange("height_inch")}
              value={formProps.values.height_inch}
              keyboardType="numeric"
            />
            <Text style={styles.text}> inches </Text>
          </View>
          <Text style={styles.inputTitle}>Weight (lbs)</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            placeholderTextColor={"white"}
            place
            onChangeText={formProps.handleChange("weight")}
            value={formProps.values.weight}
            keyboardType="numeric"
          />
          <Text style={styles.inputTitle}>Gender</Text>
          <TextInput
            style={styles.input}
            placeholder="Male / Female"
            placeholderTextColor={"grey"}
            onChangeText={formProps.handleChange("gender")}
            value={formProps.values.gender}
          />
          <Text style={styles.inputTitle}>Activity Level</Text>
          <TextInput
            style={styles.input}
            placeholder="Low / Medium / High"
            placeholderTextColor={"grey"}
            onChangeText={formProps.handleChange("activitylevel")}
            value={formProps.values.activitylevel}
          />
          <Text style={styles.inputTitle}>Weight Goal</Text>
          <TextInput
            style={styles.input}
            placeholder="Lose / Gain / Maintain"
            placeholderTextColor={"grey"}
            onChangeText={formProps.handleChange("goal")}
            value={formProps.values.goal}
          />

          <TouchableOpacity
            style={styles.submitBttn}
            onPress={formProps.handleSubmit}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  editSignupFormContainer: {
    //flex: 1,
    alignItems: "center",
    //borderWidth: 2,
    //borderColor: "red",
    width: "100%",
    paddingTop: 15,
    alignSelf: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  submitBttn: {
    backgroundColor: "crimson",
    width: "80%",
    alignItems: "center",
    borderRadius: 25,
    padding: 10,
  },
  heightContainer: {
    //padding: 10,
    flexDirection: "row",
    //borderWidth: 2,
    //borderColor: "red",
    width: "85%",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  bttnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    //borderWidth: 2,
    //borderColor: "red",
    width: "95%",
  },
  inchInput: {
    borderWidth: 2,
    borderColor: "crimson",
    padding: 10,
    width: "35%",
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  feetInput: {
    borderWidth: 2,
    padding: 10,
    width: "35%",
    fontSize: 20,
    color: "white",
    borderColor: "crimson",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "85%",
    fontSize: 17,
    color: "white",
    marginBottom: 30,
    borderColor: "crimson",
    fontWeight: "bold",
  },
  inputTitle: {
    alignSelf: "flex-start",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 30,
    marginBottom: 10,
  },
});

export default SignupForm;

// function onSignUp() {
//     navigation.navigate("BottomTab", { screen: "Home" });
//   }
//   function onCancel() {
//     navigation.navigate("Login");
//   }
