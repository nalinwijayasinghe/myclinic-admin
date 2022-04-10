import React, { useState, useRef, useEffect } from "react";
import "react-native-gesture-handler";
import { AuthContext } from "../../service/context";
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
  AsyncStorage,
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
import * as Animatable from "react-native-animatable";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { login, getCurrentUser } from "../../service/APIUtils";
import { Users } from "../../model/User";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function signIn({ navigation }) {
  console.log("SignIn -> component is loading ....");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openPassword, setopenPassword] = useState(false);
  const { signOut } = React.useContext(AuthContext);
  const [data, setData] = React.useState({
    username: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const { signIn } = React.useContext(AuthContext);

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const loginHandle1 = () => {
    console.log(".........................signOut .....................");
    signOut();
  };

  // function login(loginRequest) {
  //   return request({
  //     url: API_BASE_URL + "/auth/signin",
  //     method: "POST",
  //     body: JSON.stringify(loginRequest),
  //   });
  // }
  const removeToken = async () => {
    try {
      console.log(
        "request :==========HEADER ===============" +
          AsyncStorage.getItem("userToken") +
          " is NOT NULL " +
          (AsyncStorage.getItem("userToken") != null)
      );
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("accessToken");
      console.log("remoed #############################################");
    } catch (e) {
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@ error @@@@@@22 " + e);
      console.log(e);
    }
  };

  const setToken = async (token) => {
    try {
      await AsyncStorage.setItem("userToken", token);
      console.log("set token ..............................");
    } catch (e) {
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@ error @@@@@@22 " + e);
      console.log(e);
    }
  };

  const loginHandle = (userName, password) => {
    console.log("handler login ..................");
    // removeToken();
    let userCredential = {
      usernameOrEmail: userName,
      password: password,
    };
    login(userCredential)
      .then((data) => {
        console.log("ddddddddddddddddddddddddd " + JSON.stringify(data));
        console.log("token after successful login :" + data.accessToken);
        AsyncStorage.setItem("userToken", data.accessToken);
        //setToken(data.accessToken);
        // removeToken();
        getCurrentUser()
          .then((user) => {
            console.log(
              ">>>>>>>>>>>>>>>>>>>>>>>> user >>>>> " + JSON.stringify(user)
            );
            const foundUser = {
              id: 1,
              email: "ehandsales@email.com",
              username: user.username,
              password: "Welcome!23",
              userToken: data.json().userToken,
            };
            // if (data.length == 0) {
            //   Alert.alert("Invalid User!", "Username or password is incorrect.", [
            //     { text: "Okay" },
            //   ]);
            //   return;
            // }
            console.log("Success User :" + JSON.stringify(foundUser));
            signIn(user);
          })
          .catch((e) => {
            console.log("Error occur while getting user details " + error);
          });
      })
      .catch((error) => {
        console.log("eeeeeeeeeeeeeeeeeeeeeeeeeee signin error " + error);
      });
    // const foundUser = Users.filter((item) => {
    //   return userName == item.username && password == item.password;
    // });

    // if (data.username.length == 0 || data.password.length == 0) {
    //   Alert.alert(
    //     "Wrong Input!",
    //     "Username or password field cannot be empty.",
    //     [{ text: "Okay" }]
    //   );
    //   return;
    // }

    // if (foundUser.length == 0) {
    //   Alert.alert("Invalid User!", "Username or password is incorrect.", [
    //     { text: "Okay" },
    //   ]);
    //   return;
    // }
    // signIn(foundUser);
  };

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
        <View>
          <Input
            placeholder="Enter username"
            // value={username}
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
            // onChangeText={(valueUsename) => setUsername(valueUsename)}
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Username must be 4 characters long.
            </Text>
          </Animatable.View>
        )}

        <View>
          <Input
            placeholder="Password"
            // value={password}
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
            onChangeText={(value) => handlePasswordChange(value)}
            //   onChangeText={(valuePassword) => setPassword(valuePassword)}
            secureTextEntry={openPassword ? false : true}
          />
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </Animatable.View>
        )}

        <TouchableOpacity>
          <Text style={{ color: "#009387", marginTop: 15 }}>
            Forgot password?
          </Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              loginHandle(data.username, data.password);
            }}
          >
            {/* <LinearGradient
              colors={["#08d4c4", "#01ab9d"]}
              style={styles.signIn}
            > */}
            <Text>Sign In</Text>
            {/* </LinearGradient> */}
          </TouchableOpacity>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                loginHandle1();
              }}
            >
              {/* <LinearGradient
              colors={["#08d4c4", "#01ab9d"]}
              style={styles.signIn}
            > */}
              <Text>Sign out</Text>
              {/* </LinearGradient> */}
            </TouchableOpacity>
          </View>
        </View>

        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
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
  button: {
    alignItems: "flex-end",
    // marginTop: 50,
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
