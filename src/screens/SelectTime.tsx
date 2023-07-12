import React, { useCallback, useMemo } from "react";
import { View, SafeAreaView, Text } from "react-native";
import { TIMES, Time } from "../constant";
import { FlatList } from "react-native-gesture-handler";

const SelectTime = () => {
  const TimeCard = useCallback((item: Time, index: number) => {
    return (
      <View
        key={index}
        style={[
          {
            borderColor: "red",
            borderWidth: 1,
            width: "30%",
            height: "30%",
            justifyContent: "center", // Center the child elements vertically
            alignItems: "center", // Center the child elements horizontally
            marginHorizontal: index % 3 == 1 ? 10 : 0,
            marginVertical: Math.floor(index / 3) == 1 ? 10 : 0,
          },
        ]}
      >
        <Text style={[{ color: "white" }]}>{item.title}</Text>
      </View>
    );
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          width: "90%",
          height: "60%",
          backgroundColor: "black",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "center",
          borderRadius: 25,
          paddingVertical: 15,
          alignItems: "center",
        }}
      >
        {TIMES.map(TimeCard)}
      </View>
      <Text>Hold down to adjust time</Text>
    </SafeAreaView>
  );
};

export default SelectTime;
