import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Dimensions, Alert, Image, } from "react-native";
import { ListItem, Avatar, Overlay, Button, Icon, SearchBar, CheckBox, FAB, Input } from "react-native-elements";
import DateTimePicker from '@react-native-community/datetimepicker';
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


export default function report({ navigation }) {

    let listRef;
    const dateAlert = () =>
        Alert.alert(
            "Error",
            "Please select a 'Start Date' first",
            [

                { text: "OK", onPress: showDatepicker }
            ]
        );

    const [date, setDate] = useState(new Date());
    const [dateEnd, setDateEnd] = useState(new Date());
    const [dateSingle, setDateSingle] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [modeEnd, setModeEnd] = useState('date');
    const [modeSingle, setModeSingle] = useState('date');
    const [show, setShow] = useState(false);
    const [showEnd, setShowEnd] = useState(false);
    const [showSingle, setShowSingle] = useState(false);
    const [checked, setChecked] = useState(true);
    const [checkedValue, setcheckedValue] = useState('first');
    const [docListVisible, setdocListVisible] = useState(false);
    const [sessionListVisible, setsessionListVisible] = useState(false);
    const [doctorList, setdoctorList] = useState([]);
    const [sessionList, setsessionList] = useState([]);
    const [dateField, setdateField] = useState('Select a date');
    const [dateFieldEnd, setdateFieldEnd] = useState('Select a date');
    const [isLoadingDoctors, setLoadingDoctors] = useState(true);
    const [isLoadingSessions, setLoadingSessions] = useState(true);
    const [bookingData, setbookingData] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [isSearchedBookings, setisSearchedBookings] = useState(false);
    const [searchedBookingResutls, setsearchedBookingResutls] = useState([]);
    const [warningMessage, setwarningMessage] = useState(false);
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
        }
    )
    const [referenceNumber, setreferenceNumber] = useState('');
    const [phoneNumber, setphoneNumber] = useState();
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
                                    SelectedsessionID: json[0].sessionID,
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


    const getSessionsMutipleDocs = (doctorID) => {
        fetch(`https://agile-reef-01445.herokuapp.com/health-service/api/schedule/doctor/${doctorID}/dispensary/5?displayDays=1`)
            .then((response) => response.json())
            .then((json) => {
                setsessionList(json)
                if (json.length === 1) {
                    setselectedSession({
                        SelectedsessionID: json[0].sessionID,
                    })
                }
            })
            .catch((error) => console.error(error))
            .finally(() => {
                setLoadingSessions(false);
                setselectedSession({
                    sessionStart: "Select a session",
                })
            });
        console.log("+++++++++++++++++Sessionsssssssss++++++++++++++++++++++++");
        console.log('chdeckkkkkkk' + typeof (sessionList === undefined));
    }

    /* load sessions for multiple doctors end */

    const toggleOverlayDoc = () => {
        setdocListVisible(!docListVisible);
    };
    const toggleOverlaySes = () => {
        setsessionListVisible(!sessionListVisible);
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setdateField(selectedDate.toDateString());
    };

    const onChangeEnd = (event, selectedDate) => {
        const currentDate = selectedDate || dateEnd;
        setShowEnd(Platform.OS === 'ios');
        setDateEnd(currentDate);
        setdateFieldEnd(selectedDate.toDateString());
        fetch(`https://agile-reef-01445.herokuapp.com/health-service/api/bookings?startDate=${date}&endDate=${dateEnd}`)
        setisLoading(true)
            .then((response) => response.json())
            .then((json) => setbookingData(json))
            .catch((error) => console.error(error))
            .finally(() => setisLoading(false));
        console.log("+++++++++++++++++++++++++++++++++++++++++");
        console.log(bookingData);
    };
    const onChangeSingle = (event, selectedDate) => {
        const currentDate = selectedDate || dateSingle;
        setShowSingle(Platform.OS === 'ios');
        setDateSingle(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showModeEnd = (currentMode) => {
        setShowEnd(true);
        setModeEnd(currentMode);
    };

    const showModeSingle = (currentMode) => {
        setShowSingle(true);
        setModeSingle(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showDatepickerEnd = () => {
        showModeEnd('date');
    };
    const showDatepickerSingle = () => {
        showModeSingle('date');
    };

    const advanceBookingResults = () => {
        listRef.scrollTo({ x: 0, y: 0, animated: true })
        
    }

    /* Create Search function */

    const searchHandler = () => {
        setisSearchedBookings(true);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                {

                    doctorScheduleGridId: selectedSession.sessionID,
                    refNumber:referenceNumber,
                    phone:phoneNumber
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
        <ScrollView ref={(ref) => {
            listRef = ref;
        }}>
            <View style={styles.container}>
                <View style={styles.radioButtonArea}>
                    <CheckBox
                        center
                        title='Multiple Dates'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={checkedValue === 'first' ? checked : null}
                        onPress={() => setcheckedValue('first')}
                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                    />
                    <CheckBox
                        center
                        title='Single Date'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={checkedValue === 'second' ? checked : null}
                        onPress={() => setcheckedValue('second')}
                        containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                    />
                </View>
                <View style={{ paddingHorizontal: 10 }}>

                    {checkedValue === 'first' ? (<View style={styles.calenderMainView}>
                        <View style={styles.calenderSingleView}>
                            <Text style={styles.dateHeading}>Start Date</Text>
                            <TouchableOpacity onPress={showDatepicker}>
                                <View style={styles.iconDate}>
                                    <Icon color="#1896c5" name='event' />
                                    <Text style={styles.selectText}>{dateField}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {dateField === 'Select a date' ? (
                            <View style={styles.calenderSingleView}>
                                <Text style={styles.dateHeading}>End Date</Text>
                                <TouchableOpacity onPress={dateAlert}>
                                    <View style={styles.iconDate}>
                                        <Icon color="#1896c5" name='event' />
                                        <Text style={styles.selectText}>{dateFieldEnd}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={styles.calenderSingleView}>
                                <Text style={styles.dateHeading}>End Date</Text>
                                <TouchableOpacity onPress={showDatepickerEnd}>
                                    <View style={styles.iconDate}>
                                        <Icon color="#1896c5" name='event' />
                                        <Text style={styles.selectText}>{dateFieldEnd}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>)}


                    </View>) : (<View style={styles.calenderMainView}>
                        <View style={styles.calenderSingleView}>
                            <Text style={styles.dateHeading}>Select a date</Text>
                            <TouchableOpacity onPress={showDatepickerSingle}>
                                <View style={styles.iconDate}>
                                    <Icon color="#1896c5" name='event' />
                                    <Text style={styles.selectText}>{dateSingle.toDateString()}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>)}


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
                                        <Text style={styles.searchDetail}>{selectedSession.sessionName}</Text>
                                    </View>
                                </TouchableOpacity>
                            ) : (

                                <View style={styles.singleSearchRow}>
                                    <Icon name='clock-o' type='font-awesome' style={{ marginRight: 20 }} />
                                    {sessionList.length == 0 ? (<Text style={styles.searchDetail}>No sessions for this doctor</Text>) : (<Text style={styles.searchDetail}>{sessionList[0].id}</Text>)}

                                </View>
                            )
                        )}
                        <View>
                            <Input
                                placeholder='Type reference number'
                                leftIcon={{ type: 'font-awesome', name: 'address-book' }}
                                inputContainerStyle={{ marginBottom: -24, marginTop: -10, borderBottomColor: '#ddd' }}
                                inputStyle={{ fontSize: 15 }}
                                leftIconContainerStyle={{ marginRight: 10 }}
                                value={referenceNumber}
                                onChangeText={(refText)=>setreferenceNumber(refText)}


                            />
                        </View>
                        <View>
                            <Input
                                placeholder='Type phone numner'
                                leftIcon={{ type: 'font-awesome', name: 'phone' }}
                                inputContainerStyle={{ borderBottomColor: '#ddd' }}
                                leftIconContainerStyle={{ marginRight: 10 }}
                                inputStyle={{ fontSize: 15 }}
                                keyboardType='phone-pad'
                                value={phoneNumber}
                                onChangeText={(phoneText)=>setphoneerenceNumber(phoneText)}
                            />
                        </View>
                        <Button
                            icon={
                                <Icon
                                    name="search"
                                    size={15}
                                    color="white"
                                    type='font-awesome'
                                    style={{ marginRight: 8 }}

                                />
                            }
                            title="Search"
                            buttonStyle={{ alignSelf: 'center', width: 150 }}
                            onPress={advanceBookingResults}
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

                {showEnd && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={dateEnd}
                        mode={modeEnd}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeEnd}
                        minimumDate={date}
                    />
                )}
                {showSingle && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={dateSingle}
                        mode={modeSingle}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeSingle}
                        minimumDate={date}
                    />
                )}
                {isLoading ? null : (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: '#1896c5', fontSize: 16 }}>Please select date fields to load bookings.</Text>
                        <Text style={{ color: '#1896c5', fontSize: 16 }}>Please select date fields to load bookings.</Text>
                        <Text style={{ color: '#1896c5', fontSize: 16 }}>Please select date fields to load bookings.</Text>
                        <Text style={{ color: '#1896c5', fontSize: 16 }}>Please select date fields to load bookings.</Text>
                        <Text style={{ color: '#1896c5', fontSize: 16 }}>Please select date fields to load bookings.</Text>
                        <Text style={{ color: '#1896c5', fontSize: 16 }}>Please select date fields to load bookings.</Text>
                        <Text style={{ color: '#1896c5', fontSize: 16 }}>Please select date fields to load bookings.</Text>
                        <Text style={{ color: '#1896c5', fontSize: 16 }}>Please select date fields to load bookings.</Text>
                        <Text style={{ color: '#1896c5', fontSize: 16 }}>Please select date fields to load bookings.</Text>
                        <Text style={{ color: '#1896c5', fontSize: 16 }}>Please select date fields to load bookings.</Text>
                        <Text style={{ color: '#1896c5', fontSize: 16 }}>Please select date fields to load bookings.</Text>
                        <Text style={{ color: '#1896c5', fontSize: 16 }}>Please select date fields to load bookings.</Text>
                        <Text style={{ color: '#1896c5', fontSize: 16 }}>Please select date fields to load bookings.</Text>
                        <Text style={{ color: '#1896c5', fontSize: 16 }}>Please select date fields to load bookings.</Text>
                        <Text style={{ color: '#1896c5', fontSize: 16 }}>Please select date fields to load bookings.</Text>
                        <Text style={{ color: '#1896c5', fontSize: 16 }}>Please select date fields to load bookings.</Text>
                        <Text style={{ color: '#1896c5', fontSize: 16 }}>Please select date fields to load bookings.</Text>
                        <Text style={{ color: '#1896c5', fontSize: 16 }}>Please select date fields to load bookings.</Text>
                        <Text style={{ color: '#1896c5', fontSize: 16 }}>Please select date fields to load bookings.</Text>
                        <Text style={{ color: '#1896c5', fontSize: 16 }}>Please select date fields to load bookings.</Text>
                        <Text style={{ color: '#1896c5', fontSize: 16 }}>Please select date fields to load bookings.</Text>
                        <Text style={{ color: '#1896c5', fontSize: 16 }}>Please select date fields to load bookings.</Text>
                        <Text style={{ color: '#1896c5', fontSize: 16 }}>Please select date fields to load bookings.</Text>
                        <Text style={{ color: '#1896c5', fontSize: 16 }}>Please select date fields to load bookings.</Text>

                    </View>
                )}
                {isLoading ? (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            source={require('../../../assets/loading_gif.gif')}
                        /></View>

                ) : (
                    isSearchedBookings ? (
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
                        ))
                )}

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
                                    });
                                    setsessionListVisible(!sessionListVisible);
                                }}
                            >
                                <ListItem.Content>
                                    <ListItem.Title>{session.id}</ListItem.Title>
                                    <ListItem.Subtitle>{session.day}</ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                        ))


                    )}
                </Overlay>

                {/* <Button
                // icon={<Icon name="restore-page" size={15} color="white" />}
                title="Submit"
                buttonStyle={styles.footerButton}
                titleStyle={{ textTransform: 'uppercase' }}
                disabled
            /> */}
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    bottomSheet: {
        backgroundColor: '#f5f6f7',
        paddingTop: 10,
        paddingBottom: 5,
        paddingHorizontal: 20
    },

    calenderMainView: {
        display: 'flex',
        flexDirection: 'row'
    },
    calenderSingleView: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        paddingHorizontal: 10,
        marginBottom: 20
    },
    iconDate: {
        display: 'flex',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#a7c8d4',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 5
    },
    selectText: {
        marginLeft: 5,
        color: '#9e9e9e'
    },
    dateHeading: {
        marginVertical: 10,
        color: '#686868'
    },
    radioButtonArea: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f5f6f7',
        marginBottom: 2
    },
    footerButton: {
        backgroundColor: '#1896c5',
        height: 55,

    },
    selectedBookingList: {
        marginVertical: 10

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
    overLayStyles: {
        minWidth: windowWidth - 50,
        maxHeight: windowHeight - 100,
        height: 'auto'
    },
    heading: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        backgroundColor: "#1896c5",
        padding: 10,
        borderRadius: 4
    }
})