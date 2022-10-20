import {
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import EditProfileForm from "../forms/EditProfileForm";

function EditProfile(props) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.editProfileContainer}>
        <KeyboardAwareScrollView style={styles.container}>
          <EditProfileForm onSubmit={props.close} />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  editProfileContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#003f5c",
    //borderWidth: 2,
    //borderColor: "red",
  },
  container: {
    //borderWidth: 2,
    //borderColor: "red",
  },
});

export default EditProfile;
