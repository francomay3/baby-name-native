import Match from "@/views/Match";
import React from "react";
import { useAuth } from "@/authentication";
import { Redirect } from "expo-router";

const match = () => {
  const { user } = useAuth();
  if (!user) {
    return <Redirect href="/login" />;
  }
  return <Match />;
};

export default match;
