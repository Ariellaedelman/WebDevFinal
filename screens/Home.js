import { View, Text, Button, SafeAreaView, StyleSheet } from "react-native";
import BudgetBar from "../components/BudgetBar";

function Home({ navigation, route }) {
  function onLogOut() {
    navigation.navigate("Login");
  }
  return (
    <SafeAreaView style={styles.homeContainer}>
      <Text style={styles.homeText}>Welcome {route.params.name} </Text>
      <Text style={styles.homeText}>
        Your Calorie Budget is: {route.params.calories}{" "}
      </Text>
      <BudgetBar/>
      <Text style={styles.ratingText}>
      Most Recent Rating:#/10
      </Text>

      <Text style={styles.pointsText}>
      Points:##
      </Text>

      <Text style={styles.foodText}>
      Foods With Nutrition
      </Text>


      <Button title="LOGOUT" onPress={onLogOut}  />
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
  },
  ratingText:{
    //backgroundColor: 'orange',
    fontSize: 18, 
    padding:15,
    color: '#fb5b5a',
    marginTop: 20,
   
    //textAlign:'right', 
    //flex:1
  },
  pointsText:{
    backgroundColor: '#fb5b5a',
    fontSize: 25, 
    padding:10,
    color: '#003f5c',
    marginBottom: 20,
    //flex:1

  },
 
});
export default Home;
