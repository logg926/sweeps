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

  let icon;

  switch (index) {
    case 0:
      icon = <Feather name="coffee" color="red" size={35} />;
      break;
    case 1:
      icon = <Feather name="moon" color="red" size={35} />;
      break;
    case 2:
      icon = <Feather name="sun" color="red" size={35} />;
      break;
    case 3:
      icon = <Feather name="file" color="red" size={35} />;
      break;
    case 4:
      icon = <Ionicons name="ios-wine-outline" size={35} color="red" />;
      break;
    case 5:
      icon = <FontAwesome5 name="dot-circle" size={35} color="red" />;
      break;
    case 6:
      icon = <Ionicons name="rainy-outline" size={35} color="red" />;
      break;
    case 7:
      icon = <Ionicons name="ios-location-outline" size={35} color="red" />;
      break;
    default:
      icon = <Feather name="calendar" size={35} color="red" />;
      break;
  }

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
