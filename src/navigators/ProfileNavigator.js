import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeProfile from "../screens/HomeProfile";
import EditProfile from "../screens/EditProfile";
import EditMacros from "../screens/EditMacros";
import History from "../modals/History";

const Stack = createNativeStackNavigator();

function Profile() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeProfile" component={HomeProfile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="EditMacros" component={EditMacros} />
      <Stack.Screen name="History" component={History} />
    </Stack.Navigator>
  );
}

export default Profile;
