import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Dimensions, Alert, Image } from "react-native";
import { ListItem, Avatar, Overlay, Button, Icon, SearchBar, CheckBox, FAB, Input } from "react-native-elements";
import DateTimePicker from '@react-native-community/datetimepicker';



export default function report({ navigation }) {


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

    const [dateField, setdateField] = useState('Select a date');
    const [dateFieldEnd, setdateFieldEnd] = useState('Select a date');

    const [bookingData, setbookingData] = useState([]);
    const [isLoading, setisLoading] = useState(false);

    /* Get data from the API*/

    // useEffect(() => {
    //     fetch(`https://agile-reef-01445.herokuapp.com/health-service/api/bookings?startDate=${date}&endDate=${dateEnd}`)
    //         .then((response) => response.json())
    //         .then((json) => setbookingData(json))
    //         .catch((error) => console.error(error))
    //         .finally(() => setLoading(false));
    //     console.log("+++++++++++++++++++++++++++++++++++++++++");
    //     console.log(bookingData);
    // }, []);

    /* End - Get data from the API*/

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


    return (
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


            {checkedValue === 'first' ? (
                <View style={styles.bottomSheet}>
                    <View style={styles.calenderMainView}>
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


                    </View>
                    <View style={styles.searchForm}>
                        <TouchableOpacity onPress={toggleOverlayDoc}>
                            <View style={styles.singleSearchRow}>
                                <Icon name='user-md' type='font-awesome' style={{ marginRight: 20 }} />
                                <Text style={styles.searchDetail}>Select a doctor</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleOverlaySes}>
                            <View style={styles.singleSearchRow}>
                                <Icon name='clock-o' type='font-awesome' style={{ marginRight: 20 }} />
                                <Text style={styles.searchDetail}>Select a session</Text>
                            </View>
                        </TouchableOpacity>
                        <View>
                            <Input
                                placeholder='Type reference number'
                                leftIcon={{ type: 'font-awesome', name: 'address-book' }}
                                inputContainerStyle={{ marginBottom: -24, marginTop: -10, borderBottomColor: '#ddd' }}
                                inputStyle={{ fontSize: 15 }}
                                leftIconContainerStyle={{ marginRight: 10 }}


                            />
                        </View>
                        <View>
                            <Input
                                placeholder='Type phone numner'
                                leftIcon={{ type: 'font-awesome', name: 'phone' }}
                                inputContainerStyle={{ borderBottomColor: '#ddd' }}
                                leftIconContainerStyle={{ marginRight: 10 }}
                                inputStyle={{ fontSize: 15 }}
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
                        />
                    </View>
                </View>
            ) : (
                <View style={styles.bottomSheet}>
                    <View style={styles.calenderMainView}>
                        <View style={styles.calenderSingleView}>
                            <Text style={styles.dateHeading}>Select a date</Text>
                            <TouchableOpacity onPress={showDatepickerSingle}>
                                <View style={styles.iconDate}>
                                    <Icon color="#1896c5" name='event' />
                                    <Text style={styles.selectText}>{dateSingle.toDateString()}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>)}

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
                </View>
            )}
            {isLoading ? (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        source={require('../../../assets/loading_gif.gif')}
                    /></View>

            ) : (
                <ScrollView style={{ paddingHorizontal: 20 }}>
                    <View style={styles.selectedBookingList}>
                        {bookingData.map((bookings, i) => (
                            <ListItem key={'bookings' + i} bottomDivider>
                                <ListItem.Content>
                                    <ListItem.Title>{bookings.patient}</ListItem.Title>
                                    <ListItem.Subtitle>{bookings.refNumber}</ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>

                        ))}
                    </View>
                </ScrollView>
            )}

            {/* Doctors Overlay */}
            <Overlay overlayStyle={styles.overLayStyles} isVisible={docListVisible} onBackdropPress={toggleOverlayDoc}>
                <Text>Doc list</Text>
            </Overlay>

            {/* Sessions Overlay */}
            <Overlay overlayStyle={styles.overLayStyles} isVisible={sessionListVisible} onBackdropPress={toggleOverlaySes}>
                <Text>Session list</Text>
            </Overlay>

            <Button
                // icon={<Icon name="restore-page" size={15} color="white" />}
                title="Submit"
                buttonStyle={styles.footerButton}
                titleStyle={{ textTransform: 'uppercase' }}
                disabled
            />
        </View>
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
    }

})