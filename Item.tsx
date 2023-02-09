import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { RenderItem, ScaleDecorator } from "react-native-draggable-flatlist";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./App";
export type ItemObject = {
  key: string;
  label: string;
  height: number;
  width: number;
};

export const Item: RenderItem<ItemObject> = ({ item, drag, isActive }) => {
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
