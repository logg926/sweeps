import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import { RenderItem, ScaleDecorator } from "react-native-draggable-flatlist";
import Icon from "react-native-vector-icons/Ionicons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";
import { RED } from "./constant";

export type ItemObject = {
  key: string;
  label: string;
  height: number;
  width: number;
};

export const Item: RenderItem<ItemObject> = ({ item, drag, isActive }) => {
  return (
    <ScaleDecorator>
      <Swipeable
        renderLeftActions={(
          _progress: Animated.AnimatedInterpolation<number>,
          dragX: Animated.AnimatedInterpolation<number>
        ) => {
          const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [-20, 0, 0, 1],
            extrapolate: "clamp",
          });
          return (
            <RectButton
              style={{
                flex: 1,
                backgroundColor: RED,
                justifyContent: "center",
              }}
              // onPress={this.close}
            >
              <Animated.Text
                style={[
                  {
                    color: "white",
                    fontSize: 16,
                    backgroundColor: "transparent",
                    padding: 10,
                  },
                  {
                    transform: [{ translateX: trans }],
                  },
                ]}
              >
                Archive
              </Animated.Text>
            </RectButton>
          );
        }}
      >
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
              <Icon name="ellipse" color={RED} size={20} />
            </View>
            <Text style={styles.text}>{item.label}</Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
    </ScaleDecorator>
  );
};
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
