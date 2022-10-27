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

function Cardio(props) {
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
      id: "3220",
      name: "astride jumps",
      gif: "http://d205bpvrqc9yn1.cloudfront.net/3220.gif",
    },
    {
      id: "3672",
      name: "back and forth step",
      gif: "http://d205bpvrqc9yn1.cloudfront.net/3672.gif",
    },
    {
      id: "3360",
      name: "bear crawl",
      gif: "http://d205bpvrqc9yn1.cloudfront.net/3360.gif",
    },
    {
      id: "1160",
      name: "burpee",
      gif: "http://d205bpvrqc9yn1.cloudfront.net/1160.gif",
    },
    {
      id: "2331",
      name: "cycle cross trainer",
      gif: "http://d205bpvrqc9yn1.cloudfront.net/2331.gif",
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
      <TouchableOpacity style={styles.closeButton} onPress={props.closeCardio}>
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
export default Cardio;
