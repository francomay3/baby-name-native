import { Column, Container, Row } from "@/components/layout";
import { Text } from "@/components/typography";
import React, { useState } from "react";
import { Button, Card, Portal } from "react-native-paper";
import NewPollForm from "@/components/form/NewPollForm";
import Modal from "@/components/Modal";
import { Image } from "react-native";

type Poll = {
  id: string;
  title: string;
};

const polls: Poll[] = [
  { id: "1", title: "Natashas Baby!" },
  { id: "2", title: "el de cindy" },
  { id: "3", title: "mejor presidente" },
];

const Polls = () => {
  const [newPollModal, setNewPollModal] = useState(false);
  const closeNewPollModal = () => setNewPollModal(false);

  const handleNewPoll = () => {
    setNewPollModal(true);
  };

  const handlePollPress = (poll: Poll) => {
    console.log("poll selected");
  };

  return (
    <>
      <Modal
        visible={newPollModal}
        onClose={closeNewPollModal}
        title="New Poll"
      >
        <NewPollForm />
      </Modal>
      <Container align="center" gap="md">
        <Column align="stretch" gap="sm">
          {polls.map((poll) => (
            <Card key={poll.id} onPress={() => handlePollPress(poll)}>
              <Card.Content>
                <Row align="center" gap="md">
                  <Image source={require("@/assets/images/faces/1.png")} />
                  <Text>{poll.title}</Text>
                </Row>
              </Card.Content>
            </Card>
          ))}
        </Column>
        <Button mode="outlined" onPress={handleNewPoll} icon="plus">
          New Poll
        </Button>
      </Container>
    </>
  );
};

export default Polls;
