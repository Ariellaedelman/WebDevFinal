import * as React from 'react';
import { ProgressBar, Colors } from 'react-native-paper';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";

import { useState, useEffect, useContext } from 'react';

import client from "../../api/client";
//import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "../../context/auth";

import { useSelector } from "react-redux";
import calories from '../redux/calories';


const MyComponent = () => {
  const [status, setStatus] = useState();
  const [progressColor, setProgessColor] = useState("crimson");
  // const [state, setState] = useContext(AuthContext);

  const user = useSelector((state) => state.user.value);
  const currCalories = useSelector((state) => state.calories.value);

  useEffect(() => {
    setStatus(currCalories / user.calories)
  })

  useEffect(() => {
    if(status >= 1)
      setProgessColor("green")
  })

  return(

    <View style={styles.container}>
      
       <Text style={styles.CalText}>
        Calories Consumed: {currCalories}
        </Text>
      
       <ProgressBar style={{ marginTop:5}} progress={status} color={progressColor} width={400}/>
       
      
    </View>
  
  );
}

const styles = StyleSheet.create({
  CalText:{
    marginTop: 20,
    padding: 10,
    color: "white",
    fontWeight: "bold"
  }
});

export default MyComponent;