import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import { AuthContext } from "../../service/context";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { LoadingImage } from "../../../assets/loading_gif.gif";
import { storeData, retrieveSingleItem } from "../../utility/cacheLoader";
import Firebase from "../../config/firebase";

export default function doctorList({ navigation }) {
  const [doctorData, setdoctorData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  // const { signOut } = React.useContext(AuthContext);
  /* Get data from the API*/
  const invokeAPI = async (user) => {
    console.log("DoctorList : invoking API ::" + user);
    const headers = new Headers({
      "Content-Type": "application/json",
    });
    console.log(
      `http://192.168.1.5:8086/health-service/api/dispensary-users?userId=${user.substring(
        1,
        user.length - 1
      )}`
    );
    let response = await fetch(
      `http://192.168.1.5:8086/health-service/api/dispensary-users?userId=${user.substring(
        1,
        user.length - 1
      )}`
    );
    console.log("MainStack After fetch :" + JSON.stringify(response));
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    // console.log(response.json());
    let json = await response.json();
    console.log("MainStack ->After convert to json :" + json);
    return json;
  };

  // const getResources = async (user) => {
  //   let res = await invokeAPI(user);

  //     .then((userObj) => {
  //       console.log(
  //         "MainStack : getResources :user->" + JSON.stringify(userObj)
  //       );
  //       // console.log(
  //       //   "MainStack ->dispensaryId :" + userObj.dispensary.dispensaryId
  //       // );

  //       // setIsConfigdataSet(true);
  //     })
  //     .catch((error) => {
  //       console.log("....................error ..................." + error);
  //       error.message; // 'An error has occurred: 404'
  //     });
  // };

  const getDoctorList = async (dispensaryId) => {
    console.log(
      `http://192.168.1.5:8086/health-service/api/doctor-dispensary?dispensaryId=${dispensaryId}&status=ACTIVE`
    );
    let doctorResponse = await fetch(
      `http://192.168.1.5:8086/health-service/api/doctor-dispensary?dispensaryId=${dispensaryId}&status=ACTIVE`
    );
    console.log("rMainStack response :" + JSON.stringify(doctorResponse));
    if (!doctorResponse.ok) {
      const message = `An error has occured: ${doctorResponse.status}`;
      throw new Error(message);
    }
    // console.log(doctorResponse.json());
    let json = await doctorResponse.json();
    return json;
  };

  useEffect(() => {
    let selectedModel = {
      dispensary: {
        dispensaryId: 5,
        dispensaryName: "dispensary.name",
        address: "dispensary.address",
      },
    };
    retrieveSingleItem("user").then((user) => {
      console.log("Recevied values from cache : " + user);
      invokeAPI(user).then((apiRes) => {
        console.log("Store api response to cache :" + JSON.stringify(apiRes));
        storeData("dis_cache", apiRes);
        getDoctorList(apiRes.dispensary.dispensaryId)
          .then((doctorSet) => {
            console.log(
              "setDoctorLista after api call :" + JSON.stringify(doctorSet)
            );
            setdoctorData(doctorSet);
            setLoading(false);
          })
          .catch((error) => {
            console.log(
              "DoctorList - Error occur retriving doctorList :" + error
            );
            error.message; // 'An error has occurred: 404'
          });
      });
      // let apiRes = invokeAPI(user);

      // invokeAPI(user).then((data) => {
      //   console.log("############# UserObj ####### " + JSON.stringify(data));
      //   storeData("dis_cache", data);
      //   getDoctorList(data.dispensary.dispensaryId)
      //     .then((doctorSet) => {
      //       setdoctorData(doctorSet);
      //       setLoading(false);
      //     })
      //     .catch((error) => {
      //       console.log(
      //         "DoctorList - Error occur retriving doctorList :" + error
      //       );
      //       error.message; // 'An error has occurred: 404'
      //     });
      // });
    });

    // storeData("dis_cache", selectedModel);
    // console.log(
    //   "DoctorList ->useEffect :dispensary from cache :" +
    //     JSON.stringify(retrieveSingleItem("dispensary"))
    // );
    // retrieveSingleItem("dispensary").then((data) => {
    //   console.log("......................data..................." + data);

    //   fetch(
    //     `https://agile-reef-01445.herokuapp.com/health-service/api/doctor-dispensary?dispensaryId=${data}&status=ACTIVE`
    //   )
    //     .then((response) => response.json())
    //     .then((json) => setdoctorData(json))
    //     .catch((error) => console.log(error))
    //     .finally(() => setLoading(false));
    //   console.log(doctorData);
    // });
  }, []);

  const loginHandle = () => {
    Firebase.auth()
      .signOut()
      .then(() => console.log("User signed out!"));
  };

  /* End - Get data from the API*/

  return isLoading ? (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={require("../../../assets/loading_gif.gif")} />
    </View>
  ) : (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View>
            {doctorData.map((l, i) => (
              <ListItem
                key={i}
                bottomDivider
                onPress={() =>
                  navigation.navigate("doctorDetails", {
                    doctor: {
                      doctorName: l.doctor.name,
                      doctorSubjet: l.doctor.speciality,
                      doctorImage: l.doctor.image,
                      doctorID: l.doctor.doctorId,
                    },
                  })
                }
              >
                {l.doctor.image === null ? (
                  <View style={styles.defaultAvatarContainer}>
                    <Text style={styles.defaultAvatar}>
                      {l.doctor.name.charAt(0)}
                    </Text>
                  </View>
                ) : (
                  <Avatar
                    rounded
                    source={{
                      uri: `https://agile-reef-01445.herokuapp.com/health-service/images/${l.doctor.image}`,
                    }}
                  />
                )}

                <ListItem.Content>
                  <ListItem.Title>{l.doctor.name}</ListItem.Title>
                  <ListItem.Subtitle>{l.doctor.speciality}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron color="black" />
              </ListItem>
            ))}
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                loginHandle();
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  defaultAvatarContainer: {
    backgroundColor: "#1896c5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,

    width: 33,
    height: 33,
  },
  defaultAvatar: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
