import { Role } from "@repo/auth";
import { api } from "./api-client";

interface GetProjectResponse {
  projects: {
    id: string;
    description: string;
    name: string;
    slug: string;
    avatarUrl: string | null;
    organizationId: string;
    ownerId: string;
    createdAt: string;
    owner: {
      id: string;
      name: string | null;
      avatarUrl: string | null;
    };
  }[];
}

export async function getProjects(org: string) {
  const result = await api
    .get(`organizations/${org}/projects`)
    .json<GetProjectResponse>();

  return result;
}
