import React from "react";

import {
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import { SafeAreaView, useWindowDimensions, View } from "react-native";
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
} from "react-native-draggable-flatlist";
import { v4 as uuidv4 } from "uuid";
import { Item } from "./Item";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ROUTE } from "./constant";
import { TopHeader } from "./TopHeader";
import { Task, TaskArray, useStore } from "./storage";
import Icon from "react-native-vector-icons/Ionicons";

const TodoList = ({
  taskList,
  setList,
}: {
  taskList: Task[];
  setList: (taskArray: TaskArray) => void;
}) => {
  return (
    <NestableDraggableFlatList
      data={taskList}
      style={{
        height: "100%",
      }}
      onDragEnd={({ data }) =>
        setList(
          data.map((value) => {
            return {
              id: value.id,
              name: value.name,
            };
          })
        )
      }
      keyExtractor={(item) => item.id}
      renderItem={Item}
    />
  );
};

const Backlog = () => {
  const [backlog, setBacklog] = useStore((state) => [
    state.backlog,
    state.setBacklog,
  ]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopHeader />
      <NestableScrollContainer>
        <TodoList taskList={backlog} setList={setBacklog} />
      </NestableScrollContainer>
    </SafeAreaView>
  );
};
const Done = () => {
  const [done, setDone] = useStore((state) => [state.done, state.setDone]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopHeader />
      <NestableScrollContainer>
        <TodoList taskList={done} setList={setDone} />
      </NestableScrollContainer>
    </SafeAreaView>
  );
};

const Doing = () => {
  const [doing, add, setDoing] = useStore((state) => [
    state.doing,
    state.add,
    state.setDoing,
  ]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopHeader />
      <NestableScrollContainer>
        <TodoList taskList={doing} setList={setDoing} />
      </NestableScrollContainer>
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
          name="add-circle-outline"
          color={"black"}
          size={36}
          onPress={() => {
            add({ name: "task", id: uuidv4() });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const Stack = createNativeStackNavigator();
export default function App() {
  const layout = useWindowDimensions();

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
          animation: "fade",
          animationDuration: 100,
        }}
      >
        <Stack.Screen name={ROUTE.Backlog} component={Backlog} />
        <Stack.Screen name={ROUTE.Doing} component={Doing} />
        <Stack.Screen name={ROUTE.Done} component={Done} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
