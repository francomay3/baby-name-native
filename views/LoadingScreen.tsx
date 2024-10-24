import { Container } from "@/components/layout";
import Loader from "@/components/Loader";
import React from "react";

const LoadingScreen = () => {
  return (
    <Container center w="100%" h="100%" bg="surface">
      <Loader />
    </Container>
  );
};

export default LoadingScreen;
