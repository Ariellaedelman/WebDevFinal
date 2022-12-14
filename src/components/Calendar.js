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

function Calendar() {
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
        items={{
          "2022-12-01": [{ calories: 1700, protein: 20, carbs: 40 }],
          "2022-12-02": [{ calories: 1700, protein: 20, carbs: 40 }],
        }}
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
          </>
        )}
        onDayPress={(day) => console.log(day)}
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
