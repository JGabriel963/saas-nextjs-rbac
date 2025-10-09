import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { auth } from "../middlewares/auth";
import { roleSchema } from "@repo/auth";
import { z } from "zod";

export async function getMembership(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      "/organizations/:slug/membership",
      {
        schema: {
          tags: ["Organizations"],
          summary: "Get organization membership",
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            200: z.object({
              membership: z.object({
                id: z.uuid(),
                role: roleSchema,
                organizationId: z.uuid(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params;

        const { membership } = await request.getUserMembership(slug);

        return {
          membership: {
            id: membership.id,
            role: membership.role,
            organizationId: membership.organizationId,
          },
        };
      }
    );
}
