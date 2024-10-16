import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { Container } from "./layout";

const Loader = () => {
  return (
    <Container center>
      <ActivityIndicator animating={true} />
    </Container>
  );
};

export default Loader;
