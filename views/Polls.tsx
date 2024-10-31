import { Container, Row } from "@/components/layout";
import React from "react";
import { FAB, List } from "react-native-paper";
import NewPollForm from "@/components/form/NewPollForm";
import Modal from "@/components/Modal";
import { Text } from "@/components/typography";
import useDisclosure from "@/hooks/useDisclosure";
import { useAuth } from "@/authentication";
import { ScrollView } from "react-native";
import { router } from "expo-router";
import AvatarPicker from "@/components/AvatarPicker";
import { Poll } from "@/types";

const PollItem = (poll: Poll) => {
  // TODO: handle case in which poll is undefined. maybe just redirect to the polls page. or show a message with a button to go back.
  if (!poll) return null;

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
  const { user, refetch } = useAuth();

  const handleNewPollSuccess = () => {
    onClose();
    refetch();
  };

  const polls = user?.polls ?? [];

  const closedPolls = polls?.filter((poll) => !poll.open) ?? [];
  const openPolls = polls?.filter((poll) => poll.open) ?? [];
  const ownedPolls =
    openPolls?.filter((poll) => poll.ownerId === user?.id) ?? [];
  const contributingPolls =
    openPolls?.filter((poll) => poll.ownerId !== user?.id) ?? [];

  // TODO: handle case in which there are no polls. dont show the list, show a message and the FAB in the center.
  const hasPolls = polls?.length > 0 ?? null;
  const hasOwnedPolls = ownedPolls?.length > 0 ?? null;
  const hasContributingPolls = contributingPolls?.length > 0 ?? null;
  const hasClosedPolls = closedPolls?.length > 0 ?? null;

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
        <NewPollForm onSuccess={handleNewPollSuccess} />
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
