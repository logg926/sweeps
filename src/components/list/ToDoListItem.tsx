import React, { useCallback, useEffect, useState } from "react";
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
import { GREEN, RED, ROUTE, YELLOW } from "../../constant";
import { Task, useStore } from "../../storage";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NavigationProps, RootStackParamList } from "../../navigation/router";

export const ToDoListItem: RenderItem<Task> = ({ item, drag, isActive }) => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const [backlogToDoing, doingToDone, doneToDoing] = useStore((state) => [
    state.backlogToDoing,
    state.doingToDone,
    state.doneToDoing,
  ]);
  // const param = route.name === ROUTE.Backlog?{color: RED}

  const [hasSwiped, setHasSwiped] = useState<boolean>(false);

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
            setHasSwiped(true);
            navigation.navigate("SelectTime", item);
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

                if (hasSwiped) {
                  return null;
                }

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
                  inputRange: [-101, -100, -50, 0],
                  outputRange: [-1, 0, 0, 20],
                  extrapolate: "clamp",
                });

                if (hasSwiped) {
                  return null;
                }

                return (
                  <RectButton
                    style={{
                      flex: 1,
                      backgroundColor: swipeLeftColor,
                      justifyContent: "center",
                      alignItems: "flex-end",
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
            <Icon
              style={{
                paddingLeft: 18,
                paddingRight: 18,
              }}
              name="ellipse"
              color={color}
              size={20}
            />
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
