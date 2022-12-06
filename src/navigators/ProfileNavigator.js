import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeProfile from "../screens/HomeProfile";
import EditProfile from "../screens/EditProfile";
import EditMacros from "../screens/EditMacros";

const Stack = createNativeStackNavigator();

function Profile() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeProfile" component={HomeProfile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="EditMacros" component={EditMacros} />
    </Stack.Navigator>
  );
}

export default Profile;
