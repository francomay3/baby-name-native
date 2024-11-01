import { Container } from "@/components/layout";
import Spinner from "@/components/Spinner";
import React from "react";

const LoadingScreen = () => {
  return (
    <Container center w="100%" h="100%" bg="surface">
      <Spinner />
    </Container>
  );
};

export default LoadingScreen;
