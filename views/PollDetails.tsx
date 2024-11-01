import { Text } from "@/components/typography";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPollDetails } from "@/api";
import Loader from "@/components/Loader";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "@/authentication";

const PollDetails = () => {
  const { token } = useAuth();
  const { pollId } = useLocalSearchParams<{ pollId: string }>();
  const { data, isLoading, error } = useQuery({
    queryKey: ["poll", pollId],
    queryFn: () => getPollDetails(token, Number(pollId)),
  });

  const poll = data?.data;

  if (isLoading) return <Loader />;
  if (error) return <Text>Error fetching poll details</Text>;

  if (!poll) return null; // This should never happen due to the type guard, but TypeScript needs it

  return <Text>{poll.title}</Text>;
};

export default PollDetails;
