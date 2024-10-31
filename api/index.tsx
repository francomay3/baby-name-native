import { User } from "@/types";

const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));

export const sendMessageToDeveloper = async (
  _name: string,
  _email: string,
  _message: string
) => {
  // TODO: implement
  await delay();
};

export const updateUserAvatar = async (_user: User, _avatar: string) => {
  // TODO: implement
  await delay();
};

export * from "@/database";
