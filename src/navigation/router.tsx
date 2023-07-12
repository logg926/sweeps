import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ROUTE } from "../constant";
import BacklogScreen from "../screens/BackLog";
import DoingScreen from "../screens/Doing";
import DoneScreen from "../screens/Done";
import AddToDoScreen from "../screens/AddToDo";
import SelectTime from "../screens/SelectTime";

const Stack = createNativeStackNavigator();

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
        {/* <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen name={ROUTE.AddTodo} component={AddToDoScreen} />
        </Stack.Group> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
