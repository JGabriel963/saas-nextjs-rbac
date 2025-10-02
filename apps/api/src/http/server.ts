import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastyfyJwt from "@fastify/jwt";
import fastify from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { createAccount } from "./routes/auth/create-account";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { authenticateWithPassword } from "./routes/auth/authenticate-with-password";
import { getProfile } from "./routes/auth/get-profile";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Saas API",
      description: "Full-stack SaaS application with multi-tenancy and RBAC.",
      version: "1.0.0",
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.register(fastyfyJwt, {
  secret: "my-jwt-secret",
});

app.register(fastifyCors);

// Routes ["Auth"]
app.register(createAccount);
app.register(authenticateWithPassword);
app.register(getProfile);

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
