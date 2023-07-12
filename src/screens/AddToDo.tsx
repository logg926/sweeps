import { useEffect, useRef, useState, useCallback } from "react";
import { Pressable, TextInput, View, Text } from "react-native";
import { YELLOW } from "../constant";
import Icon from "react-native-vector-icons/Ionicons";
import { useStore } from "../storage";
import { v4 as uuidv4 } from "uuid";

const AddToDoScreen = () => {
  // add({ name: "task", id: uuidv4() });
  // navigation.push();

  const addTask = useStore((state) => state.add);

  const input = useRef<TextInput>(null);

  const [taskName, onChangeTaskName] = useState("");

  const onPressAddTaskHandler = useCallback(() => {
    addTask({
      id: uuidv4(),
      name: taskName,
    });
    input?.current?.clear();
  }, [addTask, taskName, uuidv4]);

  // useEffect(() => {
  //   input.current?.focus();
  // }, []);

  return (
    <Pressable
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        width: "80%",
        height: "80%",
        borderRadius: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <Icon
          name="ellipse"
          style={{
            paddingLeft: 18,
            paddingRight: 18,
          }}
          color={YELLOW}
          size={15}
        />
        <TextInput
          style={{
            height: 40,
            borderWidth: 1,
            paddingHorizontal: 10,
            flex: 1,
          }}
          ref={input}
          onChangeText={onChangeTaskName}
          value={taskName}
          placeholder="Task"
          keyboardType="default"
        />
      </View>
      <Pressable
        style={{
          position: "absolute",
          bottom: 20,
          padding: 10,
          borderWidth: 1,
        }}
        disabled={taskName == ""}
        onPress={onPressAddTaskHandler}
      >
        <Text>Add</Text>
      </Pressable>
    </Pressable>
  );
};

export default AddToDoScreen;
