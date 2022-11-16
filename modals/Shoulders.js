import axios from "axios";
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import { useEffect, useState } from "react";

function Shoulders(props) {
  const options = {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises/bodyPart/cardio",
    headers: {
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };
  function getExercises() {
    axios
      .request(options)
      .then(function (response) {
        console.log(response);
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  const data = [
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
  ];
  const renderItem = ({ item }) => (
    <View style={styles.exerciseContainer}>
      <Text style={styles.pageText}>Name: {item.name}</Text>
      <Image source={{ uri: item.gif }} style={{ width: 200, height: 200 }} />
    </View>
  );
  return (
    <SafeAreaView style={styles.pageContainer}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={props.closeShoulders}
      >
        <Text style={styles.pageText}>CLOSE</Text>
      </TouchableOpacity>
      <FlatList
        style={styles.exerciseFlatList}
        data={data}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#003f5c",
  },
  pageText: {
    fontSize: 20,
    color: "white",
  },
  closeButton: {
    width: "60%",
    backgroundColor: "#fb5b5a",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  exerciseContainer: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  exerciseFlatList: {
    width: "90%",
  },
});
export default Shoulders;
