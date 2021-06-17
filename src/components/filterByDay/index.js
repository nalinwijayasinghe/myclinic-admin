import React, { useState } from "react";
import { Text, View } from "react-native";
import { CheckBox, Button } from "react-native-elements";

const FilterByDay = () => {
  const [sunday, setSunday] = useState(false);
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  return (
    <View>
      <CheckBox
        title="Sunday"
        checked={sunday}
        onPress={() => {
          setSunday(!sunday);
        }}
      />
      <CheckBox
        title="Monday"
        checked={monday}
        onPress={() => {
          setMonday(!monday);
        }}
      />
      <CheckBox
        title="Tuesday"
        checked={tuesday}
        onPress={() => {
          setTuesday(!tuesday);
        }}
      />
      <CheckBox
        title="Wednesday"
        checked={wednesday}
        onPress={() => {
          setWednesday(!wednesday);
        }}
      />
      <CheckBox
        title="Thursday"
        checked={thursday}
        onPress={() => {
          setThursday(!thursday);
        }}
      />
      <CheckBox
        title="Friday"
        checked={friday}
        onPress={() => {
          setFriday(!friday);
        }}
      />
      <CheckBox
        title="Saturday"
        checked={saturday}
        onPress={() => {
          setSaturday(!saturday);
        }}
      />
      <Button title="Apply Filter" type="clear" />
    </View>
  );
};
export default FilterByDay;
