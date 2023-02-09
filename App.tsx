import React, { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, SafeAreaView } from "react-native";
import DraggableFlatList, { RenderItem } from "react-native-draggable-flatlist";

import Icon from "react-native-vector-icons/Ionicons";
import { Item, ItemObject } from "./Item";

const initialData: ItemObject[] = ["To do 1", "Build this app"].map(
  (label, index) => {
    return {
      key: `item-${index}`,
      label: label,
      height: 100,
      width: 60 + Math.random() * 40,
    };
  }
);

export default function App() {
  const [data, setData] = useState(initialData);

  return (
    <NavigationContainer>
      <SafeAreaView>
        <Icon name="time-outline" color="black" size={36} />

        <Icon name="menu-outline" color="black" size={36} />

        <Icon name="checkmark-outline" color="black" size={36} />

        <Icon name="time" color="black" size={36} />

        <Icon name="menu" color="black" size={36} />
        <Icon name="checkmark-sharp" color="black" size={36} />
        <DraggableFlatList
          data={data}
          onDragEnd={({ data }) => setData(data)}
          keyExtractor={(item) => item.key}
          renderItem={Item}
        />
      </SafeAreaView>
    </NavigationContainer>
  );
}
