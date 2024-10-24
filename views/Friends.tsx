import { Box, Container, Row } from "@/components/layout";
import { Text } from "@/components/typography";
import React from "react";
import { Avatar, FAB, List } from "react-native-paper";
import { Link } from "expo-router";
import { getUserFriends } from "@/database";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import useDisclosure from "@/hooks/useDisclosure";
import Modal from "@/components/Modal";
import InviteFriendForm from "@/components/form/InviteFriendForm";
import { useAuth } from "@/authentication";
import { ScrollView } from "react-native";

const Friends = () => {
  // TODO: there should be a search icon in the header to search for friends.
  // TODO: there should be a button to remove friend
  // TODO: a route to view friend profile. it should display what polls the friend and you have in common.

  const { hasAccess, user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(user?.uid);

  const {
    data: friends,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: () => user && getUserFriends(user?.uid),
    enabled: hasAccess,
  });

  if (isLoading) return <Loader />;
  if (error) return <Text>Error fetching friends</Text>;

  if (!friends) return null; // This should never happen due to the type guard, but TypeScript needs it

  return (
    <>
      <Modal visible={isOpen} onClose={onClose} title="Invite a Friend!">
        <InviteFriendForm />
      </Modal>
      <Container>
        <ScrollView style={{ flex: 1, width: "100%" }}>
          <List.Section title="Friends">
            {friends.map((friend) => (
              <Link key={friend.id} href={`/friends/${friend.id}`}>
                <List.Item
                  title={friend.name}
                  left={() => (
                    <Avatar.Image
                      size={25}
                      // @ts-ignore
                      source={friend.avatar}
                    />
                  )}
                />
              </Link>
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