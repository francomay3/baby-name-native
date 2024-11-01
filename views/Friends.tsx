import { Container } from "@/components/layout";
import React from "react";
import { List, Searchbar } from "react-native-paper";
import { useAuth } from "@/providers/auth";
import { ScrollView } from "react-native";
import { router } from "expo-router";
import AvatarPicker from "@/components/AvatarPicker";
import { useQuery } from "@tanstack/react-query";
import { getUsers, searchUsers } from "@/api";
import { Text } from "@/components/typography";
import Loading from "./Loading";
import useDebounce from "@/hooks/useDebounce";
import { Friend, User } from "@/types";

const bySearch = (search?: string) => (friend: User) => {
  if (!search) return true;
  const searchLower = search.toLowerCase();
  return (
    friend.name.toLowerCase().includes(searchLower) ||
    friend.email.toLowerCase().includes(searchLower)
  );
};

type PersonProps = { user: User } & Omit<
  React.ComponentProps<typeof List.Item>,
  "title"
>;
const Person = ({ user, ...rest }: PersonProps) => {
  return (
    <List.Item
      key={user.id}
      title={user.name}
      onPress={() => router.push(`/friends/${user.id}`)}
      left={() => <AvatarPicker size={25} image={user.avatar} />}
      {...rest}
    />
  );
};

type SectionProps = {
  users?: User[];
  title: string;
  filter?: string;
} & Omit<React.ComponentProps<typeof List.Section>, "children">;
const Section = ({ users, title, filter, ...rest }: SectionProps) => {
  if (!users?.length) return null;
  return (
    <List.Section title={title} {...rest}>
      {users.filter(bySearch(filter)).map((person) => (
        <Person user={person} key={person.id} />
      ))}
    </List.Section>
  );
};

const notFriend = (friendsTo: Friend[]) => (person: User) =>
  !friendsTo.map((friend) => friend.friendId).includes(person.id);

const Friends = () => {
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce(search);

  const { user, token } = useAuth();

  const friendsTo = user?.friendsTo ?? [];

  const {
    data: friendsQuery,
    isLoading: friendsIsLoading,
    error: friendsError,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: () =>
      getUsers(
        token,
        friendsTo.map((friend) => friend.friendId)
      ),
    enabled: !!friendsTo.length,
  });

  const { data: searchQuery, isLoading: searchIsLoading } = useQuery({
    queryKey: ["search", debouncedSearch],
    queryFn: () => searchUsers(token, debouncedSearch),
    enabled: !!search.length,
  });

  const friends = friendsQuery?.data;
  const searchedPeople = searchQuery?.data.filter(notFriend(friendsTo));

  if (friendsIsLoading) return <Loading />;
  if (friendsError) return <Text>Error fetching friends</Text>;

  return (
    <>
      <Container>
        <Searchbar
          style={{ width: "100%" }}
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
          loading={searchIsLoading}
        />
        <ScrollView style={{ flex: 1, width: "100%" }}>
          <Section users={friends} title="Friends" filter={search} />
          <Section users={searchedPeople} title="Search Results" />
        </ScrollView>
      </Container>
    </>
  );
};

export default Friends;
