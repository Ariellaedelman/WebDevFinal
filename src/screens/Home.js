import {
  View,
  Button,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Modal,
} from "react-native";
import BudgetBar from "../components/BudgetBar";
import { useSelector } from "react-redux";
import { Text } from "react-native-paper";
import { useState } from "react";
import Nutrie from "../modals/Nutrie";
import ProteinBar from "../components/ProteinBar";
import CarbsBar from "../components/CarbsBar";
import FatBar from "../components/FatBar";

function Home({ navigation, route }) {
  const user = useSelector((state) => state.user.value);
  console.log("home params", route.params);
  console.log("userinfo", user);
  const [nutrieVisible, setNutrieVisible] = useState(false);
  return (
    <SafeAreaView style={styles.homeContainer}>
      <Text
        style={{
          fontSize: 30,
          color: "white",
          fontWeight: "bold",
          marginTop: 30,
        }}
      >
        Welcome, {user.name}!
      </Text>

      <Text
        style={{
          fontSize: 25,
          color: "white",
          fontWeight: "bold",
          marginBottom: 20,
          marginTop: 30,
        }}
      >
        Your Macro Plan is: {user.macro_plan}
      </Text>

      <BudgetBar />
      <ProteinBar />
      <CarbsBar />
      <FatBar />
      <Pressable
        style={{
          backgroundColor: "crimson",
          padding: 10,
          borderRadius: 20,
          width: "50%",
          alignItems: "center",
          marginTop: 20,
        }}
        onPress={() => setNutrieVisible(true)}
      >
        <Text
          style={{ color: "white", fontWeight: "600" }}
          variant={"headlineSmall"}
        >
          Nutrie
        </Text>
      </Pressable>
      <Modal visible={nutrieVisible} animationType={"slide"}>
        <Nutrie close={() => setNutrieVisible(false)} />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#003f5c",
    justifyContent: "space-evenly"
  },
  homeText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  macroText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    //borderBottomWidth: 2,
    //borderBottomColor: "purple",
  },
  infoContainer: {
    backgroundColor: "crimson",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 20,
  },
  macroContainer: {
    flexDirection: "row",
  },
});
export default Home;

// function Home({ navigation, route }) {
//     const userInfo = useSelector((state) => state.user.value);
//     console.log("home params", route.params);
//     console.log("userinfo", userInfo);

//     return (
//       <SafeAreaView style={styles.homeContainer}>
//         <Text
//           style={{
//             fontSize: 30,
//             color: "white",
//             fontWeight: "bold",
//             marginTop: 30,
//             marginBottom: 20,
//           }}
//         >
//           Welcome, {route.params.userName}!
//         </Text>

//         <Text
//           style={{
//             fontSize: 25,
//             color: "white",
//             fontWeight: "bold",
//             marginBottom: 20,
//             marginTop: 30,
//           }}
//         >
//           Your Budget is:
//         </Text>
//         <View style={styles.infoContainer}>
//           <Text
//             style={{
//               fontSize: 20,
//               color: "white",
//               fontWeight: "bold",
//               marginBottom: 20,
//             }}
//           >
//             Calories: {Math.round(route.params.userCalories)}
//           </Text>
//           <View style={styles.macroContainer}>
//             <Text style={styles.homeText}>
//               Carbs: {Math.round(route.params.chosenPlan.carbs)}g
//             </Text>
//             <View
//               style={{
//                 borderLeftWidth: 2,
//                 borderLeftColor: "white",
//                 borderRightWidth: 2,
//                 borderRightColor: "white",
//                 marginLeft: 10,
//                 marginRight: 10,
//                 paddingLeft: 10,
//                 paddingRight: 10,
//               }}
//             >
//               <Text style={styles.macroText}>
//                 Fat: {Math.round(route.params.chosenPlan.fat)}g
//               </Text>
//             </View>
//             <Text style={styles.macroText}>
//               Protein: {Math.round(route.params.chosenPlan.protein)}g
//             </Text>
//           </View>
//         </View>
//         <BudgetBar />
//       </SafeAreaView>
//     );
//   }
