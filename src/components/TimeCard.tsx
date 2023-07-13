import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Text } from "react-native";
import { Time } from "../constant";
import { memo } from "react";

interface TimeCardProps {
  item: Time;
  index: number;
  onSelectTimeHandler: (item: Time) => void;
}

const TimeCard: React.FC<TimeCardProps> = ({
  index,
  item,
  onSelectTimeHandler,
}) => {
  const { title } = item;

  const icon =
    index == 0 ? (
      <Feather name="coffee" color="red" size={35} />
    ) : index == 1 ? (
      <Feather name="moon" color="red" size={35} />
    ) : index == 2 ? (
      <Feather name="sun" color="red" size={35} />
    ) : index == 3 ? (
      <Feather name="file" color="red" size={35} />
    ) : index == 4 ? (
      <Ionicons name="ios-wine-outline" size={35} color="red" />
    ) : index == 5 ? (
      <FontAwesome5 name="dot-circle" size={35} color="red" />
    ) : index == 6 ? (
      <Ionicons name="rainy-outline" size={35} color="red" />
    ) : index == 7 ? (
      <Ionicons name="ios-location-outline" size={35} color="red" />
    ) : (
      <Feather name="calendar" size={35} color="red" />
    );

  return (
    <TouchableOpacity
      onPress={() => onSelectTimeHandler(item)}
      key={index}
      style={[
        {
          width: "30%",
          height: "30%",
          justifyContent: "center", // Center the child elements vertically
          alignItems: "center", // Center the child elements horizontally
          marginHorizontal: index % 3 == 1 ? 10 : 0,
          marginVertical: Math.floor(index / 3) == 1 ? 10 : 0,
        },
      ]}
    >
      {icon}
      <Text style={[{ color: "white", marginTop: 10, fontStyle: "italic" }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(TimeCard);
