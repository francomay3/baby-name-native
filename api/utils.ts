import { Res } from "@/types";

const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

// HELPER FUNCTIONS
export const PATCH = async <T>({
  endpoint,
  token,
  args,
}: {
  endpoint: string;
  token?: string;
  args?: Record<string, any>;
}): Res<T> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${backendUrl}/${endpoint}`, {
    method: "PATCH",
    headers,
    body: args ? JSON.stringify(args) : undefined,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Res<T>;
};

export const DELETE = async <T>({
  endpoint,
  token,
  args,
}: {
  endpoint: string;
  token?: string;
  args?: Record<string, any>;
}): Res<T> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${backendUrl}/${endpoint}`, {
    method: "DELETE",
    headers,
    body: args ? JSON.stringify(args) : undefined,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Res<T>;
};

export const POST = async <T>({
  endpoint,
  token,
  args,
}: {
  endpoint: string;
  token?: string;
  args?: Record<string, any>;
}): Res<T> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

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

  return response.json() as Res<T>;
};

export const GET = async <T>({
  endpoint,
  token,
  params,
}: {
  endpoint: string;
  token?: string;
  params?: Record<string, any>;
}): Res<T> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const baseUrl = `${backendUrl}/${endpoint}`;
  console.log(baseUrl);
  const url = new URL(baseUrl);

  if (params) {
    url.search = new URLSearchParams(params).toString();
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Res<T>;
};
