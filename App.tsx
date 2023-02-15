import React, { useState } from "react";

import {
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import { StyleSheet, SafeAreaView, useWindowDimensions } from "react-native";
import DraggableFlatList, { RenderItem } from "react-native-draggable-flatlist";

import { Item, ItemObject } from "./Item";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { ROUTE } from "./constant";
import { TopHeader } from "./TopHeader";
import { useStore } from "./storage";

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

const Backlog = () => {
  const [backlog, add, setBacklog] = useStore((state) => [
    state.doing,
    state.add,
    state.setBacklog,
  ]);
  // const [data, setData] = useState(initialData);

  const data = backlog.map((task, index) => {
    return {
      key: `item-${index}`,
      label: task.name,
      height: 100,
      width: 60 + Math.random() * 40,
    };
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopHeader />
      <DraggableFlatList
        data={data}
        // style={{ flex: 1 }}
        onDragEnd={({ data }) =>
          setBacklog(
            data.map((value) => {
              return {
                name: value.label,
              };
            })
          )
        }
        keyExtractor={(item) => item.key}
        renderItem={Item}
      />
    </SafeAreaView>
  );
};

const Stack = createNativeStackNavigator();
export default function App() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
  ]);

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: "white",
        },
      }}
    >
      <Stack.Navigator
        initialRouteName={ROUTE.Backlog}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={ROUTE.Backlog} component={Backlog} />
        <Stack.Screen name={ROUTE.Doing} component={Backlog} />
        <Stack.Screen name={ROUTE.Done} component={Backlog} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
