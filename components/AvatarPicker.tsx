import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  launchCameraAsync,
} from "expo-image-picker";
import { Menu, Avatar, FAB } from "react-native-paper";
import useDisclosure from "@/hooks/useDisclosure";
import { Box, BoxProps } from "./layout";
import { Pressable } from "react-native";
import { faker } from "@faker-js/faker";

const AvatarPicker = ({
  size,
  onImageChange,
  image = faker.image.avatar(),
  ...rest
}: {
  size: number;
  onImageChange?: (image: string) => void;
  image?: string;
  rest?: BoxProps;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const avatar = <Avatar.Image size={size} source={{ uri: image as string }} />;

  if (!onImageChange) {
    return <Box>{avatar}</Box>;
  }

  const pickImage = async () => {
    onClose();
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      onImageChange(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    onClose();
    const result = await launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      onImageChange(result.assets[0].uri);
    }
  };

  return (
    <Box {...rest} style={{ position: "relative" }}>
      <Menu
        visible={isOpen}
        onDismiss={onClose}
        mode="elevated"
        anchor={
          <Pressable onPress={onOpen}>
            {avatar}
            <FAB
              icon="pencil"
              customSize={size / 3}
              variant="surface"
              style={{
                position: "absolute",
                bottom: -(size / 20),
                right: -(size / 8),
              }}
            />
          </Pressable>
        }
      >
        <Menu.Item
          onPress={takePhoto}
          title="choose from camera"
          leadingIcon="camera"
        />
        <Menu.Item
          onPress={pickImage}
          title="choose from gallery"
          leadingIcon="image"
        />
      </Menu>
    </Box>
  );
};

export default AvatarPicker;
