import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import DoctorList from "../views/doctorList";
import Bookings from "../views/bookings";
import DoctorDetails from "../views/doctorDetails";
import AdvanceSearch from "../views/advaceSearch";
import Profile from "../views/profile";
import SignIn from "../views/signIn";
import SignUp from "../views/signUp";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = createStackNavigator();
const BookingStack = createStackNavigator();
const SettingsStack = createStackNavigator();

function getHeaderTitle(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || "Doctors";

  switch (routeName) {
    case "Doctors":
      return "Doctors";
    case "Bookings":
      return "Bookings";
    case "Profile":
      return "Profile";
  }
}

function HomeStackScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#fff",
        inactiveTintColor: "#d0d1d2",
        activeBackgroundColor: "#1896c5",
        inactiveBackgroundColor: "#1896c5",
        labelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="Doctors"
        component={DoctorList}
        options={{
          tabBarLabel: "Doctors",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="doctor" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={Bookings}
        options={{
          tabBarLabel: "Bookings",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="format-list-bulleted"
              color={color}
              size={22}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={22} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function MainStack() {
  console.log("Main screen ....................");
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [isAuthenticationReady, setisAuthenticationReady] = useState(false);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [isConfigdataSet, setIsConfigdataSet] = useState(false);

  useEffect(() => {
    console.log("MainStack -> useEffect: calling getResources() ");
    // getResources();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#1896c5",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "normal",
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen
        name="Doctors"
        component={HomeStackScreen}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
        })}
      />
      <Stack.Screen
        name="doctorDetails"
        component={DoctorDetails}
        options={{ title: "Details" }}
      />
      <Stack.Screen
        name="signIn"
        component={SignIn}
        options={{ title: "Sign In", headerShown: false }}
      />
      <Stack.Screen
        name="signUp"
        component={SignUp}
        options={{ title: "Sign Up", headerShown: false }}
      />
      <Stack.Screen
        name="advanceSearch"
        component={AdvanceSearch}
        options={{ title: "Advance Search" }}
      />
      <Stack.Screen
        name="Bookings"
        component={Bookings}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
        })}
      />
    </Stack.Navigator>
  );
}
// import React, { useState, useEffect } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import "react-native-gesture-handler";
// import {
//   StyleSheet,
//   Text,
//   View,
//   ActivityIndicator,
//   AsyncStorage,
// } from "react-native";
// import DoctorList from "../views/doctorList";
// import Bookings from "../views/bookings";
// import DoctorDetails from "../views/doctorDetails";
// import AdvanceSearch from "../views/advaceSearch";
// import Profile from "../views/profile";
// import SignIn from "../views/signIn";
// import SignUp from "../views/signUp";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// import HomeScreen from "../screen/HomeScreen";

// // const Stack = createStackNavigator();

// function getHeaderTitle(route) {
//   const routeName = route.state
//     ? route.state.routes[route.state.index].name
//     : route.params?.screen || "Doctors";

//   switch (routeName) {
//     case "Doctors":
//       return "Doctors";
//     case "Bookings":
//       return "Bookings";
//     case "Profile":
//       return "Profile";
//   }
// }

// export default function HomeStack() {
//   return (
//     // <Stack.Navigator headerMode="none">
//     //   <Stack.Screen name="Home" component={HomeScreen} />
//     // </Stack.Navigator>
//     <Tab.Navigator
//       tabBarOptions={{
//         activeTintColor: "#fff",
//         inactiveTintColor: "#d0d1d2",
//         activeBackgroundColor: "#1896c5",
//         inactiveBackgroundColor: "#1896c5",
//         labelStyle: {
//           fontSize: 12,
//         },
//       }}
//     >
//       <Tab.Screen
//         name="Doctors"
//         component={DoctorList}
//         options={{
//           tabBarLabel: "Doctors",
//           tabBarIcon: ({ color }) => (
//             <MaterialCommunityIcons name="doctor" color={color} size={22} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Bookings"
//         component={Bookings}
//         options={{
//           tabBarLabel: "Bookings",
//           tabBarIcon: ({ color }) => (
//             <MaterialCommunityIcons
//               name="format-list-bulleted"
//               color={color}
//               size={22}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           tabBarLabel: "Profile",
//           tabBarIcon: ({ color }) => (
//             <MaterialCommunityIcons name="account" color={color} size={22} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }
