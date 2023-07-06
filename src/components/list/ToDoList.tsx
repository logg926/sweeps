import { NestableDraggableFlatList } from "react-native-draggable-flatlist";
import { Task, TaskArray } from "../../storage";
import { ToDoListItem } from "./ToDoListItem";

const ToDoList = ({
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
      renderItem={ToDoListItem}
    />
  );
};

export default ToDoList;
