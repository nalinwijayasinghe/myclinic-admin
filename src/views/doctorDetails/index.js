import React, { useState, useRef, useEffect } from "react";
import "react-native-gesture-handler";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import {
  ListItem,
  Avatar,
  Icon,
  Text,
  Switch,
  Overlay,
  Divider,
  Button,
} from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FilterByDate } from "../../components/filterByDate";
import FilterByDay from "../../components/filterByDay";

const scheduelDetails = [
  {
    day: "Sunday",
    date: "2021-05-06",
  },
  {
    day: "Monday",
    date: "2021-05-07",
  },
  {
    day: "Tuesday",
    date: "2021-05-08",
  },
  {
    day: "Wednesday",
    date: "2021-05-09",
  },
];

const sessionDetails = [
  {
    sessionID: "1",
  },
  {
    sessionID: "2",
  },
];
const windowWidth = Dimensions.get("window").width;
export default function doctorDetails({ route, navigation }) {
  const { doctorName, doctorSubjet, doctorImage } = route.params;
  const [sexpanded, setSexpanded] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);
  const [deactivatedItems, setDeactivatedItems] = useState([]);
  const [docAbsent, setDocAbsent] = useState(true);
  const [expandedDay, setExpandedDay] = useState(false);
  const [expandedDate, setExpandedDate] = useState(false);
  const [sessionDetails, setsessionDetails] = useState([]);
  const [days, setDays] = useState([]);
  const [selecedSession, setselectedSession] = useState(new Map());



  /* Get data from the API*/

  useEffect(() => {
    fetch("https://agile-reef-01445.herokuapp.com/health-service/api/schedule/doctor/5/dispensary/5?displayDays=3")
      .then((response) => response.json())
      .then((json) => {
        let map = new Map();
        let tempKeys = [];
        json.forEach((resource) => {
          let sessions = [];
          if (map.get(resource.day) !== undefined) {
            let tmpAppoinment = map.get(resource.day);
            console.log('tmpppppppppppppppppppppp')
            console.log(map);
            let session = {
              startTime: resource.sessionStartTime,
              macCount: resource.maxCount,
            };
            tmpAppoinment.sessions.push(session);
            map.set(resource.day, tmpAppoinment);
          } else {
            let session = {
              startTime: resource.sessionStartTime,
              macCount: resource.maxCount,
            };
            sessions.push(session);
            let appointment = {
              date: resource.date,
              day: resource.day,
              sessions: sessions,
            };
            map.set(resource.day, appointment);
          }
        });

        map.forEach(function (value, key) {
          tempKeys.push(key);
          console.log(key + " = " + JSON.stringify(value));
        })
        setDays(tempKeys);
        setselectedSession(map);


      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));

  }, []);


  /* End - Get data from the API*/


  /*  Set Expanded Function */

  const updateExpandedList = (day,value) => {
    if (expandedItems.indexOf(value) !== -1) {
      // setExpandedItems([...expandedItems].filter(item => item !== value))
      setExpandedItems([]);
    } else {
      // let exList = [...expandedItems]
      // exList.push(value)
      setExpandedItems([value]);
     
      let tmpSessions = selecedSession.get(day);
      
      setsessionDetails(tmpSessions.sessions);
      //alert(JSON.stringify(tmpSessions.sessions))
      selecedSession.forEach(function (value, key) {
        
        alert(key + " = " + JSON.stringify(value));
      })
    }
  };

  /*  Set Expanded Function */

  /*Alert*/

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Are you sure you want to do this ?",
      "If you press 'OK' this session will be deactivated from the doctor's scheduel.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Yes", onPress: toggleSwitch },
      ]
    );

  /*Alert End*/

  /*Date Picker*/

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    console.log(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  /*Date Picker End*/

  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const toggleSwitch = () => setDocAbsent((docAbsent) => !docAbsent);

  return (
    <>
      <View style={styles.container}>
        <ListItem bottomDivider>
          {doctorImage === null ? <View style={styles.defaultAvatarContainer}><Text style={styles.defaultAvatar}>{doctorName.charAt(0)}</Text></View> : <Avatar
            rounded
            size="large"
            source={{
              uri: `https://agile-reef-01445.herokuapp.com/health-service/images/${doctorImage}`,
            }}
          />}

          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: "bold" }}>
              {doctorName}
            </ListItem.Title>
            <ListItem.Subtitle>{doctorSubjet}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <View style={styles.scheduelHeader}>
          <Text style={styles.pageSubHeader}>Doctor's Schedule</Text>
          <Icon name="tune" raised color="#f50" onPress={toggleOverlay} />
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={styles.daysSection}>
            {days.map((l, i) => (
              <ListItem.Accordion
                key={"scheduelDetails" + i}
                content={
                  <>
                    <Icon
                      name="event"
                      color="#1896c5"
                      size={20}
                      style={{ marginRight: 15 }}
                    />
                    <ListItem.Content>
                      <ListItem.Title style={{ color: "#1896c5", textTransform:'capitalize' }}>
                        {l}
                      </ListItem.Title>
                    </ListItem.Content>
                  </>
                }
                isExpanded={expandedItems.indexOf(i) !== -1}
                // isExpanded={expandedItems===i}
                onPress={() => {
                  //setSexpanded(!sexpanded);
                  updateExpandedList(l,i);
                }}
              >
                {sessionDetails.map((sd, j) => (
                  <View
                    key={"sessionKey" + j}
                    style={[
                      docAbsent ? styles.sessionViewPr : styles.sessionViewAb,
                      expandedItems.indexOf(i) !== -1
                        ? {}
                        : { display: "none" },
                    ]}
                  >
                    <View style={styles.switchAndHeading}>
                      <Text style={styles.subHeadingSubView}>
                        Session {sd.sessionID}
                      </Text>
                      <Switch
                        color="#61c085"
                        value={docAbsent}
                        onValueChange={createTwoButtonAlert}
                      />
                    </View>
                    <Divider
                      style={{ backgroundColor: "#a4a4a4", marginTop: 10 }}
                    />
                    <View style={styles.sessionDetailsSection}>
                      <View style={styles.singleRow}>
                        <Text style={styles.timeTitle}>Start Time</Text>
                        <Text style={styles.timeValue}>{sd.startTime}</Text>
                        <Icon
                          name="access-alarms"
                          raised
                          size={18}
                          color="#1896c5"
                          onPress={showTimepicker}
                          disabled={docAbsent ? false : true}
                        />
                      </View>
                      <View style={styles.singleRow}>
                        <Text style={styles.timeTitle}>Number of bookings</Text>
                        <Text style={styles.timeValue}>{sd.macCount}</Text>
                        <Icon
                          name="access-alarms"
                          raised
                          size={18}
                          color="#1896c5"
                          onPress={showTimepicker}
                          disabled={docAbsent ? false : true}
                        />
                      </View>
                    </View>

                    {show && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                      />
                    )}
                  </View>
                ))}
              </ListItem.Accordion>
            ))}
          </View>
        </ScrollView>
        <Button
          // icon={<Icon name="restore-page" size={15} color="white" />}
          title="Update"
          buttonStyle={styles.footerButton}
          titleStyle={{ textTransform: 'uppercase' }}
          disabled
        />
      </View>

      <Overlay
        overlayStyle={styles.overLayContainer}
        isVisible={visible}
        onBackdropPress={toggleOverlay}
      >
        <Text style={styles.pageSubHeader}>Filter Scheduel</Text>

        <ListItem.Accordion
          bottomDivider
          content={
            <>
              <Icon name="event" size={25} style={{ marginRight: 12 }} />
              <ListItem.Content>
                <ListItem.Title>Filter by day</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expandedDay}
          onPress={() => {
            setExpandedDay(!expandedDay);
            setExpandedDate(false);
          }}
        >
          <FilterByDay />
        </ListItem.Accordion>
        <ListItem.Accordion
          topDivider
          content={
            <>
              <Icon
                name="calendar"
                type="font-awesome"
                size={20}
                style={{ marginRight: 12 }}
              />
              <ListItem.Content>
                <ListItem.Title>Filter by date</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expandedDate}
          onPress={() => {
            setExpandedDate(!expandedDate);
            setExpandedDay(false);
          }}
        >
          <FilterByDate />
        </ListItem.Accordion>
      </Overlay>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  daysSection: {
    paddingHorizontal: 15,
  },
  pageSubHeader: {
    fontSize: 16,
    marginVertical: 15,
  },
  scheduelHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 15,
  },
  sessionViewPr: {
    backgroundColor: "#dffdea",
    borderRadius: 5,
    marginVertical: 10,
    padding: 10,
    display: "flex",
    flexDirection: "column",
  },
  sessionViewAb: {
    backgroundColor: "#f4f3f3",
    borderRadius: 5,
    marginVertical: 10,
    padding: 10,
    display: "flex",
    flexDirection: "column",
  },
  switchAndHeading: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  overLayContainer: {
    display: "flex",
    minWidth: windowWidth - 50,
  },
  singleDayText: {
    marginVertical: 8,
  },
  singleRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginVertical: 10,
  },
  timeTitle: {
    marginRight: "auto",
  },
  subHeadingSubView: {
    fontSize: 15,
    fontWeight: "700",
    color: "#5c5c5c",
  },
  timeValue: {
    marginRight: 15,
  },
  footerButton: {
    backgroundColor: '#1896c5',
    height: 55,

  },
  defaultAvatarContainer: {
    backgroundColor: '#1896c5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,

    width: 70,
    height: 70,

  },
  defaultAvatar: {
    color: '#fff',
    fontWeight: "bold",
    fontSize: 28
  }
});
