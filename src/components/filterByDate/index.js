import React, { useState } from "react";
import { View, Platform, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Icon, Button } from "react-native-elements";


export const FilterByDate = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
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

  return (
    <View>
      <TouchableOpacity onPress={showDatepicker}>
        <View style={styles.singleRow} >
          <Text>Select a date</Text>
          <Icon name="event" color="#517fa4" />
        </View>
      </TouchableOpacity>
      <Button title="Apply Filter" type="clear" onPress={() => Alert.alert('Simple Button pressed')} />
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
  );
};

const styles = StyleSheet.create({
  singleRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    //alignItems: "center",
    padding: 15,
    backgroundColor:'#f0f0f0',
    borderRadius:5
  },
});
