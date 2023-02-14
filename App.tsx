import React, { useState } from "react";

import {
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import {
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
  View,
} from "react-native";
import DraggableFlatList, { RenderItem } from "react-native-draggable-flatlist";

import Icon from "react-native-vector-icons/Ionicons";
import { Item, ItemObject } from "./Item";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { RED } from "./color";

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
  const [data, setData] = useState(initialData);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          paddingHorizontal: 60,
          paddingVertical: 10,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        <Icon
          name="time-outline"
          color={RED}
          size={36}
          onPress={() => {
            navigation.navigate("Backlog");
          }}
        />

        <Icon
          name="menu-outline"
          color="black"
          size={36}
          onPress={() => {
            navigation.navigate("Doing");
          }}
        />

        <Icon
          name="checkmark-outline"
          color="black"
          size={36}
          onPress={() => {
            navigation.navigate("Done");
          }}
        />
      </View>
      {/* <Icon name="time" color="black" size={36} />
      <Icon name="menu" color="black" size={36} />
      <Icon name="checkmark-sharp" color="black" size={36} /> */}
      <DraggableFlatList
        data={data}
        // style={{ flex: 1 }}
        onDragEnd={({ data }) => setData(data)}
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
        initialRouteName="Backlog"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Backlog" component={Backlog} />
        <Stack.Screen name="Doing" component={Backlog} />
        <Stack.Screen name="Done" component={Backlog} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
