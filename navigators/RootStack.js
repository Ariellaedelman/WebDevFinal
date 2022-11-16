import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Login from "../screens/Login";
import BottomTab from "./BottomTab";
import Signup from "../screens/Signup";
import Macros from "../screens/Macros";
import { AuthProvider } from "../context/auth";

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Macros" component={Macros} />
          <Stack.Screen name="BottomTab" component={BottomTab} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}

export default RootStack;
