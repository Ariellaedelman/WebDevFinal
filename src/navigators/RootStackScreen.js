// import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Login from "../screens/Login";
import BottomTab from "./BottomTab";
import Signup from "../screens/Signup";
import { AuthContext } from "../context/auth";

const Stack = createNativeStackNavigator();

function RootStackScreen() {

  const [state, setState] = useContext(AuthContext)
  const authenticated = state & state.token !== "" && state.user !== null

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        {authenticated ? 
        <Stack.Screen name="Home" component={Home} /> : (
            <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="BottomTab" component={BottomTab} />
            </>
        )}
    </Stack.Navigator>
  );
}

export default RootStackScreen;