import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import OrganizationForm from "../../create-organization/organization-form";
import { InterceptedSheetContent } from "@/components/intercepted-sheet-content";

export default function CreateOrganization() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader>
          <SheetTitle>Create organization</SheetTitle>
        </SheetHeader>

        <div className="px-4">
          <OrganizationForm />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  );
}
