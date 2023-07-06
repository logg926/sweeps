import { SafeAreaView, View } from "react-native";
import { TopHeader } from "../components/TopHeader";
import { NestableScrollContainer } from "react-native-draggable-flatlist";
import { useStore } from "../storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import ToDoList from "../components/list/ToDoList";
import { ROUTE } from "../constant";
import Icon from "react-native-vector-icons/Ionicons";

const DoingScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [doing, setDoing] = useStore((state) => [state.doing, state.setDoing]);
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
            navigation.navigate(ROUTE.AddTodo);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default DoingScreen;
