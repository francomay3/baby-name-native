import { Text } from "@/components/typography";
import React, { Fragment } from "react";
import { getUser } from "@/database";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "@/authentication";
import { Column, Container, Divider } from "@/components/layout";
import { List } from "react-native-paper";
import { Pressable } from "react-native";
import AvatarPicker from "@/components/AvatarPicker";

const FriendDetails = () => {
  const { friendId } = useLocalSearchParams<{ friendId: string }>();
  const { user, token } = useAuth();

  const {
    data: friendDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["friend", friendId],
    queryFn: () => getUser(token, friendId),
  });

  const handleSendInvite = (pollId: number) => {
    // TODO: Send invite to friend. while the invite is pending, show a loader besides the send invite text.
    // after its successful, gray the text out and make it show "invite sent" instead
    console.log("send invite", pollId);
  };

  if (isLoading) return <Loader />;
  if (error) return <Text>Error fetching friend details</Text>;
  // TODO: handle case. I think it should never happen, but just in case.
  if (!friendDetails) return null;
  const userPolls = user?.polls;
  const friendPolls = friendDetails?.polls;

  const pollsWithFriend =
    userPolls?.filter((poll) =>
      friendPolls?.some((friendPoll) => friendPoll.id === poll.id)
    ) ?? [];
  const ownedPolls =
    user?.polls.filter((poll) => poll.ownerId === user?.id) ?? [];

  const hasPollsWithFriend = pollsWithFriend.length > 0;
  const hasOwnedPolls = ownedPolls.length > 0;

  // TODO: this is getting kinda messy. abstract this out into a component and refactor
  const pollsWithFriendSection = hasPollsWithFriend ? (
    <List.Section title={`Polls with ${friendDetails.name}`}>
      {pollsWithFriend.map((poll) => (
        <List.Item key={poll.id} title={poll.title} />
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
            key={poll.id}
            title={poll.title}
            style={{ alignItems: "center", paddingEnd: 0 }}
            left={() => <AvatarPicker size={25} image={poll.avatar} />}
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
    (acc: React.ReactNode[], section, i) => {
      const isLast = acc.length === 0;
      const newElement = (
        <Fragment key={i}>
          {section}
          {isLast && <Divider margin="md" />}
        </Fragment>
      );
      return [...acc, newElement];
    },
    []
  );

  return (
    <Container gap="sm">
      <Column align="center" w="100%">
        <AvatarPicker size={90} image={friendDetails.avatar} />
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
