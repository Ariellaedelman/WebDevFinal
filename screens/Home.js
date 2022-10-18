import { View, Text, Button, SafeAreaView, StyleSheet } from "react-native";

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
      <Button title="LOGOUT" onPress={onLogOut} />
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
});
export default Home;
