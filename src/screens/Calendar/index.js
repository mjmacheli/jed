import React, { useState, useCallback } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Agenda as CalendarView } from "react-native-calendars";
import { CalendarItems } from "./styles";
import _ from "lodash";
import { LinearGradient } from "expo-linear-gradient";

const Agenda = ({ navigation }) => {

  const [agendaItens, setAgendaItens] = useState({
    "2019-09-17": [
      {
        bookDescription:
          "Ex in pariatur aliqua cupidatat ut proident id in nisi ad aliqua sit sint.",
        bookingTitle: "Make-up w/ Daniela",
        color: "#f8c291",
        status: "cancelled",
      },
      {
        bookDescription:
          "Ex in pariatur aliqua cupidatat ut proident id in nisi ad aliqua sit sint.",
        bookingTitle: "Make-up w/ Bruna",
        color: "#82ccdd",
        status: "done",
      },
    ],
    "2019-09-19": [
      {
        bookDescription:
          "Ex in pariatur aliqua cupidatat ut proident id in nisi ad aliqua sit sint.",
        bookingTitle: "Make-up w/ Esperança",
        color: "#fad390",
        status: "cancelled",
      },
    ],
    "2019-09-20": [
      {
        bookDescription:
          "Ex in pariatur aliqua cupidatat ut proident id in nisi ad aliqua sit sint.",
        bookingTitle: "Make-up w/ Esperança",
        color: "#b8e994",
        status: "cancelled",
      },
    ],
    // https://flatuicolors.com/palette/fr
  });

  const renderItem = useCallback(
  () => (item) => (
    <TouchableOpacity
        onPress={() => onPress}
        style={{
          marginRight: 13,
          borderRadius: 0,
          height: 90,
          marginVertical: 10,
        }}
      >
        <LinearGradient
          colors={["#54B8C1", "#2A828E"]}
          style={{
            flex: 1,
            padding: 15,
            borderRadius: 16,
            width: "100%",
          }}
        >
          <View style={{ flex: 1, width: "100%" }}>
            <Text
              numberOfLines={2}
              style={{ color: 'red', marginBottom: 8 }}
            >
              College Football: LSU vs Auburn
            </Text>
            <Text numberOfLines={1} style={{ color: 'red' }}>
              9:30am - 10:00am @ 123 Guzo St. Houston, TX
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
  ),
  );

  const rowHasChanged = useCallback(() => (r1, r2) => r1.name !== r2.name, []);

  const renderEmptyDate = useCallback(() => () => <View />, []);

  const setEmptyKey = useCallback(
    () => (obj) => {
      if (!_.hasIn(agendaItens, `${obj.dateString}`)) {
        const clone = Object.assign({}, agendaItens, { [obj.dateString]: [] });
        setAgendaItens({ ...clone });
      }
    },
    []
  );

  return (
    <View style={{ flex: 1 }}>
      <CalendarView
        items={agendaItens}
        selected={"2019-09-17"}
        renderItem={renderItem()}
        renderEmptyDate={renderEmptyDate()}
        rowHasChanged={rowHasChanged()}
        onDayPress={setEmptyKey()}
        onDayChange={setEmptyKey()}
        theme={{
          calendarBackground: 'green',
          selectedDayBackgroundColor: 'yellow',
          dotColor: 'gray',
        }}
        style={{ backgroundColor: 'red' }}
      />

    
    </View>
  );
};

export default Agenda;