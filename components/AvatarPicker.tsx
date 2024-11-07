import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  launchCameraAsync,
} from "expo-image-picker";
import { Menu, Avatar, FAB } from "react-native-paper";
import useDisclosure from "@/hooks/useDisclosure";
import { Box, BoxProps } from "./layout";
import { Platform, Pressable } from "react-native";
import { faker } from "@faker-js/faker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { EncodingType, readAsStringAsync } from "expo-file-system";

const resizeImage = async (uri: string) => {
  const image = await manipulateAsync(
    uri,
    [{ resize: { width: 256, height: 256 } }],
    { compress: 0.7, format: SaveFormat.JPEG, base64: true }
  );

  return Platform.OS === "web"
    ? image.uri
    : `data:image/jpeg;base64,${image.base64}`;
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
      quality: 0.7,
      base64: true,
    };

    const result =
      type === "camera"
        ? await launchCameraAsync(options)
        : await launchImageLibraryAsync(options);

    if (result.canceled) {
      return;
    }

    const base64 =
      Platform.OS === "web"
        ? result.assets![0].uri
        : `data:image/jpeg;base64,${await readAsStringAsync(
            result.assets![0].uri,
            {
              encoding: EncodingType.Base64,
            }
          )}`;

    const uri = await resizeImage(base64);
    onImageChange(uri!);
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
