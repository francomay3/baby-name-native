import { Text } from "@/components/typography";
import React from "react";
import { getFriendDetails } from "@/database";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import { useLocalSearchParams } from "expo-router";
import { getUserPolls } from "@/database";
import { useAuth } from "@/authentication";
const FriendDetails = () => {
  const { friendId } = useLocalSearchParams<{ friendId: string }>();
  const { user } = useAuth();

  const {
    data: friendDetails,
    isLoading: friendDetailsLoading,
    error: friendDetailsError,
  } = useQuery({
    queryKey: ["friend", friendId],
    queryFn: () => getFriendDetails(friendId),
  });

  const {
    data: polls,
    isLoading: pollsLoading,
    error: pollsError,
  } = useQuery({
    queryKey: ["polls", user?.uid],
    queryFn: () => user && getUserPolls(user?.uid),
  });

  const loading = friendDetailsLoading || pollsLoading;
  const error = friendDetailsError || pollsError;

  if (loading) return <Loader />;
  if (error) return <Text>Error fetching friend details</Text>;

  if (!friendDetails || !polls) return null; // This should never happen due to the type guard, but TypeScript needs it

  const pollsWithFriend = polls.filter((poll) => poll.ownerId === friendId);

  return <Text>{friendDetails.name}</Text>;
};

export default FriendDetails;
