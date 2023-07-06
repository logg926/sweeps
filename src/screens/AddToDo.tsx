import { useEffect, useRef, useState } from "react";
import { TextInput, View } from "react-native";
import { YELLOW } from "../constant";
import Icon from "react-native-vector-icons/Ionicons";

const AddToDoScreen = () => {
  // add({ name: "task", id: uuidv4() });
  // navigation.push();
  useEffect(() => {
    input.current?.focus();
  });
  const [taskName, onChangeTaskName] = useState("");

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

export default AddToDoScreen;
