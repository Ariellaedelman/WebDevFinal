import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useContext } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { TextInput, Checkbox, Divider, Text } from "react-native-paper";

const SignupSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
  age: yup.number().required().integer().min(1),
  height_ft: yup.number().required(),
  height_inch: yup.number().required(),
  weight: yup.number().required(),
});

function SignupForm(props) {
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);

  const [low, setLow] = useState(false);
  const [medium, setMedium] = useState(false);
  const [high, setHigh] = useState(false);

  const [lose, setLose] = useState(false);
  const [gain, setGain] = useState(false);
  const [maintain, setMaintain] = useState(false);
  function checkMale() {
    if (female) {
      setFemale(false);
    }

    setMale(true);
  }
  function checkFemale() {
    if (male) {
      setMale(false);
    }

    setFemale(true);
  }
  function checkLow() {
    if (medium || high) {
      setMedium(false);
      setHigh(false);
    }

    setLow(true);
  }
  function checkMedium() {
    if (low || high) {
      setLow(false);
      setHigh(false);
    }

    setMedium(true);
  }
  function checkHigh() {
    if (medium || high) {
      setMedium(false);
      setHigh(false);
    }

    setHigh(true);
  }
  function checkLose() {
    if (gain || maintain) {
      setGain(false);
      setMaintain(false);
    }

    setLose(true);
  }
  function checkGain() {
    if (lose || maintain) {
      setLose(false);
      setMaintain(false);
    }

    setGain(true);
  }
  function checkMaintain() {
    if (lose || gain) {
      setLose(false);
      setGain(false);
    }

    setMaintain(true);
  }
  function setActivityLevel() {
    if (low) return "low";
    if (high) return "high";
    if (medium) return "medium";
    return "";
  }
  function setGoal() {
    if (lose) return "lose";
    if (gain) return "gain";
    if (maintain) return "maintain";
    return "";
  }
  function setGender() {
    if (male) return "male";
    if (female) return "female";
    return "";
  }
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
  } = userInfo;

  const signUp = async (values, actions) => {
    values.activitylevel = setActivityLevel();
    values.goal = setGoal();
    values.gender = setGender();

    if (
      values.gender === "" ||
      values.activitylevel === "" ||
      values.goal === ""
    ) {
      console.log("error on sign up, some boxes are not checked");
      return;
    }

    values.age = parseInt(values.age, 10);
    values.height_ft = parseInt(values.height_ft, 10);
    values.height_inch = parseInt(values.height_inch, 10);
    values.weight = parseInt(values.weight, 10);

    console.log("values passed to signup", values);

    props.onSignup(values);

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={userInfo}
      validationSchema={SignupSchema}
      onSubmit={signUp}
    >
      {(formProps) => (
        <View style={styles.container}>
          <Text variant="headlineSmall" style={{ color: "white" }}>
            Authentication: (Required)
          </Text>
          <TextInput
            style={{ marginBottom: 10, marginTop: 10 }}
            label="email"
            onChangeText={formProps.handleChange("email")}
            value={formProps.values.email}
            onBlur={formProps.handleBlur("email")}
          />
          <Text variant="titlesmall" style={{ color: "red", marginBottom: 10 }}>
            {formProps.touched.email && formProps.errors.email}
          </Text>
          <TextInput
            style={{ marginBottom: 10 }}
            label="password"
            onChangeText={formProps.handleChange("password")}
            value={formProps.values.password}
            onBlur={formProps.handleBlur("password")}
          />
          <Text variant="titlesmall" style={{ color: "red", marginBottom: 10 }}>
            {formProps.touched.password && formProps.errors.password}
          </Text>
          <Divider style={{ marginBottom: 10 }} />
          <Text variant="headlineSmall" style={{ color: "white" }}>
            Basic Info: (Required)
          </Text>
          <TextInput
            style={{ marginBottom: 10, marginTop: 10 }}
            label="name"
            onChangeText={formProps.handleChange("name")}
            value={formProps.values.name}
            onBlur={formProps.handleBlur("name")}
          />
          <Text variant="titlesmall" style={{ color: "red", marginBottom: 10 }}>
            {formProps.touched.name && formProps.errors.name}
          </Text>
          <TextInput
            style={{ marginBottom: 10 }}
            label="age"
            onChangeText={formProps.handleChange("age")}
            value={formProps.values.age}
            onBlur={formProps.handleBlur("age")}
            keyboardType={"numeric"}
          />
          <Text variant="titlesmall" style={{ color: "red", marginBottom: 10 }}>
            {formProps.touched.age && formProps.errors.age}
          </Text>
          <TextInput
            style={{ marginBottom: 10 }}
            label="weight in lbs"
            onChangeText={formProps.handleChange("weight")}
            value={formProps.values.weight}
            keyboardType={"numeric"}
            onBlur={formProps.handleBlur("weight")}
          />
          <Text variant="titlesmall" style={{ color: "red" }}>
            {formProps.touched.weight && formProps.errors.weight}
          </Text>
          <Text
            variant="headlineSmall"
            style={{ color: "white", marginBottom: 10 }}
          >
            Height:
          </Text>
          <TextInput
            style={{}}
            label="feet"
            onChangeText={formProps.handleChange("height_ft")}
            value={formProps.values.height_ft}
            keyboardType={"numeric"}
            onBlur={formProps.handleBlur("height_ft")}
          />
          <Text variant="titlesmall" style={{ color: "red" }}>
            {formProps.touched.height_ft && formProps.errors.height_ft}
          </Text>
          <View style={{ alignItems: "center" }}>
            <Text
              variant="headlineSmall"
              style={{
                color: "white",
                marginBottom: 10,
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              +
            </Text>
          </View>
          <TextInput
            style={{ marginBottom: 10 }}
            label="inches"
            onChangeText={formProps.handleChange("height_inch")}
            value={formProps.values.height_inch}
            keyboardType={"numeric"}
            onBlur={formProps.handleBlur("heigth_inch")}
          />
          <Text variant="titlesmall" style={{ color: "red", marginBottom: 10 }}>
            {formProps.touched.height_inch && formProps.errors.height_inch}
          </Text>
          <Divider style={{ marginBottom: 10 }} />

          <Text variant="headlineSmall" style={{ color: "white" }}>
            Gender: (Required)
          </Text>

          <Checkbox.Item
            label="Male"
            status={male ? "checked" : "unchecked"}
            mode="android"
            onPress={checkMale}
            style={{ backgroundColor: "grey" }}
          />
          <Checkbox.Item
            label="Female"
            status={female ? "checked" : "unchecked"}
            mode="android"
            onPress={checkFemale}
            style={{ backgroundColor: "grey" }}
          />
          <Divider style={{ marginBottom: 10, marginTop: 10 }} />

          <Text variant="headlineSmall" style={{ color: "white" }}>
            Activity Level: (Required)
          </Text>

          <Checkbox.Item
            label="Low"
            status={low ? "checked" : "unchecked"}
            mode="android"
            onPress={checkLow}
            style={{ backgroundColor: "grey" }}
          />
          <Checkbox.Item
            label="Medium"
            status={medium ? "checked" : "unchecked"}
            mode="android"
            onPress={checkMedium}
            style={{ backgroundColor: "grey" }}
          />
          <Checkbox.Item
            label="High"
            status={high ? "checked" : "unchecked"}
            mode="android"
            onPress={checkHigh}
            style={{ backgroundColor: "grey" }}
          />
          <Divider style={{ marginBottom: 10, marginTop: 10 }} />

          <Text variant="headlineSmall" style={{ color: "white" }}>
            Weight Goal: (Required)
          </Text>

          <Checkbox.Item
            label="Lose"
            status={lose ? "checked" : "unchecked"}
            mode="android"
            onPress={checkLose}
            style={{ backgroundColor: "grey" }}
          />
          <Checkbox.Item
            label="Gain"
            status={gain ? "checked" : "unchecked"}
            mode="android"
            onPress={checkGain}
            style={{ backgroundColor: "grey" }}
          />
          <Checkbox.Item
            label="Maintain"
            status={maintain ? "checked" : "unchecked"}
            mode="android"
            onPress={checkMaintain}
            style={{ backgroundColor: "grey", marginBottom: 10 }}
          />
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={styles.submitBttn}
              onPress={formProps.handleSubmit}
            >
              <Text
                variant="titleMedium"
                style={{ color: "white", fontWeight: "500" }}
              >
                Next
              </Text>
            </TouchableOpacity>
          </View>
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
