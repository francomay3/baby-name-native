import { faker } from "@faker-js/faker";
import { Res, User, Users } from "../types";
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
  return await GET({
    endpoint: "get-poll-details",
    token,
    params: { pollId },
  });
};

type GetUser = (uid: string) => Res<User>;
export const getUser: GetUser = async (uid) => {
  return await GET({
    endpoint: "get-user",
    params: { uid },
  });
};

type GetUsers = (token: string, uids: string[]) => Res<Users>;
export const getUsers: GetUsers = async (token, uids) => {
  return await GET({
    endpoint: "get-users",
    token,
    params: { uids },
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
  console.log(avatar);
  await PATCH({
    endpoint: "update-profile",
    token,
    args: { uid, name, subtitle, avatar },
  });
};

// FUNCTIONS DELETE
export const deleteUser = async (token: string, uid: string): Promise<void> => {
  await DELETE({
    endpoint: "delete-user",
    token,
    args: { uid },
  });
};

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
