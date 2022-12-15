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

import { AuthContext } from "../../context/auth";

import { useSelector } from "react-redux";
import { Text } from "react-native-paper";
import calories from "../redux/calories";

const ProteinBar = () => {
  const [status, setStatus] = useState();
  const [progressColor, setProgessColor] = useState("crimson");
  // const [state, setState] = useContext(AuthContext);

  const user = useSelector((state) => state.user.value);
  const currProtein = useSelector((state) => state.protein.value);

  useEffect(() => {
    setStatus(currProtein / user.protein);
  });

  useEffect(() => {
    if (status >= 1) setProgessColor("green");
    else setProgessColor("crimson");
  });

  return (
    <View style={styles.container}>
      <Text style={styles.CalText} variant={"headlineSmall"}>
        Protein Consumed: {currProtein} / {user.protein}
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

export default ProteinBar;
