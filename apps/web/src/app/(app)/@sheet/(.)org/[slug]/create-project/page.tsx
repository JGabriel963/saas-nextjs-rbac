import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import { InterceptedSheetContent } from "@/components/intercepted-sheet-content";
import { ProjectForm } from "@/app/(app)/org/[slug]/create-project/project-form";

export default function CreateProject() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader>
          <SheetTitle>Create organization</SheetTitle>
        </SheetHeader>

        <div className="px-4">
          <ProjectForm />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  );
}
