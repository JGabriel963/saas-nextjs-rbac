import { api } from "./api-client";

interface GetOrganizationfResponse {
  organization: {
    id: string;
    name: string;
    slug: string;
    domain: string | null;
    shouldAttachUsersByDomain: boolean;
    avatarUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    ownerId: string;
  };
}

export async function getOrganization(org: string) {
  const result = await api
    .get(`organizations/${org}`)
    .json<GetOrganizationfResponse>();

  return result;
}
