import { api } from "./api-client";

interface UpdateOrganizationRequest {
  org: string;
  name: string;
  domain: string | null;
  shouldAttachUsersByDomain: boolean;
}

type UpdateOrganizationdResponse = {
  organizationId: string;
};

export async function updateOrganization({
  org,
  name,
  domain,
  shouldAttachUsersByDomain,
}: UpdateOrganizationRequest) {
  const result = await api
    .put(`organizations/${org}`, {
      json: {
        name,
        domain,
        shouldAttachUsersByDomain,
      },
    })
    .json<UpdateOrganizationdResponse>();

  return result;
}
