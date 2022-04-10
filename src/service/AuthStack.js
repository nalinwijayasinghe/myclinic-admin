import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screen/LoginScreen";
import PhoneScreen from "../screen/PhoneScreen";
import SignupScreen from "../screen/SignupScreen";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator headerMode="none">
      {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
      <Stack.Screen name="Phone" component={PhoneScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}
