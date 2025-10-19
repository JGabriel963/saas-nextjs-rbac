import { Header } from "@/components/header";
import OrganizationForm from "../org/organization-form";

export default function CreateOrganization() {
  return (
    <div className="py-4 space-y-3">
      <Header />
      <main className="mx-auto w-full max-w-[1200px] space-y-4 px-4">
        <h1 className="text-2xl font-bold">Create organization</h1>

        <OrganizationForm />
      </main>
    </div>
  );
}
