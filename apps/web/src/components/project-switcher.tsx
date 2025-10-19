"use client";

import { ChevronsUpDown, PlusCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { useParams } from "next/navigation";
import { use } from "react";
import { getProjects } from "@/http/get-projects";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";

export function ProjectSwitcher() {
  const { slug: orgSlug, project: projectSlug } = useParams<{
    slug: string;
    project: string;
  }>();

  const { data, isLoading } = useQuery({
    queryKey: [orgSlug, "projects"],
    queryFn: () => getProjects(orgSlug),
    enabled: !!orgSlug,
  });

  const currentProject =
    data && projectSlug
      ? data.projects.find((project) => project.slug === projectSlug)
      : null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-[168px] items-center gap-2 rounded p -1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
        {isLoading ? (
          <>
            <Skeleton className="size-4 shrink-0 rounded-full" />
            <Skeleton className="h-4 w-full" />
          </>
        ) : (
          <>
            {currentProject ? (
              <>
                <Avatar className="size-5">
                  {currentProject.avatarUrl && (
                    <AvatarImage
                      src={currentProject.avatarUrl}
                      className="h-5"
                    />
                  )}
                  <AvatarFallback />
                </Avatar>
                <span className="truncate text-left">
                  {" "}
                  {currentProject.name}{" "}
                </span>
              </>
            ) : (
              <span className="text-muted-foreground">Select project</span>
            )}
          </>
        )}
        <ChevronsUpDown className="ml-auto size-4 text-muted-foreground shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        sideOffset={12}
        className="w-[200px]"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Projects</DropdownMenuLabel>
          {data &&
            data.projects.map((project) => {
              return (
                <DropdownMenuItem key={project.id} asChild>
                  <Link
                    href={`/org/${orgSlug}/project/${project.slug}`}
                    className="cursor-pointer"
                  >
                    <Avatar className="mr-2 size-5">
                      {project.avatarUrl && (
                        <AvatarImage src={project.avatarUrl} className="h-5" />
                      )}
                      <AvatarFallback />
                    </Avatar>
                    <span className="line-clamp-1"> {project.name} </span>
                  </Link>
                </DropdownMenuItem>
              );
            })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/org/${orgSlug}/create-project`}>
            <PlusCircle className="mr-2 size-4" />
            Create new
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
