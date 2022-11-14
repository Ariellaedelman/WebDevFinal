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

  <View style={styles.container}>
     <ProgressBar style={{ marginTop:100}} progress={.5} color="#fb5b5a" width={400} />
     
     <Text style={styles.CalText}>
      Calories Consumed: 1,000
      </Text>
  </View>

);
const styles = StyleSheet.create({
  CalText:{
    padding: 10,
    color: "#fb5b5a",
  }
});

export default MyComponent;