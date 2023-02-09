import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import DraggableFlatList, {
  RenderItem,
  ScaleDecorator,
} from "react-native-draggable-flatlist";

import Icon from "react-native-vector-icons/Ionicons";
const NUM_ITEMS = 10;
function getColor(i: number) {
  const multiplier = 255 / (NUM_ITEMS - 1);
  const colorVal = i * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}

type Item = {
  key: string;
  label: string;
  height: number;
  width: number;
};

const initialData: Item[] = [...Array(NUM_ITEMS)].map((d, index) => {
  const backgroundColor = getColor(index);
  return {
    key: `item-${index}`,
    label: String(index) + "",
    height: 100,
    width: 60 + Math.random() * 40,
  };
});

export default function App() {
  const [data, setData] = useState(initialData);

  const renderItem: RenderItem<Item> = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={[styles.rowItem, { backgroundColor: "white" }]}
        >
          <View
            style={{
              paddingLeft: 18,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon name="ellipse" color="#ec6337" size={20} />
            <Text style={styles.text}>{item.label}</Text>
          </View>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <DraggableFlatList
      data={data}
      onDragEnd={({ data }) => setData(data)}
      keyExtractor={(item) => item.key}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  rowItem: {
    height: 67,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  text: {
    color: "black",
    fontSize: 16,
    textAlign: "left",
  },
});
