import { Text } from "@/components/typography";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPollDetails } from "@/database";
import Loader from "@/components/Loader";
import { useLocalSearchParams } from "expo-router";

const PollDetails = () => {
  const { pollId } = useLocalSearchParams<{ pollId: string }>();
  const {
    data: poll,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["poll", pollId],
    queryFn: () => getPollDetails(Number(pollId)),
  });

  if (isLoading) return <Loader />;
  if (error) return <Text>Error fetching poll details</Text>;

  if (!poll) return null; // This should never happen due to the type guard, but TypeScript needs it

  return <Text>{poll.title}</Text>;
};

export default PollDetails;
