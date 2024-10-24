import { getRandomItem } from "./utils/array";

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
};

export type Poll = {
  id: number;
  title: string;
  ownerId: string; // foreign key of user
  avatar: string;
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
const friends: User[] = [
  {
    id: "1aGZC7neMQfWe1MLKIZA8ldUFoA3",
    name: "Franco May",
    avatar: getRandomItem(faces),
  },
  { id: "2", name: "Jane Doe", avatar: getRandomItem(faces) },
  { id: "3", name: "John Smith", avatar: getRandomItem(faces) },
  { id: "4", name: "Jane Smith", avatar: getRandomItem(faces) },
  { id: "5", name: "peter parker", avatar: getRandomItem(faces) },
  { id: "6", name: "mary jane", avatar: getRandomItem(faces) },
  { id: "7", name: "Alice Johnson", avatar: getRandomItem(faces) },
  { id: "8", name: "Bob Williams", avatar: getRandomItem(faces) },
  { id: "9", name: "Carol Brown", avatar: getRandomItem(faces) },
  { id: "10", name: "David Lee", avatar: getRandomItem(faces) },
  { id: "11", name: "mohammad ali", avatar: getRandomItem(faces) },
  { id: "12", name: "Emma Thompson", avatar: getRandomItem(faces) },
  { id: "13", name: "Michael Chen", avatar: getRandomItem(faces) },
  { id: "14", name: "Sophia Rodriguez", avatar: getRandomItem(faces) },
  { id: "15", name: "Liam O'Connor", avatar: getRandomItem(faces) },
  { id: "16", name: "Olivia Patel", avatar: getRandomItem(faces) },
  { id: "17", name: "Noah Kim", avatar: getRandomItem(faces) },
  { id: "18", name: "Ava Nguyen", avatar: getRandomItem(faces) },
  { id: "19", name: "Ethan Müller", avatar: getRandomItem(faces) },
  { id: "20", name: "Isabella García", avatar: getRandomItem(faces) },
];

const friendships: Friendship[] = [
  { userId: "1aGZC7neMQfWe1MLKIZA8ldUFoA3", friendId: "2" },
  { userId: "1aGZC7neMQfWe1MLKIZA8ldUFoA3", friendId: "3" },
  { userId: "2", friendId: "1aGZC7neMQfWe1MLKIZA8ldUFoA3" },
  { userId: "2", friendId: "4" },
  { userId: "3", friendId: "1aGZC7neMQfWe1MLKIZA8ldUFoA3" },
  { userId: "3", friendId: "4" },
  { userId: "4", friendId: "1aGZC7neMQfWe1MLKIZA8ldUFoA3" },
  { userId: "4", friendId: "2" },
  { userId: "5", friendId: "6" },
  { userId: "5", friendId: "7" },
  { userId: "6", friendId: "5" },
  { userId: "6", friendId: "8" },
  { userId: "7", friendId: "5" },
  { userId: "7", friendId: "9" },
  { userId: "8", friendId: "6" },
  { userId: "8", friendId: "10" },
  { userId: "9", friendId: "7" },
  { userId: "9", friendId: "11" },
  { userId: "10", friendId: "8" },
  { userId: "10", friendId: "12" },
];

// prettier-ignore
const polls: Poll[] = [
  { id: 1, title: "Natashas Baby!", ownerId: "1aGZC7neMQfWe1MLKIZA8ldUFoA3", avatar: getRandomItem(faces) },
  { id: 2, title: "el de cindy", ownerId: "2", avatar: getRandomItem(faces) },
  { id: 3, title: "mejor presidente", ownerId: "3", avatar: getRandomItem(faces) },
  { id: 4, title: "Favorite Movie Night", ownerId: "4", avatar: getRandomItem(faces) },
  { id: 5, title: "Weekend Getaway Plans", ownerId: "5", avatar: getRandomItem(faces) },
  { id: 6, title: "Best Pizza Toppings", ownerId: "6", avatar: getRandomItem(faces) },
  { id: 7, title: "Book Club Selection", ownerId: "7", avatar: getRandomItem(faces) },
  { id: 8, title: "Office Party Theme", ownerId: "8", avatar: getRandomItem(faces) },
  { id: 9, title: "Charity Event Ideas", ownerId: "9", avatar: getRandomItem(faces) },
  { id: 10, title: "New Year's Resolutions", ownerId: "10", avatar: getRandomItem(faces) },
  { id: 11, title: "Fitness Challenge", ownerId: "11", avatar: getRandomItem(faces) },
  {id: 12,title: "Dream Vacation Destination",ownerId: "1aGZC7neMQfWe1MLKIZA8ldUFoA3",avatar: getRandomItem(faces)},
  { id: 13, title: "Favorite Superhero", ownerId: "2", avatar: getRandomItem(faces) },
  { id: 14, title: "Best Coffee Shop in Town", ownerId: "3", avatar: getRandomItem(faces) },
  { id: 15, title: "Next Tech Gadget to Buy", ownerId: "4", avatar: getRandomItem(faces) },
  { id: 16, title: "Ideal Pet for Apartment", ownerId: "5", avatar: getRandomItem(faces) },
  { id: 17, title: "Best Way to Relax", ownerId: "6", avatar: getRandomItem(faces) },
  { id: 18, title: "Favorite Board Game", ownerId: "7", avatar: getRandomItem(faces) },
  { id: 19, title: "Next Group Activity", ownerId: "8", avatar: getRandomItem(faces) },
  { id: 20, title: "Most Anticipated Movie", ownerId: "9", avatar: getRandomItem(faces) },
];

const userPolls: UserPoll[] = [
  { userId: "1aGZC7neMQfWe1MLKIZA8ldUFoA3", pollId: 1 },
  { userId: "2", pollId: 2 },
  { userId: "3", pollId: 3 },
  { userId: "4", pollId: 4 },
  { userId: "5", pollId: 5 },
  { userId: "6", pollId: 6 },
  { userId: "7", pollId: 7 },
  { userId: "8", pollId: 8 },
  { userId: "9", pollId: 9 },
  { userId: "10", pollId: 10 },
  { userId: "11", pollId: 11 },
  { userId: "1aGZC7neMQfWe1MLKIZA8ldUFoA3", pollId: 12 },
  { userId: "2", pollId: 13 },
  { userId: "3", pollId: 14 },
  { userId: "4", pollId: 15 },
  { userId: "5", pollId: 16 },
  { userId: "6", pollId: 17 },
  { userId: "7", pollId: 18 },
  { userId: "8", pollId: 19 },
  { userId: "9", pollId: 20 },
  { userId: "1aGZC7neMQfWe1MLKIZA8ldUFoA3", pollId: 2 },
  { userId: "2", pollId: 3 },
  { userId: "3", pollId: 4 },
  { userId: "4", pollId: 5 },
  { userId: "5", pollId: 6 },
  { userId: "6", pollId: 7 },
  { userId: "7", pollId: 8 },
  { userId: "8", pollId: 9 },
  { userId: "9", pollId: 10 },
  { userId: "10", pollId: 11 },
  { userId: "11", pollId: 12 },
  { userId: "1aGZC7neMQfWe1MLKIZA8ldUFoA3", pollId: 13 },
  { userId: "2", pollId: 14 },
  { userId: "3", pollId: 15 },
  { userId: "4", pollId: 16 },
  { userId: "5", pollId: 17 },
  { userId: "6", pollId: 18 },
  { userId: "7", pollId: 19 },
  { userId: "8", pollId: 20 },
  { userId: "9", pollId: 1 },
];

// FUNCTIONS
export const getFriends = async (): Promise<User[]> => {
  await wait(delay);
  return friends;
};

export const getFriendDetails = async (id: string): Promise<User | null> => {
  await wait(delay);
  return friends.find((friend) => friend.id === id) || null;
};

export const getPolls = async (): Promise<Poll[]> => {
  await wait(delay);
  return polls;
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
  return friends.filter((friend) => friendIds.includes(friend.id));
};

export const getUserPolls = async (userId: string): Promise<Poll[] | null> => {
  await wait(delay);
  const userPollIds = userPolls
    .filter((poll) => poll.userId === userId)
    .map((userPoll) => userPoll.pollId);
  return polls.filter((poll) => userPollIds.includes(poll.id));
};
