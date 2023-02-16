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
import { GREEN, RED, ROUTE, YELLOW } from "./constant";
import { Task, useStore } from "./storage";
import { useRoute } from "@react-navigation/native";

export const Item: RenderItem<Task> = ({ item, drag, isActive }) => {
  const route = useRoute();
  const [backlogToDoing, doingToDone, doingToBacklog, doneToDoing] = useStore(
    (state) => [
      state.backlogToDoing,
      state.doingToDone,
      state.doingToBacklog,
      state.doneToDoing,
    ]
  );
  // const param = route.name === ROUTE.Backlog?{color: RED}

  const {
    color,
    swipeRightColor = undefined,
    swipeRightText = undefined,
    swipeLeftColor = undefined,
    swipeLeftText = undefined,
    onSwipe = undefined,
  } = route.name === ROUTE.Backlog
    ? {
        color: RED,
        swipeRightColor: YELLOW,
        swipeRightText: "Doing",
        onSwipe: (direction: string) => {
          //dunno why they swap left right
          if (direction === "left") {
            backlogToDoing(item);
          }
        },
      }
    : route.name === ROUTE.Doing
    ? {
        color: YELLOW,
        swipeRightColor: GREEN,
        swipeRightText: "Done",
        swipeLeftColor: RED,
        swipeLeftText: "To do",
        onSwipe: (direction: string) => {
          if (direction === "left") {
            doingToDone(item);
          } else {
            doingToBacklog(item);
          }
        },
      }
    : {
        color: GREEN,
        swipeLeftColor: YELLOW,
        swipeLeftText: "Doing",
        onSwipe: (direction: string) => {
          if (direction === "right") {
            doneToDoing(item);
          }
        },
      };

  return (
    <ScaleDecorator>
      <Swipeable
        onSwipeableOpen={onSwipe}
        renderLeftActions={
          !!swipeRightColor
            ? (
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
                      backgroundColor: swipeRightColor,
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
                      {swipeRightText}
                    </Animated.Text>
                  </RectButton>
                );
              }
            : undefined
        }
        renderRightActions={
          !!swipeLeftColor
            ? (
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
                      backgroundColor: swipeLeftColor,
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
                      {swipeLeftText}
                    </Animated.Text>
                  </RectButton>
                );
              }
            : undefined
        }
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
              <Icon name="ellipse" color={color} size={20} />
            </View>
            <Text style={styles.text}>{item.name}</Text>
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
