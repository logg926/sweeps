import React from "react";

import {
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import { SafeAreaView, useWindowDimensions } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
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
    <DraggableFlatList
      data={taskList}
      // style={{ flex: 1 }}
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
  const [backlog, add, setBacklog] = useStore((state) => [
    state.backlog,
    state.add,
    state.setBacklog,
  ]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopHeader />
      <TodoList taskList={backlog} setList={setBacklog} />
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
      <TodoList taskList={doing} setList={setDoing} />

      <Icon
        name="add-circle-outline"
        color={"black"}
        size={36}
        onPress={() => {
          add({ name: "task", id: uuidv4() });
        }}
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
        <Stack.Screen name={ROUTE.Doing} component={Doing} />
        <Stack.Screen name={ROUTE.Done} component={Backlog} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
