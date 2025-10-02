import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { FastifyInstance } from "fastify";
import { type ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export async function createAccount(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/users",
    {
      schema: {
        body: z.object({
          name: z.string(),
          email: z.string(),
          password: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { name, email, password } = request.body;

      const userWithSameEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (userWithSameEmail) {
        return reply.status(400).send({
          messagee: "user with same emaill already exists.",
        });
      }

      const passwordHash = await hash(password, 8);

      await prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
        },
      });

      return reply.status(201).send();
    }
  );
}
