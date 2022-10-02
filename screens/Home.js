import { View, Text, Button } from "react-native";

function Home({ navigation }) {
  function onLogOut() {
    navigation.navigate("Login");
  }
  return (
    <View style={{ padding: 50 }}>
      <Text>Welcome to the home page</Text>
      <Button title="LOGOUT" onPress={onLogOut} />
    </View>
  );
}

export default Home;
