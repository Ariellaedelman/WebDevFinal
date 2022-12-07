import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Profile from "./ProfileNavigator";
import Home from "../screens/Home";
import Shop from "../screens/Shop";
import Diary from "../screens/Diary";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";
import { SafeAreaView } from "react-native";
//import { View } from "react-native-web";

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <>
      <Header />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person-circle" : "person-circle-outline";
            } else if (route.name === "Diary") {
              iconName = focused ? "book" : "book-outline";
            } else if (route.name === "Shop") {
              iconName = focused ? "basket" : "basket-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "white",
          tabBarStyle: {
            backgroundColor: "#003f5c",
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Diary" component={Diary} />
        <Tab.Screen name="Shop" component={Shop} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </>
  );
}

export default BottomTab;
