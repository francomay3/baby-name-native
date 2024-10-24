import React from "react";
import { IconButton, Title } from "react-native-paper";
import { Modal as RNModal } from "react-native";
import { Container, Row } from "./layout";

const Modal = ({
  visible,
  onClose,
  title,
  children,
}: {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <RNModal
      visible={visible}
      onDismiss={onClose}
      onRequestClose={onClose}
      animationType="fade"
    >
      <Container w="100%" h="100%" p="md" align="stretch" bg="background">
        <Row align="center">
          <IconButton icon="arrow-left" onPress={onClose} />
          <Title>{title}</Title>
        </Row>
        {children}
      </Container>
    </RNModal>
  );
};

export default Modal;
