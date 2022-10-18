import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Agenda } from 'react-native-calendars';

function Calendar() {
  return (
    <SafeAreaView style={styles.container}>
      <Agenda
        selected="2022-12-01"
        items={{
          '2022-12-01': [{name: 'Calories:1,700'}, {name: 'Protein: 20g'}, {name: 'Carbs: 40g'}],
        
        }}
        renderItem={(item, isFirst) => (
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: "90%"
  },
  item: {
    backgroundColor: '#003f5c',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  itemText: {
    color: '#fb5b5a',
    fontSize: 16,
  }
});

export default Calendar; 