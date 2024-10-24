import { Container, Row } from "@/components/layout";
import React from "react";
import { useAuth } from "@/authentication";
import { Bold, Text } from "@/components/typography";
import { router } from "expo-router";
import { Button } from "react-native-paper";

const UserInfo = ({ label, value }: { label: string; value: unknown }) => {
  if (value === undefined) return null;

  return (
    <Row>
      <Bold>{label}: </Bold>
      <Text>{JSON.stringify(value)}</Text>
    </Row>
  );
};

const Account = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/login");
  };

  return (
    <Container center>
      <UserInfo label="Email" value={user?.email} />
      <UserInfo label="Display Name" value={user?.displayName} />
      <UserInfo label="email verified" value={user?.emailVerified} />
      <UserInfo label="UID" value={user?.uid} />
      <Button mode="contained" onPress={handleSignOut}>
        Sign Out
      </Button>
    </Container>
  );
};

export default Account;
