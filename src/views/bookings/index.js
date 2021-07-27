import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Dimensions, Alert, Image } from "react-native";
import { ListItem, Avatar, Overlay, Button, Icon, SearchBar, CheckBox, FAB, Input } from "react-native-elements";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


export default function bookings({ navigation }) {


  const [data, setData] = useState([]);
  const [bookingDetails, setbookingDetails] = useState({
    pName: "",
    bNumber: "",
    time: "",
    doctor: "",
  })
  // const [isLoading, setLoading] = useState(true);
  const [isLoadingDoctors, setLoadingDoctors] = useState(true);
  const [isLoadingSessions, setLoadingSessions] = useState(true);

  const [visible, setVisible] = useState(false);
  const [docListVisible, setdocListVisible] = useState(false);
  const [sessionListVisible, setsessionListVisible] = useState(false);
  const [reportVisible, setrepoartVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [checked, setChecked] = useState(true);
  const [checkedValue, setcheckedValue] = useState('first');
  const [doctorList, setdoctorList] = useState([]);
  const [sessionList, setsessionList] = useState([]);
  const [refNumber, setrefNumber] = useState('');
  const [phoneNumber, setphoneNumber] = useState();
  const [isBookingDetails, setisBookingDetails] = useState(true);
  const [bookingSearchResults, setbookingSearchResults] = useState([]);
  const [selectedDoctor, setselectedDoctor] = useState(
    {
      docName: "Select a doctor",
      docID: '',
    }
  );
  const [selectedSession, setselectedSession] = useState(
    {
      sessionName: "Select a session",
      sessionID: '',
      sessionStart: 'Select a session',
      sessionEnd: '',
    }
  )
  const [searchedBookingResutls, setsearchedBookingResutls] = useState([]);
  const [isSearchedBookings, setisSearchedBookings] = useState(false);
  const [warningMessage, setwarningMessage] = useState(false);
  const checkStatus = () => {
    setChecked(!checked)
  }

  const updateSearch = (search) => {
    setSearch({ search });
  };

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  /* Get Doctors from the API*/

  useEffect(() => {
    fetch("https://agile-reef-01445.herokuapp.com/health-service/api/doctor-dispensary?dispensaryId=5")
      .then((response) => response.json())
      .then((json) => {
        setdoctorList(json)
        if (json.length === 1) {
          setselectedDoctor({
            docName: json[0].doctor.name,
          })
          fetch(`https://agile-reef-01445.herokuapp.com/health-service/api/schedule/doctor/${json[0].doctor.doctorId}/dispensary/5?displayDays=1`)
            .then((response) => response.json())
            .then((json) => {
              setsessionList(json)
              if (json.length === 1) {
                setselectedSession({
                  sessionID: json[0].id,
                  sessionStart:json[0].essionStartTime
                })
              }
            })
            .catch((error) => console.error(error))
            .finally(() => setLoadingSessions(false));
          console.log("+++++++++++++++++Sessionsssssssss++++++++++++++++++++++++");
          console.log(sessionList);
        }

      })
      .catch((error) => console.error(error))
      .finally(() => setLoadingDoctors(false));
    console.log("+++++++++++++++++++++++++++++++++++++++++");
    console.log(doctorList);
  }, []);

  /* End - Get Doctors from the API*/

  const toggleOverlayDoc = () => {
    setdocListVisible(!docListVisible);

  };
  const toggleOverlaySes = () => {
    setsessionListVisible(!sessionListVisible);
  };

  /* load sessions for multipe doctors*/

  const getSessionsMutipleDocs = (doctorID) => {
    fetch(`https://agile-reef-01445.herokuapp.com/health-service/api/schedule/doctor/${doctorID}/dispensary/5?displayDays=1`)
      .then((response) => response.json())
      .then((json) => {
        setsessionList(json)
        if (json.length === 1) {
          setselectedSession({
            sessionID: json[0].id,
            sessionStart:json[0].sessionStartTime
          })
        }
        if (json.length === 0) {
          setselectedSession({
            sessionStart: "No sessions for this doctor",
          })
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoadingSessions(false);

      });
    console.log("+++++++++++++++++Sessionsssssssss++++++++++++++++++++++++");
    console.log('chdeckkkkkkk' + typeof (sessionList === undefined));
  }

  /* load sessions for multiple doctors end */

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




  /* Create Search function */

  const searchHandler = () => {
    setisSearchedBookings(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        {

          doctorScheduleGridId: selectedSession.sessionID
        }
      ),
    };
    
    fetch("https://agile-reef-01445.herokuapp.com/health-service/api/bookings", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setsearchedBookingResutls(data);
        console.log('booking details==============================' + JSON.stringify(data))
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setisSearchedBookings(false);
        setwarningMessage(true)
      });

  }


  /* End Create search function */

  return (
    isLoadingDoctors ? (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Image
        style={styles.tinyLogo}
        source={require('../../../assets/loading_gif.gif')}
      /></View>

    ) : (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <SafeAreaView>
          <ScrollView style={styles.scrollView}>
            <View style={styles.container}>



              {/* <View style={styles.searchArea}>
                {checkedValue === 'first' ? (<View style={styles.searchBoxRef}>
                  <SearchBar
                    placeholder="Search by reference number..."
                    onChangeText={updateSearch}
                    value={search}
                    lightTheme
                    inputContainerStyle={{ backgroundColor: '#fff' }}
                    containerStyle={{ backgroundColor: '#ededed' }}

                  />
                </View>) : (<View style={styles.searchBoxbooking}>
                  <SearchBar
                    placeholder="Search by mobile number..."
                    onChangeText={updateSearch}
                    value={search}
                    lightTheme
                    inputContainerStyle={{ backgroundColor: '#fff' }}

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
                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                  />
                  <CheckBox
                    center
                    title='Mobile Number'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={checkedValue === 'second' ? checked : null}
                    onPress={() => setcheckedValue('second')}
                    containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                  />
                </View>



              </View> */}

              <View style={styles.searchForm}>
                {doctorList.length > 1 ? (
                  <TouchableOpacity onPress={toggleOverlayDoc}>
                    <View style={styles.singleSearchRow}>
                      <Icon name='user-md' type='font-awesome' style={{ marginRight: 20 }} />
                      <Text style={styles.searchDetail}>{selectedDoctor.docName}</Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  isLoadingDoctors ? (
                    <View style={styles.singleSearchRow}>
                      <Icon name='user-md' type='font-awesome' style={{ marginRight: 20 }} />
                      <Text style={styles.searchDetail}>Loading...</Text>
                    </View>
                  ) : (
                    <View style={styles.singleSearchRow}>
                      <Icon name='user-md' type='font-awesome' style={{ marginRight: 20 }} />
                      <Text style={styles.searchDetail}>{selectedDoctor.docName}</Text>
                    </View>)
                )}
                {isLoadingSessions ? null : (

                  sessionList.length > 1 ? (
                    <TouchableOpacity onPress={toggleOverlaySes}>
                      <View style={styles.singleSearchRow}>
                        <Icon name='clock-o' type='font-awesome' style={{ marginRight: 20 }} />
                        <Text style={styles.searchDetail}>{selectedSession.sessionStart}</Text>
                      </View>
                    </TouchableOpacity>
                  ) : (

                    <View style={styles.singleSearchRow}>
                      <Icon name='clock-o' type='font-awesome' style={{ marginRight: 20 }} />
                      {sessionList.length == 0 ? (<Text style={styles.searchDetail}>{selectedSession.sessionStart}</Text>) : (<Text style={styles.searchDetail}>{sessionList[0].sessionStartTime}</Text>)}

                    </View>
                  )
                )}


                <Button
                  // icon={
                  //   <Icon
                  //     name="search"
                  //     size={15}
                  //     color="white"
                  //     type='font-awesome'
                  //     style={{ marginRight: 8 }}

                  //   />
                  // }
                  title="Search"
                  disabled={selectedDoctor.docName === "Select a doctor" || selectedSession.sessionStart === "Select a session" || selectedSession.sessionStart === "No sessions for this doctor"}
                  buttonStyle={{ alignSelf: 'flex-end', width: 100, marginTop: 10, marginRight: 10 }}
                  onPress={searchHandler}
                />
              </View>

              {isSearchedBookings ? (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Image
                  style={styles.tinyLogo}
                  source={require('../../../assets/loading_gif.gif')}
                /></View>

              ) : (
                searchedBookingResutls.length === 0 && warningMessage ? (
                  <View style={styles.warningArea}>
                    <Text style={{ color: '#a80303', textAlign: 'center' }}>There is no data for selected fields. Please try again.</Text>
                  </View>
                ) : (

                  <>
                    {warningMessage ? <Text style={styles.subHeading}>Searched results</Text> : null}
                    {searchedBookingResutls.map((booking, i) => (
                      <TouchableOpacity onPress={() => {
                        setVisible(!visible);
                        setbookingDetails({
                          pName: booking.patient,
                          bNumber: "",
                          time: "",
                          doctor: "",
                        })
                      }}
                        onLongPress={createTwoButtonAlert}
                        activeOpacity={0.2}
                        underlayColor="#1896c5"
                      >
                        <ListItem key={i}
                          bottomDivider={searchedBookingResutls.length - 1 ? true : false}
                        >
                          <Icon name='chevron-right' />
                          <ListItem.Content>
                            <ListItem.Title>{booking.patient}</ListItem.Title>
                            <ListItem.Subtitle><Text style={{ color: '#1896c5' }}>Ref # - {booking.patientAppointmentNumber}</Text> / <Text style={{ color: 'green' }}>Booking # - 10</Text></ListItem.Subtitle>
                          </ListItem.Content>
                          <ListItem.Chevron />
                        </ListItem>
                      </TouchableOpacity>

                    )
                    )}
                  </>
                ))}




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
        <FAB title="Advance Search"
          placement='right'
          color="lightcoral"
          onPress={() => navigation.navigate('advanceSearch')}
        />

        {/* Doctors Overlay */}
        <Overlay overlayStyle={styles.overLayStyles} isVisible={docListVisible} onBackdropPress={toggleOverlayDoc}>
          <Text style={styles.heading}>Doctors in this dispensary</Text>
          {
            isLoadingDoctors ? (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}><Image
                style={styles.tinyLogo}
                source={require('../../../assets/loading_gif.gif')}
              /></View>

            ) : (
              <View style={{ height: (doctorList.length) * 80, maxHeight: windowHeight - 100 }}>
                <ScrollView>
                  {
                    doctorList.map((doctors, i) => (
                      <ListItem key={'doctor' + i}
                        bottomDivider={i === (doctorList.length) - 1 ? false : true}
                        onPress={
                          () => {
                            setselectedDoctor(
                              {
                                docName: doctors.doctor.name,
                                docID: doctors.doctor.doctorId,
                              }
                            )
                            getSessionsMutipleDocs(doctors.doctor.doctorId);
                            setdocListVisible(!docListVisible)

                          }
                        }>
                        {/* <Avatar source={{ uri: l.avatar_url }} /> */}
                        <ListItem.Content>
                          <ListItem.Title>{doctors.doctor.name}</ListItem.Title>
                          <ListItem.Subtitle>{doctors.doctor.speciality}</ListItem.Subtitle>
                        </ListItem.Content>
                      </ListItem>
                    ))
                  }
                </ScrollView>
              </View>
            )
          }
        </Overlay>

        {/* Sessions Overlay */}
        <Overlay overlayStyle={styles.overLayStyles} isVisible={sessionListVisible} onBackdropPress={toggleOverlaySes}>
          <Text style={styles.heading}>Sessions - Dr. {selectedDoctor.docName}</Text>
          {isLoadingSessions ? (<Text>Loading</Text>) : (


            sessionList.map((session, i) => (
              <ListItem key={"session" + i}
                bottomDivider={i === sessionList.length - 1 ? false : true}
                onPress={() => {
                  setselectedSession({
                    sessionName: session.day,
                    sessionID: session.id,
                    sessionStart: session.sessionStartTime,
                    sessionEnd: session.sessionEndTime,
                  });
                  setsessionListVisible(!sessionListVisible);
                }}
              >
                <ListItem.Content>
                  <ListItem.Title>{session.sessionStartTime} to {session.sessionEndTime}</ListItem.Title>
                  <ListItem.Subtitle>{session.day}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))


          )}
        </Overlay>

      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'

  },
  searchForm: {
    paddingVertical: 20,
    paddingHorizontal: 10
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
    minWidth: windowWidth - 50,
    maxHeight: windowHeight - 100,
    height: 'auto'
  },
  radioButtonArea: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  searchBoxRef: {
    marginBottom: 4
  },
  searchBoxbooking: {
    marginBottom: 4
  },
  reportOverlay: {
    width: windowWidth - 10,
    height: windowHeight - 130
  },
  singleSearchRow: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingBottom: 14,
    marginHorizontal: 10
  },
  searchDetail: {
    color: '#89898a',
    fontSize: 15
  },
  heading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    backgroundColor: "#1896c5",
    padding: 10,
    borderRadius: 4
  },
  warningArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fde1e1',
    borderColor: '#fed4d4',
    borderWidth: 2,
    borderRadius: 4,
    padding: 20,
    margin: 20
  },
  subHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 20,
    color: '#656565'
  }

});
