import { Container, Row } from "@/components/layout";
import React from "react";
import { FAB, List } from "react-native-paper";
import NewPollForm from "@/components/form/NewPollForm";
import Modal from "@/components/Modal";
import { useQuery } from "@tanstack/react-query";
import { getUserPolls } from "@/database";
import Loader from "@/components/Loader";
import { Text } from "@/components/typography";
import useDisclosure from "@/hooks/useDisclosure";
import { Poll } from "@/database";
import { useAuth } from "@/authentication";
import { ScrollView } from "react-native";
import { router } from "expo-router";
import AvatarPicker from "@/components/AvatarPicker";

const PollItem = (poll: Poll) => {
  return (
    <List.Item
      title={poll.title}
      left={() => <AvatarPicker size={25} image={poll.avatar} />}
      onPress={() => router.push(`/polls/${poll.id}`)}
    />
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
    queryFn: () => getUserPolls(user?.id!),
    enabled: !!user,
  });

  if (isLoading) return <Loader />;
  if (error) return <Text>Error fetching polls</Text>;

  if (!polls) return null; // This should never happen due to the type guard, but TypeScript needs it

  const closedPolls = polls.filter((poll) => !poll.open);
  const openPolls = polls.filter((poll) => poll.open);
  const ownedPolls = openPolls.filter((poll) => poll.ownerId === user?.id);
  const contributingPolls = openPolls.filter(
    (poll) => poll.ownerId !== user?.id
  );

  // TODO: handle case in which there are no polls. dont show the list, show a message and the FAB in the center.
  const hasPolls = polls.length > 0 ?? null;
  const hasOwnedPolls = ownedPolls.length > 0 ?? null;
  const hasContributingPolls = contributingPolls.length > 0 ?? null;
  const hasClosedPolls = closedPolls.length > 0 ?? null;

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
      {hasClosedPolls && (
        <List.Section title="Closed Polls">
          {closedPolls.map((poll) => (
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
          <FAB icon="plus" onPress={onOpen} label="New Poll" />
        </Row>
      </Container>
    </>
  );
};

export default Polls;
