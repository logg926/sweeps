import { SafeAreaView, TextInput, View } from "react-native";
import { TopHeader } from "../components/TopHeader";
import { NestableScrollContainer } from "react-native-draggable-flatlist";
import { useStore } from "../storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import ToDoList from "../components/list/ToDoList";
import Icon from "react-native-vector-icons/Ionicons";
import CustomModal from "../components/modal/CustomModal";
import { useMemo, useState } from "react";
import AddToDoScreen from "./AddToDo";

const DoingScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [doing, setDoing] = useStore((state) => [state.doing, state.setDoing]);
  const [addToDoModalVisible, setAddToDoModalVisible] = useState(false);

  const addTaskModalBody = useMemo(() => {
    return <AddToDoScreen />;
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopHeader />
      <NestableScrollContainer>
        <ToDoList taskList={doing} setList={setDoing} />
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
            setAddToDoModalVisible(true);
          }}
        />
      </View>
      <CustomModal
        body={addTaskModalBody}
        visible={addToDoModalVisible}
        onPress={() => {
          setAddToDoModalVisible(!addToDoModalVisible);
        }}
      />
    </SafeAreaView>
  );
};

export default DoingScreen;
