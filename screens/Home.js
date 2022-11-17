import { View, Text, Button, SafeAreaView, StyleSheet } from "react-native";
import BudgetBar from "../components/BudgetBar";

function Home({ navigation, route }) {
  console.log("home params", route.params);
  return (
    <SafeAreaView style={styles.homeContainer}>
      <Text
        style={{
          fontSize: 20,
          color: "white",
          fontWeight: "bold",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        Welcome {route.params.name},
      </Text>
      <Text
        style={{
          fontSize: 20,
          color: "white",
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Your Budget is:
      </Text>
      <View style={styles.infoContainer}>
        <Text
          style={{
            fontSize: 20,
            color: "white",
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Calories: {Math.round(route.params.calories)}
        </Text>
        <View style={styles.macroContainer}>
          <Text style={styles.homeText}>
            Carbs: {Math.round(route.params.chosenPlan.carbs)}g
          </Text>
          <View
            style={{
              borderLeftWidth: 2,
              borderLeftColor: "white",
              borderRightWidth: 2,
              borderRightColor: "white",
              marginLeft: 10,
              marginRight: 10,
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            <Text style={styles.macroText}>
              Fat: {Math.round(route.params.chosenPlan.fat)}g
            </Text>
          </View>
          <Text style={styles.macroText}>
            Protein: {Math.round(route.params.chosenPlan.protein)}g
          </Text>
        </View>
      </View>
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
    fontWeight: "bold",
  },
  macroText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    //borderBottomWidth: 2,
    //borderBottomColor: "purple",
  },
  infoContainer: {
    backgroundColor: "crimson",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 20,
  },
  macroContainer: {
    flexDirection: "row",
  },
  ratingText: {
    //backgroundColor: 'orange',
    fontSize: 18,
    padding: 15,
    color: "#fb5b5a",
    marginTop: 20,

    //textAlign:'right',
    //flex:1
  },
  pointsText: {
    backgroundColor: "#fb5b5a",
    fontSize: 25,
    padding: 10,
    color: "#003f5c",
    marginBottom: 20,
    //flex:1
  },
});
export default Home;
