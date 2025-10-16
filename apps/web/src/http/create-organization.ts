import { api } from "./api-client";

interface CreateOrganizationRequest {
  name: string;
  domain: string | null;
  shouldAttachUsersByDomain: boolean;
}

type CreateOrganizationdResponse = {
  organizationId: string;
};

export async function createOrganization({
  name,
  domain,
  shouldAttachUsersByDomain,
}: CreateOrganizationRequest) {
  const result = await api
    .post("organizations", {
      json: {
        name,
        domain,
        shouldAttachUsersByDomain,
      },
    })
    .json<CreateOrganizationdResponse>();

  return result;
}
