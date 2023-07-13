import React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  RouteProp,
} from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { ROUTE } from "../constant";
import BacklogScreen from "../screens/BackLog";
import DoingScreen from "../screens/Doing";
import DoneScreen from "../screens/Done";
import SelectTime from "../screens/SelectTime";
import { Task } from "../storage";

export type RootStackParamList = {
  Backlog: undefined;
  Doing: undefined;
  AddToDo: undefined;
  SelectTime: Task;
  Done: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
export type RouteProps = RouteProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const Router = () => {
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
          gestureEnabled: false,
        }}
      >
        <Stack.Group>
          <Stack.Screen name={ROUTE.Backlog} component={BacklogScreen} />
          <Stack.Screen name={ROUTE.Doing} component={DoingScreen} />
          <Stack.Screen name={ROUTE.Done} component={DoneScreen} />
          <Stack.Screen name={ROUTE.SelectTime} component={SelectTime} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
