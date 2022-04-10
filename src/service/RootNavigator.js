import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";

import Firebase from "../config/firebase";
import { AuthenticatedUserContext } from "../service/AuthenticatedUserProvider";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import { storeData } from "../utility/cacheLoader";

const auth = Firebase.auth();

export default function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  // const invokeAPI = async () => {
  //   console.log("RootNavigator : invokeAPI :" + JSON.stringify(user));
  //   const headers = new Headers({
  //     "Content-Type": "application/json",
  //   });
  //   let response = await fetch(
  //     "http://192.168.1.5:8086/health-service/api/dispensary-users?userId=JJtRobamLuaylwJhMj9i2T2ReYE3"
  //   );
  //   console.log("response :" + JSON.stringify(response));
  //   if (!response.ok) {
  //     const message = `An error has occured: ${response.status}`;
  //     throw new Error(message);
  //   }
  //   console.log(response.json());
  //   let json = await response.json();
  //   console.log("RootNavigator ->api response :" + json);
  //   return json;
  // };

  // const getResources = async () => {
  //   invokeAPI()
  //     .then((user) => {
  //       console.log(
  //         "RootNavigator : getResources :user->" + JSON.stringify(user)
  //       );
  //       console.log(
  //         "RootNavigator ->dispensaryId :" + user.dispensary.dispensaryId
  //       );
  //       storeData("dispensary", user.dispensary.dispensaryId);
  //     })
  //     .catch((error) => {
  //       console.log("....................error ..................." + error);
  //       error.message; // 'An error has occurred: 404'
  //     });
  // };

  const setLoggedUser = (authenticatedUser) => {
    setUser(authenticatedUser);
    storeData("user", authenticatedUser.uid);
  };
  useEffect(() => {
    console.log("RootNavigator --> setUser and call getResources " + user);
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = auth.onAuthStateChanged(
      async (authenticatedUser) => {
        console.log(
          "=============================================== " +
            JSON.stringify(authenticatedUser)
        );
        try {
          await (authenticatedUser
            ? setLoggedUser(authenticatedUser)
            : setUser(null));
          setIsLoading(false);
          console.log("RootNavigate -> After setLoggedUser");

          // await getResources();
        } catch (error) {
          console.log(error);
        }
      }
    );

    return unsubscribeAuth;
  }, []);

  // useEffect(() => {
  //   const headers = new Headers({
  //     "Content-Type": "application/json",
  //   });
  //   // const defaults = { headers: headers };
  //   //options = Object.assign({}, defaults, options);
  //   return fetch(
  //     "http://192.168.1.15:8086/health-service/api/dispensary-users?userId=1"
  //   )
  //     .then((response) =>
  //       response.json().then((json) => {
  //         // console.log(".........................................." + json);
  //         // console.log("ApiClinet-> API response :" + JSON.stringify(response));
  //         if (!response.ok) {
  //           console.log("error ......" + json);
  //           return Promise.reject(json);
  //         }
  //         return json;
  //       })
  //     )
  //     .catch((error) => {
  //       return Promise.reject(json);
  //     });
  // }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
