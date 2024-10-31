export type Poll = {
  avatar: string;
  createdAt: string;
  id: number;
  open: boolean;
  ownerId: string;
  title: string;
};

type Friend = {
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

export type Res<Data> = Promise<{
  data: Data;
}>;
