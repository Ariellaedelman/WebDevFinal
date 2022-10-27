import * as React from 'react';
import { ProgressBar} from 'react-native-paper';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";

const MyComponent = () => (

  <View>
     <ProgressBar style={{ marginTop:200}} progress={.5} color="#00BCD4" />
      <Text>Current Calories: 670</Text>
  </View>
 


);


export default MyComponent;