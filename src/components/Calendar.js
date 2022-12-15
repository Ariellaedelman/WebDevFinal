import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Agenda } from 'react-native-calendars';

import { useEffect, useContext } from "react";

import client from "../../api/client";
//import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "../../context/auth";

function Calendar() {

  const [state, setState] = useContext(AuthContext);

  const user_id = state.user._id;

  const showingFinals = async (values, actions) => {
    
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        "Access-Control-Allow-Origin": "*",
      },
    };

    try {
      const res = await client.post("/api/get-full-day", values , config);
      console.log("information: ", res.data);

      if (res.data.error) {
        alert(res.data.error);
      } else {
        //setState(res.data);
        //await AsyncStorage.setItem("auth-rn", JSON.stringify(res.data))
        //dispatch(setGlobalFoods(res.data))
        //console.log(state.user)
        alert("Grabbed Stats for Day Successful");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Agenda
        selected="2022-12-01"
        // Handler which gets executed on day press. Default = undefined
        onDayPress={day => {
          console.log('selected day', day);
          
          const date = day.dateString;
          console.log(date);

          showingFinals({user_id, date});
        }}
        items={{
          '2022-12-01': [{name: 'Calories:1,700'}, {name: 'Protein: 20g'}, {name: 'Carbs: 40g'}],
        
        }}
        

        
        
        renderItem={(item, isFirst) => (
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: "90%"
  },
  item: {
    backgroundColor: '#003f5c',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  itemText: {
    color: '#fb5b5a',
    fontSize: 16,
  }
});

export default Calendar; 