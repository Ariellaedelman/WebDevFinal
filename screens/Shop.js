import { View, Text, Button, SafeAreaView, StyleSheet } from "react-native";

function Shop() {
  return (
    <SafeAreaView style={styles.shopContainer}>
      <Text style={styles.shopText}>Shop Page</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  shopContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#003f5c",
  },
  shopText: {
    fontSize: 20,
    color: "white",
  },
});
export default Shop;
