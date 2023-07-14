import React, { useCallback } from "react";
import { View, Text, Pressable } from "react-native";
import { TIMES, Time } from "../constant";
import { useStore } from "../storage";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NavigationProps, RootStackParamList } from "../navigation/router";
import TimeCard from "../components/TimeCard";
import { dateTitleToDateTime } from "../helpers/dateHelpers";

type ProfileScreenRouteType = RouteProp<RootStackParamList, "SelectTime">;

const SelectTime = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<ProfileScreenRouteType>();

  const { id, name } = route.params;

  const [backlogToDoing, backlog] = useStore((state) => [
    state.doingToBacklog,
    state.backlog,
  ]);

  const onSelectTimeHandler = useCallback(
    (item: Time) => {
      backlogToDoing({ id, name, dueTime: dateTitleToDateTime(item.title) });
      console.log(backlog);
      navigation.goBack();
    },
    [navigation, backlogToDoing]
  );

  return (
    <Pressable
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
      onPress={() => {
        navigation.reset({
          routes: [{ name: "Doing" }],
        });
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
        {TIMES.map((item, index) => (
          <TimeCard
            index={index}
            item={item}
            onSelectTimeHandler={onSelectTimeHandler}
            key={index}
          />
        ))}
      </View>
      <Text style={{ marginTop: 20 }}>Hold down to adjust time</Text>
    </Pressable>
  );
};

export default SelectTime;
