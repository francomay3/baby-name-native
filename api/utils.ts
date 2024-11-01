const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

// HELPER FUNCTIONS
export const PATCH = async ({
  endpoint,
  token,
  args,
}: {
  endpoint: string;
  token?: string;
  args?: Record<string, any>;
}) => {
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

  return response.json();
};

export const DELETE = async ({
  endpoint,
  token,
  args,
}: {
  endpoint: string;
  token?: string;
  args?: Record<string, any>;
}) => {
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

  return response.json();
};

export const POST = async ({
  endpoint,
  token,
  args,
}: {
  endpoint: string;
  token?: string;
  args?: Record<string, any>;
}) => {
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

  return response.json();
};

export const GET = async ({
  endpoint,
  token,
  params,
}: {
  endpoint: string;
  token?: string;
  params?: Record<string, any>;
}) => {
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

  return response.json();
};
