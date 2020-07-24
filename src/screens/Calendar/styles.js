import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";


const Save = ({ onPress }) => {
  return (
    <>
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
    </>
  );
};

export default Save;