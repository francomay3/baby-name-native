import { getRandomItem } from "./utils/array";
import { faker } from "@faker-js/faker";

const faces = [
  require("@/assets/images/faces/1.png"),
  require("@/assets/images/faces/2.png"),
  require("@/assets/images/faces/3.png"),
  require("@/assets/images/faces/4.png"),
  require("@/assets/images/faces/5.png"),
  require("@/assets/images/faces/6.png"),
  require("@/assets/images/faces/7.png"),
  require("@/assets/images/faces/8.png"),
  require("@/assets/images/faces/9.png"),
  require("@/assets/images/faces/10.png"),
  require("@/assets/images/faces/11.png"),
  require("@/assets/images/faces/12.png"),
  require("@/assets/images/faces/13.png"),
  require("@/assets/images/faces/14.png"),
  require("@/assets/images/faces/15.png"),
  require("@/assets/images/faces/16.png"),
  require("@/assets/images/faces/17.png"),
  require("@/assets/images/faces/18.png"),
  require("@/assets/images/faces/19.png"),
  require("@/assets/images/faces/20.png"),
  require("@/assets/images/faces/21.png"),
  require("@/assets/images/faces/22.png"),
  require("@/assets/images/faces/23.png"),
  require("@/assets/images/faces/24.png"),
  require("@/assets/images/faces/25.png"),
  require("@/assets/images/faces/26.png"),
  require("@/assets/images/faces/27.png"),
  require("@/assets/images/faces/28.png"),
];

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const delay = 1000;

// TYPES
export type User = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  subtitle: string;
};

export type Poll = {
  id: number;
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
  return Array.from({ length: count }, (_, index) => ({
    userId: getRandomItem(users).id,
    pollId: getRandomItem(polls).id,
  }));
};

const createMockFriendships = (count: number): Friendship[] => {
  return Array.from({ length: count }, (_, index) => ({
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

// FUNCTIONS
export const getFriendDetails = async (id: string): Promise<User | null> => {
  await wait(delay);
  return users.find((user) => user.id === id) || null;
};

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

export const getCurrentUser = async (uid: string): Promise<User | null> => {
  await wait(delay);
  return users.find((user) => user.id === uid) || null;
};
