import React, { useCallback, useMemo } from "react";
import { View, SafeAreaView, Text, Pressable } from "react-native";
import { TIMES, Time } from "../constant";
import { useStore } from "../storage";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NavigationProps, RootStackParamList } from "../navigation/router";
import { Ionicons, Feather, FontAwesome5 } from "@expo/vector-icons";
import TimeCard from "../components/TimeCard";

type ProfileScreenRouteType = RouteProp<RootStackParamList, "SelectTime">;

const SelectTime = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<ProfileScreenRouteType>();

  const { id, name } = route.params;

  const [backlogToDoing] = useStore((state) => [state.doingToBacklog]);

  const onSelectTimeHandler = useCallback(
    (item: Time) => {
      backlogToDoing({ id, name, dueTime: item.title });
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
