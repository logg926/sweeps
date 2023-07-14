import React, { ReactElement, memo } from "react";
import { Modal, Pressable } from "react-native";

interface CustomModalProps {
  animationType?: "none" | "slide" | "fade" | undefined;
  transparent?: boolean;
  visible: boolean;
  wrapPressable?: boolean;
  body: ReactElement;
  onPress?: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  body,
  visible,
  animationType = "fade",
  transparent = true,
  wrapPressable = true,
  onPress,
}) => {
  return (
    <Modal
      animationType={animationType}
      transparent={transparent}
      visible={visible}
    >
      {wrapPressable ? (
        <Pressable
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
          onPress={onPress}
        >
          {body}
        </Pressable>
      ) : (
        <>{body}</>
      )}
    </Modal>
  );
};

export default memo(CustomModal);
