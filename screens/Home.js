import { View, Text, Button } from "react-native";

function Home({ navigation }) {
  return (
    <View>
      <Text>Welcome to the home page</Text>
      <Button title="LOGOUT" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}

export default Home;
