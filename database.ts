import { getRandomItem } from "./utils/array";
import { faker } from "@faker-js/faker";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const delay = 1000;

// TODO: add some extra prepopulated keys like "createdAt"

// TYPES
export type User = {
  id: string; // prepopulated integer
  name: string;
  avatar: string;
  email: string;
  subtitle: string;
};

export type Poll = {
  id: number; // prepopulated integer
  title: string;
  ownerId: string; // foreign key of user
  avatar: string;
  open: boolean;
};

export type UserPoll = {
  userId: string; // foreign key of user
  pollId: number; // foreign key of poll
};

export type Friendship = {
  userId: string; // foreign key of user
  friendId: string; // foreign key of user
};

// MOCKS
const createMockUsers = (count: number): User[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
    email: faker.internet.email(),
    subtitle: faker.lorem.sentence(),
    verified: faker.datatype.boolean(),
  }));
};

const createMockPolls = (count: number): Poll[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    title: faker.lorem.sentence(),
    ownerId: getRandomItem(users).id,
    avatar: faker.image.avatar(),
    open: faker.datatype.boolean(),
  }));
};

const createMockUserPolls = (count: number): UserPoll[] => {
  return Array.from({ length: count }, () => ({
    userId: getRandomItem(users).id,
    pollId: getRandomItem(polls).id,
  }));
};

const createMockFriendships = (count: number): Friendship[] => {
  return Array.from({ length: count }, () => ({
    userId: getRandomItem(users).id,
    friendId: getRandomItem(users).id,
  }));
};

const users: User[] = [
  ...createMockUsers(200),
  {
    id: "4la4vb2HikWZLPoSHyiGm9XKQSq2",
    name: "Franco May",
    avatar: faker.image.avatar(),
    email: "francomay3@gmail.com",
    subtitle: "I love to code and build things.",
  },
];
const polls: Poll[] = createMockPolls(25);
const userPolls: UserPoll[] = createMockUserPolls(600);
const friendships: Friendship[] = createMockFriendships(2000);

// FUNCTIONS CREATE
export const createPoll = async (
  _uid: string,
  _title: string,
  _avatar: string
): Promise<void> => {
  await wait(delay);
  return;
};

// FUNCTIONS READ
export const getPollDetails = async (id: number): Promise<Poll | null> => {
  await wait(delay);
  return polls.find((poll) => poll.id === id) || null;
};

export const getUserFriends = async (userId: string): Promise<User[]> => {
  await wait(delay);
  const friendIds = friendships
    .filter((friendship) => friendship.userId === userId)
    .map((friendship) => friendship.friendId);
  return users.filter((user) => friendIds.includes(user.id));
};

export const getUserPolls = async (userId: string): Promise<Poll[] | null> => {
  await wait(delay);
  const userPollIds = userPolls
    .filter((poll) => poll.userId === userId)
    .map((userPoll) => userPoll.pollId);
  return polls.filter((poll) => userPollIds.includes(poll.id));
};

export const getUser = async (uid: string): Promise<User | null> => {
  await wait(delay);
  return users.find((user) => user.id === uid) || null;
};

// FUNCTIONS UPDATE
export const updateProfile = async (
  _uid: string,
  _name: string,
  _subtitle: string,
  _avatar: string
): Promise<void> => {
  await wait(delay);
  return;
};

// FUNCTIONS DELETE
