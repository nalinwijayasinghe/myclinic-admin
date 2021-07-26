import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { LoadingImage } from '../../../assets/loading_gif.gif';
import { storeData, retrieveData } from '../../utility/cacheLoader';



export default function doctorList({ navigation }) {
  const [doctorData, setdoctorData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  /* Get data from the API*/

  useEffect(() => {
    let selectedModel = {

      dispensary: {
        dispensaryId: 5,
        dispensaryName: "dispensary.name",
        address: "dispensary.address",
      }
    };
    storeData("dis_cache", selectedModel);
    fetch("https://agile-reef-01445.herokuapp.com/health-service/api/doctor-dispensary?dispensaryId=5&status=ACTIVE")
      .then((response) => response.json())
      .then((json) => setdoctorData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    console.log("+++++++++++++++++++++++++++++++++++++++++");
    console.log(doctorData);
  }, []);

  /* End - Get data from the API*/

  return (
    isLoading ? (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={require('../../../assets/loading_gif.gif')}
        />
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
                  onPress={() => navigation.navigate("doctorDetails", {
                    doctor: {
                      doctorName: l.doctor.name,
                      doctorSubjet: l.doctor.speciality,
                      doctorImage: l.doctor.image,
                      doctorID: l.doctor.doctorId
                    }

                  })}
                >
                  {l.doctor.image === null ? <View style={styles.defaultAvatarContainer}><Text style={styles.defaultAvatar}>{l.doctor.name.charAt(0)}</Text></View> : <Avatar rounded source={{
                    uri:
                      `https://agile-reef-01445.herokuapp.com/health-service/images/${l.doctor.image}`,
                  }} />}

                  <ListItem.Content>
                    <ListItem.Title>{l.doctor.name}</ListItem.Title>
                    <ListItem.Subtitle>{l.doctor.speciality}</ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron color="black" />
                </ListItem>
              ))}
            </View>



          </View>
        </ScrollView>
      </SafeAreaView>)
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
    backgroundColor: '#1896c5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,

    width: 33,
    height: 33,

  },
  defaultAvatar: {
    color: '#fff',
    fontWeight: "bold",
    fontSize: 14
  }
});
