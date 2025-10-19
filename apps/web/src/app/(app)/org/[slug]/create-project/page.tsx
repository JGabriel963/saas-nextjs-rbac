import { Header } from "@/components/header";
import { ProjectForm } from "./project-form";
import { ability } from "@/auth/auth";
import { redirect } from "next/navigation";

export default async function CreateProject() {
  const permissions = await ability();

  if (permissions?.cannot("create", "Project")) {
    redirect("/");
  }
  return (
    <div className="py-4 space-y-3">
      <h1 className="text-2xl font-bold">Create organization</h1>

      <ProjectForm />
    </div>
  );
}
