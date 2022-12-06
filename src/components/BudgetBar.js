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
    
     <Text style={styles.CalText}>
      Calories Consumed: 1,000
      </Text>
    
     <ProgressBar style={{ marginTop:5}} progress={.5} color="crimson" width={400}/>
     
    
  </View>

);
const styles = StyleSheet.create({
  CalText:{
    marginTop: 20,
    padding: 10,
    color: "white",
    fontWeight: "bold"
  }
});

export default MyComponent;