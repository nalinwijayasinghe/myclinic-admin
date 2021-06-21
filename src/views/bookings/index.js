import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Dimensions, Alert, Image } from "react-native";
import { ListItem, Avatar, Overlay, Button, Icon, SearchBar, CheckBox } from "react-native-elements";
const windowWidth = Dimensions.get("window").width;


export default function bookings({ navigation }) {

  const list = [
    {
      title: 'Appointments',
      subtitle: 'av-timer'
    },
    {
      title: 'Trips',
      subtitle: 'flight-takeoff'
    },

  ]

  const [data, setData] = useState([]);
  const [bookingDetails, setbookingDetails] = useState({
    pName: "",
    bNumber: "",
    time: "",
    doctor: "",
  })
  const [isLoading, setLoading] = useState(true);

  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [checked, setChecked] = useState(true);
  const [checkedValue, setcheckedValue] = useState('first')

  const checkStatus = () => {
    setChecked(!checked)
  }

  const updateSearch = (search) => {
    setSearch({ search });
  };

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  /*Alert*/

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Are you sure you want to mark this as done ?",
      "If you press 'OK' this session will be deactivated from the doctor's scheduel.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        // { text: "Yes", onPress: toggleSwitch },
        { text: "Yes", onPress: () => console.log("Yes Pressed"), },
      ]
    );

  /*Alert End*/

  /* Get data from the API*/

  useEffect(() => {
    fetch("https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    console.log("+++++++++++++++++++++++++++++++++++++++++");
    console.log(data);
  }, []);

  /* End - Get data from the API*/

  return (
    isLoading ? (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Image
      style={styles.tinyLogo}
      source={require('../../../assets/loading_gif.gif')}
    /></View>

    ) : (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>

          
            
              <View style={styles.searchArea}>
              {checkedValue === 'first' ? (<View style={styles.searchBoxRef}>
                  <SearchBar
                    placeholder="Search by reference number..."
                    onChangeText={updateSearch}
                    value={search}
                    lightTheme
                    inputContainerStyle={{backgroundColor:'#fff'}}
                    containerStyle={{backgroundColor:'#ededed'}}
                    
                  />
                </View>) : (<View style={styles.searchBoxbooking}>
                  <SearchBar
                    placeholder="Search by booking number..."
                    onChangeText={updateSearch}
                    value={search}
                    lightTheme
                    inputContainerStyle={{backgroundColor:'#fff'}}

                  />
                </View>)}
                <View style={styles.radioButtonArea}>
                  <CheckBox
                    center
                    title='Ref Number'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={checkedValue === 'first' ? checked : null}
                    onPress={() => setcheckedValue('first')}
                    containerStyle ={{backgroundColor: 'transparent', borderWidth:0}}
                  />
                  <CheckBox
                    center
                    title='Booking Number'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={checkedValue === 'second' ? checked : null}
                    onPress={() => setcheckedValue('second')}
                    containerStyle ={{backgroundColor: 'transparent', borderWidth:0}}
                  />
                </View>

                

              </View>
              {data.map((booking, i) => (
                <TouchableOpacity onPress={() => {
                  setVisible(!visible);
                  setbookingDetails({
                    pName: booking.name,
                    bNumber: "",
                    time: "",
                    doctor: "",
                  })
                }}
                  onLongPress={createTwoButtonAlert}
                  activeOpacity={0.2}
                  underlayColor="#1896c5"
                >
                  <ListItem key={i} bottomDivider>
                    <Icon name='chevron-right' />
                    <ListItem.Content>
                      <ListItem.Title>{booking.name}</ListItem.Title>
                      <ListItem.Subtitle><Text style={{ color: '#1896c5' }}>Ref # - {booking.city}</Text> / <Text style={{ color: 'green' }}>Booking # - 10</Text></ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
                  </ListItem>
                </TouchableOpacity>

              )
            
          )}

          <Overlay overlayStyle={styles.overLayStyles} isVisible={visible} onBackdropPress={toggleOverlay}>

            <View style={styles.bookingSingleRow}>
              <Text style={styles.bookingTitle}>Patient</Text>
              <Text>:</Text>
              <Text style={styles.bookingDetails}>{bookingDetails.pName}</Text>
            </View>
            <View style={styles.bookingSingleRow}>
              <Text style={styles.bookingTitle}>Date</Text>
              <Text>:</Text>
              <Text style={styles.bookingDetails}>2021/06/10</Text>
            </View>
            <View style={styles.bookingSingleRow}>
              <Text style={styles.bookingTitle}>Session</Text>
              <Text>:</Text>
              <Text style={styles.bookingDetails}>
                Session 1 - (8.00am - 12.00pm)
              </Text>
            </View>
            <View style={styles.bookingSingleRow}>
              <Text style={styles.bookingTitle}>Booking #</Text>
              <Text>:</Text>
              <Text style={[styles.bookingDetails, styles.bookingNumber]}>
                Test
              </Text>
              <Text style={styles.bookinTime}>8.40 am</Text>
            </View>
            <ListItem
              topDivider

              containerStyle={{ backgroundColor: "transparent", marginTop: 10 }}

            >
              {/* <Avatar rounded source={{ uri: l.avatar_url }} /> */}
              <ListItem.Content>
                <ListItem.Title>Dr. Abc</ListItem.Title>
                <ListItem.Subtitle>Car</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <Button
              title="Done"
              icon={{ name: 'check', color: 'white' }}
              buttonStyle={{ backgroundColor: '#1896c5', width: '40%', alignSelf: 'flex-end', marginTop: 15 }}
            />
          </Overlay>


        </View>
      </ScrollView>
    </SafeAreaView>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

  bookingView: {
    padding: 20,
    margin: 20,
    backgroundColor: "#dce9ee",
    borderRadius: 5,
  },
  bookingSingleRow: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 4,
    alignItems: 'center'
  },
  bookingTitle: {
    minWidth: 80,
  },
  bookingDetails: {
    fontWeight: "bold",
    flexWrap: "wrap",
    flex: 1,
    marginLeft: 10,
  },
  bookinTime: {
    backgroundColor: "#fff",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 3,
    color: "red",
  },
  bookingNumber: {
    color: "green",
    fontSize: 15,
  },
  bookinItem: {

  },
  bookingDate: {
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  bookingRaw: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 5
  },
  overLayStyles: {
    minWidth: windowWidth - 50
  },
  radioButtonArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    marginBottom:5
  },
  searchBoxRef:{
    marginBottom:4
  },
  searchBoxbooking:{
    marginBottom:4
  }
});
