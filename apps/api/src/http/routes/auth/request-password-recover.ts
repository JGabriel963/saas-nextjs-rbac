import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { email, z } from "zod";
import { BadRequestError } from "../_errors/bad-request-error";

export async function requestPasswordRecover(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/password/recover",
    {
      schema: {
        tags: ["auth"],
        summary: "Request password recover",
        body: z.object({
          email: z.email(),
        }),
        response: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { email } = request.body;

      const userFromEmail = await prisma.user.findUnique({
        where: { email },
      });

      if (!userFromEmail) {
        return reply.status(201).send();
      }

      const { id: code } = await prisma.token.create({
        data: {
          type: "PASSWORD_RECOVER",
          userId: userFromEmail.id,
        },
      });

      // Send e-mail with password recover link
      console.log("Recover password token: ", code);

      reply.status(201).send();
    }
  );
}
