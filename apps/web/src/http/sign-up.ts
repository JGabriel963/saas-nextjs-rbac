import { api } from "./api-client";

interface SignUpdRequest {
  name: string;
  email: string;
  password: string;
}

type SignUpdResponse = void;

export async function signUp({ name, email, password }: SignUpdRequest) {
  const result = await api.post("users", {
    json: {
      name,
      email,
      password,
    },
  });
}
