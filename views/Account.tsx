import { Column, Container, Divider, Row } from "@/components/layout";
import React from "react";
import { useAuth } from "@/authentication";
import { Text } from "@/components/typography";
import { Avatar, FAB, List } from "react-native-paper";
import { ScrollView } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTheme } from "react-native-paper";
import Modal from "@/components/Modal";
import useDisclosure from "@/hooks/useDisclosure";
import EditProfileForm from "@/components/form/EditProfileForm";

const Li = ({
  title,
  icon,
  onPress,
}: {
  title: string;
  icon: keyof typeof FontAwesome.glyphMap;
  onPress: () => void;
}) => {
  const theme = useTheme();

  return (
    <List.Item
      title={title}
      left={() => (
        <FontAwesome name={icon} size={20} color={theme.colors.primary} />
      )}
      onPress={onPress}
    />
  );
};

const Account = () => {
  const { user, signOut } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleRateApp = () => {
    // TODO: implement
    console.log("Rate App");
  };

  const handleContactDeveloper = () => {
    // TODO: implement
    console.log("Contact Support");
  };

  const handleDarkMode = () => {
    // TODO: implement
    console.log("Dark Mode");
  };

  return (
    <>
      <Modal visible={isOpen} onClose={onClose} title="Edit Profile">
        <EditProfileForm />
      </Modal>
      <Container>
        <ScrollView style={{ flex: 1, width: "100%" }}>
          <List.Section>
            <Row justify="space-between" align="center" pl="md" pr="md">
              <Avatar.Image size={70} source={{ uri: user?.avatar }} />
              <Column gap="xs">
                <Text variant="bodyMedium" bold>
                  {user?.name}
                </Text>
                <Text variant="bodySmall">{user?.email}</Text>
              </Column>
              <FAB icon="pencil" size="small" onPress={onOpen} />
            </Row>
          </List.Section>
          <Divider margin="md" />
          <List.Section title="Preferences">
            <Li onPress={handleDarkMode} title="Dark Mode" icon="moon-o" />
          </List.Section>
          <List.Section title="Feedback">
            <Li onPress={handleRateApp} title="Rate App" icon="star" />
            <Li
              onPress={handleContactDeveloper}
              title="Contact Developer"
              icon="envelope"
            />
          </List.Section>
          <Divider margin="md" />
          <List.Section>
            <Li onPress={signOut} title="Log out" icon="sign-out" />
          </List.Section>
        </ScrollView>
      </Container>
    </>
  );
};

export default Account;
