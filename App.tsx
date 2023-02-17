import React, { useEffect, useRef } from "react";

import {
  DefaultTheme,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
import {
  SafeAreaView,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
} from "react-native-draggable-flatlist";
import { Item } from "./Item";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { ROUTE, YELLOW } from "./constant";
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
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [doing, setDoing] = useStore((state) => [state.doing, state.setDoing]);
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
            navigation.navigate(ROUTE.AddTodo);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

// Add;
const AddTodo = () => {
  // add({ name: "task", id: uuidv4() });
  // navigation.push();
  useEffect(() => {
    input.current?.focus();
  });
  const [taskName, onChangeTaskName] = React.useState("");

  const input = useRef<TextInput>(null);
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon
          name="ellipse"
          style={{
            paddingLeft: 18,
            paddingRight: 18,
          }}
          color={YELLOW}
          size={20}
        />
        <TextInput
          style={{
            height: 40,
            // margin: 12,
            // padding: 10,
            flex: 1,
          }}
          ref={input}
          onChangeText={onChangeTaskName}
          value={taskName}
          placeholder="useless placeholder"
          keyboardType="default"
        />
      </View>
    </View>
  );
};

const Stack = createNativeStackNavigator();

// const RootStack = createStackNavigator();
export default function App() {
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
        <Stack.Group>
          <Stack.Screen name={ROUTE.Backlog} component={Backlog} />
          <Stack.Screen name={ROUTE.Doing} component={Doing} />
          {/* <Stack.Screen name={ROUTE.Add} component={Add} /> */}
          <Stack.Screen name={ROUTE.Done} component={Done} />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
          <Stack.Screen name={ROUTE.AddTodo} component={AddTodo} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
