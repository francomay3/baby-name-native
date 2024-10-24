import { Container } from "@/components/layout";
import { Text } from "@/components/typography";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// TODO: Implement forgot password

const ForgotPassword = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container center>
        <Text>Forgot Password</Text>
      </Container>
    </SafeAreaView>
  );
};

export default ForgotPassword;
