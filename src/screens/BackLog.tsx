import { SafeAreaView } from "react-native";
import { NestableScrollContainer } from "react-native-draggable-flatlist";
import ToDoList from "../components/list/ToDoList";
import { useStore } from "../storage";
import { TopHeader } from "../components/TopHeader";

const BacklogScreen = () => {
  const [backlog, setBacklog] = useStore((state) => [
    state.backlog,
    state.setBacklog,
  ]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopHeader />
      <NestableScrollContainer>
        <ToDoList taskList={backlog} setList={setBacklog} />
      </NestableScrollContainer>
    </SafeAreaView>
  );
};

export default BacklogScreen;
