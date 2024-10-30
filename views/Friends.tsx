import { Container, Row } from "@/components/layout";
import React from "react";
import { FAB, List } from "react-native-paper";
import useDisclosure from "@/hooks/useDisclosure";
import Modal from "@/components/Modal";
import InviteFriendForm from "@/components/form/InviteFriendForm";
import { useAuth } from "@/authentication";
import { ScrollView } from "react-native";
import { router } from "expo-router";
import AvatarPicker from "@/components/AvatarPicker";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/api";
import Loader from "@/components/Loader";
import { Text } from "@/components/typography";

const Friends = () => {
  // TODO: there should be a search icon in the header to search for friends.
  // TODO: there should be a button to remove friend
  // TODO: a route to view friend profile. it should display what polls the friend and you have in common.

  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const friends = user?.friendsTo ?? [];
  // TODO: handle case in which there are no friends. dont show the list, show a message and the FAB in the center.
  const hasFriends = friends.length > 0;

  const {
    data: friendsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: () => getUsers(friends.map((friend) => friend.friendId)),
    enabled: hasFriends,
  });

  if (isLoading) return <Loader />;
  if (error) return <Text>Error fetching friends</Text>;

  // TODO: handle case. I think it should never happen, but just in case.
  if (!friendsData) return null;

  return (
    <>
      <Modal visible={isOpen} onClose={onClose} title="Invite a Friend!">
        <InviteFriendForm />
      </Modal>
      <Container>
        <ScrollView style={{ flex: 1, width: "100%" }}>
          <List.Section title="Friends">
            {friendsData?.map((friend) => (
              <List.Item
                key={friend.id}
                title={friend.name}
                onPress={() => router.push(`/friends/${friend.id}`)}
                left={() => <AvatarPicker size={25} image={friend.avatar} />}
              />
            ))}
          </List.Section>
        </ScrollView>
        <Row w="100%" justify="flex-end">
          <FAB icon="plus" onPress={onOpen} label="Invite a Friend!" />
        </Row>
      </Container>
    </>
  );
};

export default Friends;
