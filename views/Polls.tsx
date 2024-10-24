import { Box, Container, Row } from "@/components/layout";
import React from "react";
import { Avatar, FAB, List } from "react-native-paper";
import NewPollForm from "@/components/form/NewPollForm";
import Modal from "@/components/Modal";
import { Link } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getUserPolls } from "@/database";
import Loader from "@/components/Loader";
import { Text } from "@/components/typography";
import useDisclosure from "@/hooks/useDisclosure";
import { Poll } from "@/database";
import { useAuth } from "@/authentication";
import { ScrollView } from "react-native";

const PollItem = (poll: Poll) => {
  return (
    <Link key={poll.id} href={`/polls/${poll.id}`}>
      <List.Item
        // TODO: handle case in which poll title is very long
        title={poll.title}
        left={() => (
          // @ts-ignore
          <Avatar.Image size={25} source={poll.avatar} />
        )}
      />
    </Link>
  );
};

const Polls = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();

  const {
    data: polls,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["polls"],
    queryFn: () => getUserPolls(user?.uid!),
    enabled: !!user,
  });

  const handleNewPoll = () => {
    onOpen();
  };

  if (isLoading) return <Loader />;
  if (error) return <Text>Error fetching polls</Text>;

  if (!polls) return null; // This should never happen due to the type guard, but TypeScript needs it

  const ownedPolls = polls.filter((poll) => poll.ownerId === user?.uid);
  const contributingPolls = polls.filter((poll) => poll.ownerId !== user?.uid);

  // TODO: handle case in which there are no polls. dont show the list, show a message and the FAB in the center.
  const hasPolls = polls.length > 0 ?? null;
  const hasOwnedPolls = ownedPolls.length > 0 ?? null;
  const hasContributingPolls = contributingPolls.length > 0 ?? null;

  const pollsList = (
    <ScrollView style={{ flex: 1, width: "100%" }}>
      {hasOwnedPolls && (
        <List.Section title="Polls you own">
          {ownedPolls.map((poll) => (
            <PollItem key={poll.id} {...poll} />
          ))}
        </List.Section>
      )}
      {hasContributingPolls && (
        <List.Section title="Polls you are contributing to">
          {contributingPolls.map((poll) => (
            <PollItem key={poll.id} {...poll} />
          ))}
        </List.Section>
      )}
    </ScrollView>
  );

  return (
    <>
      <Modal visible={isOpen} onClose={onClose} title="New Poll">
        <NewPollForm />
      </Modal>
      <Container gap="md">
        {hasPolls && pollsList}
        {!hasPolls && <Text>You dont have any polls yet!</Text>}
        <Row w="100%" justify={hasPolls ? "flex-end" : "center"}>
          <FAB icon="plus" onPress={handleNewPoll} label="New Poll" />
        </Row>
      </Container>
    </>
  );
};

export default Polls;
