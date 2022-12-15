import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Agenda } from "react-native-calendars";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { useState, useEffect, useContext } from "react";

import client from "../../api/client";
//import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "../../context/auth";

function Calendar() {

  const [state, setState] = useContext(AuthContext);
  const [currCalendarItems, setCurrCalendarItems] = useState({
    "2022-12-01": [{ calories: state.user.final_days_array[1].final_calories, protein: 20, carbs: 40, rating: 7.8 }],
    "2022-12-02": [{ calories: 1700, protein: 20, carbs: 40 }]
  });


  const user_id = state.user._id;
  const length_of_array = state.user.final_days_array.length
  console.log(length_of_array)


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

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          alignSelf: "flex-start",
          paddingBottom: 10,
          paddingTop: 10,
        }}
      >
        <Ionicons.Button
          name="arrow-back"
          size={30}
          onPress={() => navigation.navigate("HomeProfile")}
          backgroundColor={"#003f5c"}
        />
      </View>
      <Agenda
        selected="2022-12-01"
        // Handler which gets executed on day press. Default = undefined
        onDayPress={day => {
          console.log('selected day', day);
          
          const date = day.dateString;
          console.log(date);

          showingFinals({user_id, date});

          setCurrCalendarItems({/* date, */ "2022-12-15": [{calories: state.user.final_days_array[length_of_array - 1].final_calories, 
                                                protein: state.user.final_days_array[length_of_array - 1].final_protein, 
                                                carbs: state.user.final_days_array[length_of_array - 1].final_carbs,
                                                fat: state.user.final_days_array[length_of_array - 1].final_fat,
                                                rating: state.user.final_days_array[length_of_array - 1].final_rating}] })

          console.log("what is this: ", currCalendarItems)
          
        }}
        
        items={currCalendarItems}
        

        

        
      markingType={'custom'}
      markedDates={{
        '2022-12-15': {
          customStyles: {
            container: {
              backgroundColor: 'green'
            },
            text: {
              color: 'black',
              //fontWeight: 'bold'
            }
          } 
        }}}
        
        
        renderItem={(item, isFirst) => (
          <>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}> Calories: {item.calories}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}> Protein: {item.protein}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}> Carbs: {item.carbs}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}> Fat: {item.fat}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}> Rating: {item.rating}</Text>
            </TouchableOpacity>
          </>
        )}
        //onDayPress={(day) => console.log(day)}
        //markedDates={{ "2022-12-03": { marked: true, textColor: "red" } }}
        style={{ marginBottom: 10 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "90%",
  },
  item: {
    backgroundColor: "#003f5c",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    alignItems: "center",
  },
  itemText: {
    color: "#fb5b5a",
    fontSize: 16,
  },
});

export default Calendar;
