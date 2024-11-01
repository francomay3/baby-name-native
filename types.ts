export type Poll = {
  avatar: string;
  createdAt: string;
  id: number;
  open: boolean;
  ownerId: string;
  title: string;
};

export type Friend = {
  createdAt: string;
  userId: string;
  friendId: string;
};

export type User = {
  avatar: string;
  createdAt: string;
  email: string;
  friendsFrom: Friend[];
  friendsTo: Friend[];
  id: string;
  name: string;
  participatedPolls: string[];
  polls: Poll[];
  subtitle: string;
};

export type Users = User[];

export type Code =
  | "VALIDATION_ERROR"
  | "INTERNAL_SERVER_ERROR"
  | "ADMIN_ONLY"
  | "INVALID_TOKEN"
  | "NO_TOKEN"
  | "SELF_ONLY"
  | "UNAUTHORIZED"
  | "NOT_FOUND"
  | "METHOD_NOT_ALLOWED"
  | "CREATED"
  | "READ"
  | "UPDATED"
  | "DELETED"
  | "EMPTY";

export type Res<Data> = Promise<{
  data: Data;
  code: Code;
  ok: boolean;
  message: string;
  status: number;
}>;
