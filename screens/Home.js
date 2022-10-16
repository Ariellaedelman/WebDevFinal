import { View, Text, Button } from "react-native";

function Home({ navigation, route }) {
  function onLogOut() {
    navigation.navigate("Login");
  }
  return (
    <View style={{ padding: 50 }}>
      <Text>Welcome {route.params.name} </Text>
      <Text>Your Calorie Budget is: {route.params.calories} </Text>
      <Button title="LOGOUT" onPress={onLogOut} />
    </View>
  );
}

export default Home;
