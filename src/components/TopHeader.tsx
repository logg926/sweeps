import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { GREEN, RED, ROUTE, YELLOW } from "../constant";
import { useNavigation, useRoute } from "@react-navigation/native";

export function TopHeader() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();
  return (
    <View
      style={{
        paddingHorizontal: 60,
        paddingVertical: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
      }}
    >
      <Icon
        name="time-outline"
        color={route.name === ROUTE.Backlog ? RED : "black"}
        size={36}
        onPress={() => {
          navigation.navigate(ROUTE.Backlog);
        }}
      />

      <Icon
        name="menu-outline"
        color={route.name === ROUTE.Doing ? YELLOW : "black"}
        size={36}
        onPress={() => {
          navigation.navigate(ROUTE.Doing);
        }}
      />

      <Icon
        name="checkmark-outline"
        color={route.name === ROUTE.Done ? GREEN : "black"}
        size={36}
        onPress={() => {
          navigation.navigate(ROUTE.Done);
        }}
      />

      {/* <Icon name="time" color="black" size={36} />
      <Icon name="menu" color="black" size={36} />
      <Icon name="checkmark-sharp" color="black" size={36} /> */}
    </View>
  );
}
