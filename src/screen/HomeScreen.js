// import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { Button } from "../components/Button";
import Firebase from "../config/firebase";
import { AuthenticatedUserContext } from "../service/AuthenticatedUserProvider";

const auth = Firebase.auth();

export default function HomeScreen() {
  const { user } = useContext(AuthenticatedUserContext);
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Text>My Home page</Text>
        <TouchableOpacity
          style={styles.sendVerification}
          onPress={handleSignOut}
        >
          <Text style={styles.buttonText}>signOut</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.row}>
        <Text style={styles.title}>Welcome {user.email}!</Text>
        <Button name="logout" size={24} color="#fff" onPress={handleSignOut} />
      </View>
      <Text style={styles.text}>Your UID is: {user.uid} </Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e93b81",
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
  },
  text: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#fff",
  },
});
