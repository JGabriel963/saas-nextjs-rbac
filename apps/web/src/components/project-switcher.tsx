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
import { Avatar, AvatarFallback } from "./ui/avatar";
import Link from "next/link";
import { useParams } from "next/navigation";
import { use } from "react";
import { getProjects } from "@/http/get-projects";
import { useQuery } from "@tanstack/react-query";

export function ProjectSwitcher() {
  const { slug: orgSlug } = useParams<{
    slug: string;
  }>();

  const { data, isLoading } = useQuery({
    queryKey: [orgSlug, "projects"],
    queryFn: () => getProjects(orgSlug),
    enabled: !!orgSlug,
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-[168px] items-center gap-2 rounded p -1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
        {/* {currentOrganization ? (
          <>
            <Avatar className="mr-2 size-5">
              {currentOrganization.avatarUrl && (
                <AvatarImage
                  src={currentOrganization.avatarUrl}
                  className="h-5"
                />
              )}
              <AvatarFallback />
            </Avatar>
            <span className="truncate text-left">
              {" "}
              {currentOrganization.name}{" "}
            </span>
          </>
        ) : (
          <span className="text-muted-foreground">Select organization</span>
        )} */}
        <span className="text-muted-foreground">Select organization</span>
        <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        sideOffset={12}
        className="w-[200px]"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Projects</DropdownMenuLabel>
          {/* {organizations.map((organization) => {
            return (
              <DropdownMenuItem key={organization.id} asChild>
                <Link
                  href={`/org/${organization.slug}`}
                  className="cursor-pointer"
                >
                  <Avatar className="mr-2 size-5">
                    {organization.avatarUrl && (
                      <AvatarImage
                        src={organization.avatarUrl}
                        className="h-5"
                      />
                    )}
                    <AvatarFallback />
                  </Avatar>
                  <span className="line-clamp-1"> {organization.name} </span>
                </Link>
              </DropdownMenuItem>
            );
          })} */}

          <DropdownMenuItem asChild>
            <Link href={``} className="cursor-pointer">
              <Avatar className="mr-2 size-5">
                {/* {organization.avatarUrl && (
                      <AvatarImage
                        src={organization.avatarUrl}
                        className="h-5"
                      />
                    )} */}
                <AvatarFallback />
              </Avatar>
              <span className="line-clamp-1">Projeto teste </span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={""}>
            <PlusCircle className="mr-2 size-4" />
            Create new
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
