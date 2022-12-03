import React from "react"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Login from "../screens/Login";
import BottomTab from "./BottomTab";
import Signup from "../screens/Signup";
import { AuthContext, AuthProvider } from "../context/auth";
import RootStackScreen from "./RootStackScreen";

// const Stack = createNativeStackNavigator();

function RootStack() {

  //const [state, setState] = useContext(AuthContext)
  //const authenticated = state & state.token !== "" && state.user !== null

  /* ADD THIS BACK TO THE RETURN IF OTHER METHOD DOESNT WORK (UNDER/WHERE ROOTSTACKSCREEN IS)
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
    <Stack.Screen name="BottomTab" component={BottomTab} />
  </Stack.Navigator>
  */

  return (
    <NavigationContainer>
      <AuthProvider>
        <RootStackScreen />  
      </AuthProvider>
    </NavigationContainer>
  );
}

export default RootStack;
