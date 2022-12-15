import * as React from "react";
import { ProgressBar, Colors } from "react-native-paper";
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";

import { useState, useEffect, useContext } from "react";

import client from "../../api/client";
//import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native-paper";
import { AuthContext } from "../../context/auth";

import { useSelector } from "react-redux";
import calories from "../redux/calories";

const FatBar = () => {
  const [status, setStatus] = useState();
  const [progressColor, setProgessColor] = useState("crimson");
  // const [state, setState] = useContext(AuthContext);

  const user = useSelector((state) => state.user.value);
  const currFat = useSelector((state) => state.fat.value);

  useEffect(() => {
    setStatus(currFat / user.fat);
  });

  useEffect(() => {
    if (status >= 1) setProgessColor("green");
    else setProgessColor("crimson");
  });

  return (
    <View style={styles.container}>
      <Text style={styles.CalText} variant={"headlineSmall"}>
        Fat Consumed: {currFat} / {user.fat}
      </Text>

      <ProgressBar
        style={{ marginTop: 5 }}
        progress={status}
        color={progressColor}
        width={400}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  CalText: {
    marginTop: 20,
    padding: 10,
    color: "white",
    fontWeight: "bold",
  },
});

export default FatBar;
