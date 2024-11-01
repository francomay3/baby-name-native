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
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

const resizeImage = async (uri: string) => {
  const image = await manipulateAsync(
    uri,
    [{ resize: { width: 256, height: 256 } }],
    { compress: 0.7, format: SaveFormat.WEBP }
  );
  return image.uri;
};

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

  const pickImageHandler = (type: "camera" | "gallery") => async () => {
    onClose();
    const options = {
      allowsEditing: true,
      mediaTypes: MediaTypeOptions.Images,
      aspect: [1, 1] as [number, number],
      quality: 1,
    };
    let result;
    if (type === "camera") {
      result = await launchCameraAsync(options);
    } else {
      result = await launchImageLibraryAsync(options);
    }

    if (result.canceled) {
      return;
    }

    const uri = await resizeImage(result.assets[0].uri);
    onImageChange(uri);
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
          onPress={pickImageHandler("camera")}
          title="choose from camera"
          leadingIcon="camera"
        />
        <Menu.Item
          onPress={pickImageHandler("gallery")}
          title="choose from gallery"
          leadingIcon="image"
        />
      </Menu>
    </Box>
  );
};

export default AvatarPicker;
