import React, { useState, useRef, useEffect } from "react";
import "react-native-gesture-handler";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Alert,
  Image,
  Animated,
  TouchableOpacity,
} from "react-native";
import {
  ListItem,
  Avatar,
  Icon,
  Text,
  Switch,
  Overlay,
  Divider,
  Button,
  Input,
  Title,
} from "react-native-elements";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function signIn({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openPassword, setopenPassword] = useState(false);

  const togglePasswordIcon = () => {
    setopenPassword(!openPassword);
  };

  return (
    <SafeAreaView style={styles.pageContainer}>
      <Image
        style={styles.backgroungImage}
        source={require("../../../assets/Login_BG.jpg")}
      />
      <Text style={styles.formHeading}>Sign In</Text>
      <View style={styles.formView}>
        <Input
          placeholder="Username"
          value={username}
          leftIcon={
            <Icon
              name="user"
              size={24}
              color="#1896c5"
              type="font-awesome"
              style={{ marginRight: 10 }}
            />
          }
          style={styles}
          inputContainerStyle={{
            borderBottomWidth: 1,
            borderBottomColor: "#ade4f9",
          }}
          inputStyle={{ color: "#5c7f8c", fontSize: 14 }}
          onChangeText={(valueUsename) => setUsername(valueUsename)}
        />
        <Input
          placeholder="Password"
          value={password}
          leftIcon={
            <Icon
              name="lock"
              size={24}
              color="#1896c5"
              type="font-awesome"
              style={{ marginRight: 10 }}
            />
          }
          rightIcon={
            <TouchableOpacity onPress={togglePasswordIcon}>
              <Icon
                name={openPassword ? "eye" : "eye-slash"}
                size={24}
                color="#a8a9aa"
                type="font-awesome"
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
          }
          style={styles}
          inputContainerStyle={{
            borderBottomWidth: 1,
            borderBottomColor: "#ade4f9",
          }}
          inputStyle={{ color: "#5c7f8c", fontSize: 14 }}
          onChangeText={(valuePassword) => setPassword(valuePassword)}
          secureTextEntry={openPassword ? false : true}
        />
        <TouchableOpacity
          //onPress={()=>{navigation.navigate('signUp')}}
          style={styles.iconBtn}
        >
          <Icon
            name="login"
            color="#fff"
            type="material-community"
            onPress={() => {
              navigation.navigate("Doctors");
            }}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("signUp");
        }}
        style={styles.newAccount}
      >
        <Text style={styles.newAccountText}>Create new account</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  formHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 25,
    color: "#1896c5",
  },
  formView: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 20,
    width: windowWidth - 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "relative",
  },
  backgroungImage: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.3,
  },
  iconBtn: {
    //position:'absolute',
    bottom: -40,
    backgroundColor: "#1896c5",
    borderRadius: 40,
    width: 60,
    height: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -20,
  },
  newAccount: {
    marginTop: 35,
  },
  newAccountText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#1896c5",
  },
});
