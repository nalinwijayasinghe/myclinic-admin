import React, { useRef, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Firebase from "../config/firebase";
import * as firebase from "firebase";
import { hide } from "expo-splash-screen";
// import styles from "./styles";

// export default function LoginScreen({ navigation }) {
export default function PhoneScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);
  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined;

  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider.get;
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then(setVerificationId);
  };

  const confirmCode = () => {
    const credential = new firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    Firebase.auth()
      .signInWithCredential(credential)
      .then((result) => {
        console.log("phone number verified :" + result);
      });
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />
        {!verificationId ? (
          <View>
            <TextInput
              placeholder="Phone Number"
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              autoCompleteType="tel"
              style={styles.textInput}
            />
            <TouchableOpacity
              style={styles.sendVerification}
              onPress={sendVerification}
            >
              <Text style={styles.buttonText}>Verify phone number</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {verificationId ? (
          <View>
            <TextInput
              placeholder="Confirmation Code"
              onChangeText={setCode}
              keyboardType="number-pad"
              style={styles.textInput}
            />
            <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={confirmCode}>
              <Text style={styles.underLineText}>Resend OTP</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    fontSize: 24,
    borderBottomColor: "#7f8c8d33",
    borderBottomWidth: 2,
    marginBottom: 10,
    textAlign: "center",
  },
  sendVerification: {
    padding: 20,
    backgroundColor: "#3498db",
    borderRadius: 10,
  },
  sendCode: {
    padding: 20,
    backgroundColor: "#9b59b6",
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#ffffff",
  },
  underLineText: {
    fontSize: 12,
    textDecorationLine: "underline",
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});
