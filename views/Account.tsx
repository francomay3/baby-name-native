import { Column, Container, Divider, Row } from "@/components/layout";
import React from "react";
import { useAuth } from "@/providers/auth";
import { Text } from "@/components/typography";
import { FAB, List } from "react-native-paper";
import { Linking, Platform, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import Modal from "@/components/Modal";
import useDisclosure from "@/hooks/useDisclosure";
import EditProfileForm from "@/components/form/EditProfileForm";
import AvatarPicker from "@/components/AvatarPicker";
import ContactDeveloperForm from "@/components/form/ContactDeveloperForm";
import { updateProfile } from "@/api";
import { useMessage } from "@/providers/message";

const Li = ({
  title,
  icon,
  onPress,
}: {
  title: string;
  icon: string;
  onPress: () => void;
}) => {
  const theme = useTheme();

  return (
    <List.Item
      title={title}
      left={() => <List.Icon icon={icon} color={theme.colors.primary} />}
      onPress={onPress}
    />
  );
};

const Account = () => {
  const { user, signOut, refetch, token } = useAuth();
  const theme = useTheme();
  const { errorBoundary } = useMessage();
  const {
    isOpen: isEditProfileModalOpen,
    onOpen: onEditProfileModalOpen,
    onClose: onEditProfileModalClose,
  } = useDisclosure();

  const {
    isOpen: isContactDeveloperModalOpen,
    onOpen: onContactDeveloperModalOpen,
    onClose: onContactDeveloperModalClose,
  } = useDisclosure();

  const handleRateApp = async () => {
    const appId = Platform.select({
      // TODO: add the real ios and android app ids
      ios: "123456789",
      android: "com.yourcompany.yourapp",
    });

    await errorBoundary(async () => {
      const url = Platform.select({
        ios: `itms-apps://apps.apple.com/app/id${appId}?action=write-review`,
        android: `market://details?id=${appId}`,
      });
      if (!url) throw new Error("No URL found");

      const canOpen = await Linking.canOpenURL(url);

      if (!canOpen) throw new Error("Cannot open URL");

      await Linking.openURL(url);
    });
  };

  const handleDarkMode = () => {
    // TODO: implement
    console.log("Dark Mode");
  };

  const handleImageChange = async (image: string) => {
    await errorBoundary(async () => {
      await updateProfile({ token, uid: user!.id, avatar: image });
      refetch();
    });
  };

  const handleEditProfileSuccess = () => {
    onEditProfileModalClose();
    refetch();
  };

  return (
    <>
      <Container>
        <ScrollView style={{ flex: 1, width: "100%" }}>
          <List.Section>
            <Row
              w="100%"
              align="center"
              justify="space-between"
              pl="md"
              pr="md"
            >
              <Column gap="md">
                <Row justify="space-between" align="center" gap="md">
                  <AvatarPicker
                    size={70}
                    image={user?.avatar}
                    onImageChange={handleImageChange}
                  />
                  <Column gap="xs">
                    <Text variant="bodyMedium" bold>
                      {user?.name}
                    </Text>
                    <Text variant="bodySmall">{user?.email}</Text>
                  </Column>
                </Row>
                <Text italic align="center">
                  "{user?.subtitle}"
                </Text>
              </Column>
              <FAB
                variant="surface"
                icon="pencil"
                size="small"
                onPress={onEditProfileModalOpen}
              />
            </Row>
          </List.Section>
          <Divider margin="md" />
          <List.Section title="Preferences">
            <Li
              onPress={handleDarkMode}
              title="Dark Mode"
              icon="theme-light-dark"
            />
          </List.Section>
          <List.Section title="Feedback">
            <Li onPress={handleRateApp} title="Rate App" icon="star" />
            <Li
              onPress={onContactDeveloperModalOpen}
              title="Contact Developer"
              icon="email"
            />
          </List.Section>
          <Divider margin="md" />
          <List.Section>
            <List.Item
              title="Log out"
              left={() => (
                <List.Icon icon="logout" color={theme.colors.error} />
              )}
              titleStyle={{ color: theme.colors.error }}
              descriptionStyle={{ color: theme.colors.error }}
              onPress={signOut}
            />
          </List.Section>
        </ScrollView>
      </Container>
      <Modal
        visible={isEditProfileModalOpen}
        onClose={onEditProfileModalClose}
        title="Edit Profile"
      >
        <EditProfileForm onSuccess={handleEditProfileSuccess} />
      </Modal>
      <Modal
        visible={isContactDeveloperModalOpen}
        onClose={onContactDeveloperModalClose}
        title="Contact Developer"
      >
        <ContactDeveloperForm />
      </Modal>
    </>
  );
};

export default Account;
