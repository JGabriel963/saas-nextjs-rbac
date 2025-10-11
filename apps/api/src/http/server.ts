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
import { errorHandling } from "./error-handling";
import { requestPasswordRecover } from "./routes/auth/request-password-recover";
import { resetPassword } from "./routes/auth/reset-password";
import { authenticateWithGithub } from "./routes/auth/authenticate-with-github";
import { env } from "@repo/env";
import { createOrganization } from "./routes/orgs/create-organization";
import { getMembership } from "./routes/orgs/get-membership";
import { getOrganization } from "./routes/orgs/get-organization";
import { getOrganizations } from "./routes/orgs/get-organizations";
import { updateOrganization } from "./routes/orgs/update-organization";
import { shutdownOrganization } from "./routes/orgs/shutdown-organization";
import { transferOrganization } from "./routes/orgs/transfer-organization";
import { createProject } from "./routes/projects/create-project";
import { deleteProject } from "./routes/projects/delete-project";
import { getProject } from "./routes/projects/get-project";
import { getProjects } from "./routes/projects/get-projects";
import { updateProject } from "./routes/projects/update-project";
import { getMembers } from "./routes/members/get-members";
import { updateMember } from "./routes/members/update-members";
import { removeMember } from "./routes/members/remove-member";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.setErrorHandler(errorHandling);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Saas API",
      description: "Full-stack SaaS application with multi-tenancy and RBAC.",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.register(fastyfyJwt, {
  secret: env.JWT_SECRET,
});

app.register(fastifyCors);

// Routes ["Auth"]
app.register(createAccount);
app.register(authenticateWithPassword);
app.register(authenticateWithGithub);
app.register(getProfile);
app.register(requestPasswordRecover);
app.register(resetPassword);

// Routes ["Organization"]
app.register(createOrganization);
app.register(getMembership);
app.register(getOrganization);
app.register(getOrganizations);
app.register(updateOrganization);
app.register(shutdownOrganization);
app.register(transferOrganization);

// Routes ["Project"]
app.register(createProject);
app.register(deleteProject);
app.register(getProject);
app.register(getProjects);
app.register(updateProject);

// Members ["Members"]
app.register(getMembers);
app.register(updateMember);
app.register(removeMember);

app.listen({ port: env.SERVER_PORT }).then(() => {
  console.log("HTTP server running!");
});
