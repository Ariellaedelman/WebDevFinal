import { View, Text, Button, SafeAreaView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/auth'

function Home({ navigation, route }) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [calories, setCalories] = useState("")
  const [state, setState] = useContext(AuthContext)
  // const [state2, setState2]
  
  useEffect(() => {
    if (state) {
      const { name, email, calories } = state.user
      setName(name)
      setEmail(email)
      setCalories(calories)
    }
  })

  /*
  // NEW LOGOUT FUNCTION (NOT WORKING??)
  const onLogOut = async () => {
    //setState({ token: "", user: null })
    await AsyncStorage.removeItem("auth-rn")
    await AsyncStorage.clear()
    console.log('it comes here to this point')
    navigation.navigate("Login");
  };
  */
  

  
  // OLD LOGOUT FUNCTION
  function onLogOut() {
    
    //AsyncStorage.removeItem("auth-rn")
    //setState({ token: "", user: null })
    //AsyncStorage.removeItem("auth-rn")
    //AsyncStorage.clear()
    console.log('it comes here to this point and the state is now...', state)
    navigation.navigate("Login");
  }
  
  

  return (
    <SafeAreaView style={styles.homeContainer}>
      <Text style={styles.homeText}>Welcome, {name} </Text>
      <Text style={styles.homeText}>
        Your Calorie Budget is: {calories}{" "}
      </Text>
      <Button title="LOGOUT" onPress={onLogOut} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#003f5c",
  },
  homeText: {
    fontSize: 20,
    color: "white",
  },
});
export default Home;
