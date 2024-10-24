import { Text } from "@/components/typography";
import React from "react";
import { getFriendDetails } from "@/database";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import { useLocalSearchParams } from "expo-router";
import { getUserPolls } from "@/database";
import { useAuth } from "@/authentication";
import { Column, Container, Divider } from "@/components/layout";
import { Avatar, Button, IconButton, List } from "react-native-paper";
import { Pressable } from "react-native";

const FriendDetails = () => {
  const { friendId } = useLocalSearchParams<{ friendId: string }>();
  const { user } = useAuth();

  const {
    data: friendDetails,
    isLoading: friendDetailsLoading,
    error: friendDetailsError,
  } = useQuery({
    queryKey: ["friend", friendId],
    queryFn: () => getFriendDetails(friendId),
  });

  const {
    data: polls,
    isLoading: pollsLoading,
    error: pollsError,
  } = useQuery({
    queryKey: ["polls", user?.id],
    queryFn: () => getUserPolls(user?.id!),
  });

  const handleSendInvite = (pollId: number) => {
    // TODO: Send invite to friend. while the invite is pending, show a loader besides the send invite text.
    // after its successful, gray the text out and make it show "invite sent" instead
    console.log("send invite", pollId);
  };

  const loading = friendDetailsLoading || pollsLoading;
  const error = friendDetailsError || pollsError;

  if (loading) return <Loader />;
  if (error) return <Text>Error fetching friend details</Text>;

  if (!friendDetails || !polls) return null; // This should never happen due to the type guard, but TypeScript needs it

  const pollsWithFriend = polls.filter((poll) => poll.ownerId === friendId);
  // const ownedPolls = polls.filter((poll) => poll.ownerId === user?.id);
  const ownedPolls = polls;

  const hasPollsWithFriend = pollsWithFriend.length > 0;
  const hasOwnedPolls = ownedPolls.length > 0;

  const pollsWithFriendSection = hasPollsWithFriend ? (
    <List.Section title={`Polls with ${friendDetails.name}`}>
      {pollsWithFriend.map((poll) => (
        <List.Item title={poll.title} />
      ))}
    </List.Section>
  ) : (
    <Text>You haven't voted on any polls with {friendDetails.name}</Text>
  );

  const ownedPollsSection = hasOwnedPolls ? (
    <Column gap="sm" w="100%">
      <Text>
        Do you want to invite {friendDetails.name} to any of these polls you
        own?
      </Text>
      <List.Section style={{ width: "100%" }}>
        {ownedPolls.map((poll) => (
          <List.Item
            title={poll.title}
            style={{ alignItems: "center", paddingEnd: 0 }}
            left={() => (
              <Avatar.Image size={25} source={{ uri: poll.avatar }} />
            )}
            right={() => (
              <Pressable
                style={{ justifyContent: "center" }}
                onPress={() => handleSendInvite(poll.id)}
              >
                <Text pl="md" c="primary">
                  Send Invite
                </Text>
              </Pressable>
            )}
          />
        ))}
      </List.Section>
    </Column>
  ) : null;

  const sections = [pollsWithFriendSection, ownedPollsSection].reduce(
    (acc: React.ReactNode[], section) => {
      const isLast = acc.length === 0;
      const newElement = (
        <>
          {section}
          {isLast && <Divider margin="md" />}
        </>
      );
      return [...acc, newElement];
    },
    []
  );

  return (
    <Container gap="sm">
      <Column align="center" w="100%">
        <Avatar.Image size={90} source={{ uri: friendDetails.avatar }} />
        <Text variant="titleLarge" bold mt="sm">
          {friendDetails.name}
        </Text>
        <Text variant="bodyMedium" italic align="center">
          "{friendDetails.subtitle}"
        </Text>
      </Column>
      <Divider margin="md" />
      {sections}
    </Container>
  );
};

export default FriendDetails;
