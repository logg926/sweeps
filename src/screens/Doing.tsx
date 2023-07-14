import { SafeAreaView, View } from "react-native";
import { TopHeader } from "../components/TopHeader";
import { NestableScrollContainer } from "react-native-draggable-flatlist";
import { useStore } from "../storage";
import ToDoList from "../components/list/ToDoList";
import Icon from "react-native-vector-icons/Ionicons";
import CustomModal from "../components/modal/CustomModal";
import { useEffect, useMemo, useState } from "react";
import AddToDoScreen from "./AddToDo";
import { isDateInPast } from "../helpers/dateHelpers";

const DoingScreen = () => {
  const [doing, setDoing, backlog, backlogToDoing] = useStore((state) => [
    state.doing,
    state.setDoing,
    state.backlog,
    state.backlogToDoing,
  ]);
  const [addToDoModalVisible, setAddToDoModalVisible] = useState(false);

  const addTaskModalBody = useMemo(() => {
    return <AddToDoScreen />;
  }, []);

  useEffect(() => {
    backlog.forEach((task, index) => {
      task.dueTime && console.log(isDateInPast(task.dueTime));
      if (task.dueTime && isDateInPast(task.dueTime)) {
        backlogToDoing(task);
      }
    });
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
