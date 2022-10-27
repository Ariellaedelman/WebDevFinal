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

function Legs(props) {
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
      id: "0768",
      name: "smith single leg split squat",
      gif: "http://d205bpvrqc9yn1.cloudfront.net/0768.gif",
    },
    {
      id: "0752",
      name: "smith deadlift",
      gif: "http://d205bpvrqc9yn1.cloudfront.net/0752.gif",
    },
    {
      id: "3645",
      name: "single leg bridge with outstretched leg",
      gif: "http://d205bpvrqc9yn1.cloudfront.net/3645.gif",
    },
    {
      id: "0108",
      name: "barbell standing leg calf raise",
      gif: "http://d205bpvrqc9yn1.cloudfront.net/0108.gif",
    },
    {
      id: "0111",
      name: "barbell standing rocking leg calf raise",
      gif: "http://d205bpvrqc9yn1.cloudfront.net/0111.gif",
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
      <TouchableOpacity style={styles.closeButton} onPress={props.closeLegs}>
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
export default Legs;
