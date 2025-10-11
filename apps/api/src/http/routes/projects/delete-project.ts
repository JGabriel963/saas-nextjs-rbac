import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createSlug } from "@/utils/create-slug";
import { auth } from "@/http/middlewares/auth";
import { getUserPermissions } from "@/utils/get-user-permitions";
import { UnauthorizedError } from "../_errors/unauthorized-error";
import { projectSchema } from "@repo/auth";
import { BadRequestError } from "../_errors/bad-request-error";

export async function deleteProject(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      "/organizations/:slug/projects/:projectId",
      {
        schema: {
          tags: ["Projects"],
          summary: "Delete a project",
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
            projectId: z.string(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { slug, projectId } = request.params;
        const userId = await request.getCurrentUserId();
        const { organization, membership } =
          await request.getUserMembership(slug);

        const project = await prisma.project.findUnique({
          where: {
            id: projectId,
            organizationId: organization.id,
          },
        });

        if (!project) {
          throw new BadRequestError("Project not found");
        }

        const { cannot } = getUserPermissions(userId, membership.role);
        const authProject = projectSchema.parse(project);

        if (cannot("delete", authProject)) {
          throw new UnauthorizedError(
            `You're not allowed to delete this project`
          );
        }

        await prisma.project.delete({
          where: {
            id: projectId,
          },
        });

        return reply.status(204).send();
      }
    );
}
