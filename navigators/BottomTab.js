import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Profile from "../screens/Profile";
import Home from "../screens/Home";
import Shop from "../screens/Shop";

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Shop" component={Shop} />
    </Tab.Navigator>
  );
}

export default BottomTab;
