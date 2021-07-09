import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import DoctorList from "./src/views/doctorList";
import Bookings from "./src/views/bookings";
import DoctorDetails from "./src/views/doctorDetails";
import AdvanceSearch from './src/views/advaceSearch';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = createStackNavigator();
const BookingStack = createStackNavigator();
const SettingsStack = createStackNavigator();


function getHeaderTitle(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'Doctors'

  switch (routeName) {
    case 'Doctors':
      return 'Doctors'
    case 'Bookings':
      return 'Bookings'
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
      </Tab.Navigator>
    
  );
}



export default function App() {
  return (
    <NavigationContainer>
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
          headerTitle: getHeaderTitle(route)
        })}
      />
      <Stack.Screen
        name="doctorDetails"
        component={DoctorDetails}
        options={{ title: "Details" }}
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
          headerTitle: getHeaderTitle(route)
        })}
      />
    </Stack.Navigator>
    </NavigationContainer>
  );
}
