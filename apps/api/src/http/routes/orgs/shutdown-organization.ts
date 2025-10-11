import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { organizationSchema } from "@repo/auth";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/http/middlewares/auth";
import { UnauthorizedError } from "../_errors/unauthorized-error";
import { getUserPermissions } from "@/utils/get-user-permitions";

export async function shutdownOrganization(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      "/organizations/:slug",
      {
        schema: {
          tags: ["Organizations"],
          summary: "Shutdown organization",
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId();
        const { slug } = request.params;
        const { membership, organization } =
          await request.getUserMembership(slug);

        const authOrganization = organizationSchema.parse(organization);

        const { cannot } = getUserPermissions(userId, membership.role);

        if (cannot("delete", authOrganization)) {
          throw new UnauthorizedError(
            "You are not allowed to shutdown this organization"
          );
        }

        await prisma.organization.delete({
          where: {
            id: organization.id,
          },
        });

        return reply.status(204).send();
      }
    );
}
