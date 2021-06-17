import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, } from "react-native";
import { ListItem, Avatar } from "react-native-elements";


const list = [
  {
    name: "Amy Farha",
    avatar_url:
      "https://images.theconversation.com/files/304957/original/file-20191203-66986-im7o5.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop",
    subtitle: "Vice President",
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://www.drshvetz.com/wp-content/uploads/2016/09/doctor-1.jpg",
    subtitle: "Vice Chairman",
  },
  {
    name: "Amy Farha",
    avatar_url:
      "https://images.theconversation.com/files/304957/original/file-20191203-66986-im7o5.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop",
    subtitle: "Vice President",
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://www.drshvetz.com/wp-content/uploads/2016/09/doctor-1.jpg",
    subtitle: "Vice Chairman",
  },

];

export default function doctorList({ navigation }) {
  const [doctorData, setdoctorData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  /* Get data from the API*/

  useEffect(() => {
    fetch("https://agile-reef-01445.herokuapp.com/health-service/api/doctor")
      .then((response) => response.json())
      .then((json) => setdoctorData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    console.log("+++++++++++++++++++++++++++++++++++++++++");
    console.log(doctorData);
  }, []);

  /* End - Get data from the API*/

  return (

    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>

          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            <View>
              {doctorData.map((l, i) => (
                <ListItem
                  key={i}
                  bottomDivider
                  onPress={() => navigation.navigate("doctorDetails", {
                    doctorName: l.name,
                    doctorSubjet: l.speciality,
                    doctorImage: l.image
                  })}
                >
                  {l.image === null ? <View style={styles.defaultAvatarContainer}><Text style={styles.defaultAvatar}>{l.name.charAt(0)}</Text></View> : <Avatar rounded source={{
                    uri:
                      `https://agile-reef-01445.herokuapp.com/health-service/images/${l.image}`,
                  }} />}

                  <ListItem.Content>
                    <ListItem.Title>{l.name}</ListItem.Title>
                    <ListItem.Subtitle>{l.speciality}</ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron color="black" />
                </ListItem>
              ))}
            </View>
          )}


        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
