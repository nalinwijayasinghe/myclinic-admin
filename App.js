import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import DoctorList from "./src/views/doctorList";
import Bookings from "./src/views/bookings";
import DoctorDetails from "./src/views/doctorDetails";
import AdvanceSearch from "./src/views/advaceSearch";
import Profile from "./src/views/profile";
import SignIn from "./src/views/signIn";
import SignUp from "./src/views/signUp";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "./src/service/context";
import { AuthenticatedUserProvider } from "./src/service/AuthenticatedUserProvider";
import RootNavigator from "./src/service/RootNavigator";
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

export default function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}
