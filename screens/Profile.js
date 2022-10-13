import { View, Text, Button, StyleSheet } from "react-native";
import UploadImage from "../components/UploadImage";

function Profile() {
  return (
    <View style={styles.profileContainer}>
      <UploadImage />
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default Profile;
