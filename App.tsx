import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import DraggableFlatList, {
  RenderItem,
  ScaleDecorator,
} from "react-native-draggable-flatlist";

import Icon from "react-native-vector-icons/Ionicons";

type Item = {
  key: string;
  label: string;
  height: number;
  width: number;
};

const initialData: Item[] = ["To do 1", "Build this app"].map(
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
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                paddingLeft: 18,
                paddingRight: 18,
              }}
            >
              <Icon name="ellipse" color="#ec6337" size={20} />
            </View>
            <Text style={styles.text}>{item.label}</Text>
          </View>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
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
        renderItem={renderItem}
      />
    </SafeAreaView>
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
