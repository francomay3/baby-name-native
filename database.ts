import { faker } from "@faker-js/faker";

// HELPER FUNCTIONS
// TODO: not all functions should be post. refactor this...
export const POST = async (
  endpoint: string,
  token: string | null,
  args?: Record<string, any>
) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${backendUrl}/${endpoint}`, {
    method: "POST",
    headers,
    body: args ? JSON.stringify(args) : undefined,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// FUNCTIONS CREATE
export const createPoll = async (
  token: string,
  uid: string,
  title: string,
  avatar?: string
): Promise<void> => {
  await POST("create-poll", token, {
    title,
    id: uid,
    avatar: avatar || faker.image.avatar(),
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
  await POST("create-user", null, {
    uid,
    name: name || faker.person.fullName(),
    avatar: avatar || faker.image.avatar(),
    email,
    subtitle: subtitle || faker.person.bio(),
  });
};

// FUNCTIONS READ
export const getPollDetails = async (token: string, pollId: number) => {
  return await POST("get-poll-details", token, { pollId });
};

export const getUser = async (uid: string) => {
  return await POST("get-user", null, { uid });
};
// TODO: fix this
export type User = any;

export const getUsers = async (token: string, uids: string[]) => {
  return await POST("get-users", token, { uids });
};
// TODO: fix this
export type Users = any;

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
  await POST("update-profile", token, { uid, name, subtitle, avatar });
};

// FUNCTIONS DELETE
export const deleteUser = async (token: string, uid: string): Promise<void> => {
  await POST("delete-user", token, { uid });
};

export const resetDatabase = async (token: string): Promise<void> => {
  await POST("reset-database", token, {});
};
