import { SafeAreaView } from "react-native";
import { TopHeader } from "../components/TopHeader";
import { NestableScrollContainer } from "react-native-draggable-flatlist";
import ToDoList from "../components/list/ToDoList";
import { useStore } from "../storage";

const DoneScreen = () => {
  const [done, setDone] = useStore((state) => [state.done, state.setDone]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopHeader />
      <NestableScrollContainer>
        <ToDoList taskList={done} setList={setDone} />
      </NestableScrollContainer>
    </SafeAreaView>
  );
};

export default DoneScreen;
