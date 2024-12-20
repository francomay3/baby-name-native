import { faker } from "@faker-js/faker";
import { Poll, Res, User, Users } from "../types";
import { POST, GET, PATCH, DELETE } from "./utils";

// *** DATABASE FUNCTIONS ***

// FUNCTIONS CREATE
export const createPoll = async (
  token: string,
  uid: string,
  title: string,
  avatar?: string
): Promise<void> => {
  await POST({
    endpoint: "create-poll",
    token,
    args: {
      title,
      uid,
      avatar: avatar || faker.image.avatar(),
    },
  });
};

export const createUser = async ({
  uid,
  name,
  avatar,
  email,
  subtitle,
}: {
  uid: string;
  name?: string;
  avatar?: string;
  email: string;
  subtitle?: string;
}): Promise<void> => {
  await POST({
    endpoint: "create-user",
    args: {
      uid,
      name: name || faker.person.fullName(),
      avatar: avatar || faker.image.avatar(),
      email,
      subtitle: subtitle || faker.person.bio(),
    },
  });
};

// FUNCTIONS READ
export const getPollDetails = async (token: string, pollId: number) => {
  return await GET<Poll>({
    endpoint: "get-poll-details",
    token,
    params: { pollId },
  });
};

type GetUser = (uid: string) => Res<User>;
export const getUser: GetUser = async (uid) => {
  return await GET<User>({
    endpoint: "get-user",
    params: { uid },
  });
};

type GetUsers = (token: string, uids: string[]) => Res<Users>;
export const getUsers: GetUsers = async (token, uids) => {
  return await GET<Users>({
    endpoint: "get-users",
    token,
    params: { uids },
  });
};

type SearchUsers = (token: string, query: string) => Res<Users>;
export const searchUsers: SearchUsers = async (token, query) => {
  if (!query)
    return { data: [], code: "EMPTY", ok: true, message: "", status: 200 };
  return await GET<Users>({
    endpoint: "search-users",
    token,
    params: { query },
  });
};

// FUNCTIONS UPDATE
export const updateProfile = async ({
  token,
  uid,
  name,
  subtitle,
  avatar,
}: {
  token: string;
  uid: string;
  name?: string;
  subtitle?: string;
  avatar?: string;
}): Promise<void> => {
  await PATCH({
    endpoint: "update-profile",
    token,
    args: { uid, name, subtitle, avatar },
  });
};

// FUNCTIONS DELETE
export const resetDatabase = async (token: string): Promise<void> => {
  await DELETE({
    endpoint: "reset-database",
    token,
    args: {},
  });
};

// *** OTHER FUNCTIONS ***

export const sendMessageToDeveloper = async (
  token: string,
  message: string
) => {
  // TODO: implement in the backend
  await POST({
    endpoint: "contact-developer",
    token,
    args: { message },
  });
};
