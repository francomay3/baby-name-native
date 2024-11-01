import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { Container } from "./layout";

const Spinner = () => {
  return (
    <Container center w="100%" h="100%">
      <ActivityIndicator animating={true} />
    </Container>
  );
};

export default Spinner;
