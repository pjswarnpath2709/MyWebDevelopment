"use client";

import { ServerWithMembersWithProfile } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";

import { useModal } from "@/hooks/use-modal-store";

import { Plus, Settings } from "lucide-react";
import ActionToolTip from "@/components/action-tooltip";
import { channel } from "diagnostics_channel";

interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfile;
}

const ServerSection = ({
  label,
  role,
  sectionType,
  server,
  channelType,
}: ServerSectionProps) => {
  const { onOpen } = useModal();

  return (
    <div className="flex items-center justify-between py-2 ">
      <p className="text-sm uppercase font-semibold text-zinc-500 dark:text-zinc-400">
        {" "}
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionToolTip label="Create Channel" side="top">
          <button
            onClick={() =>
              onOpen("createChannel", { channelType: channelType })
            }
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Plus className="h-4 w-4" />
          </button>
        </ActionToolTip>
      )}
      {role === MemberRole.ADMIN && sectionType === "members" && (
        <ActionToolTip label="Manage Members" side="top">
          <button
            onClick={() => onOpen("members", { server })}
            className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
          >
            <Settings className="h-4 w-4" />
          </button>
        </ActionToolTip>
      )}
    </div>
  );
};

export default ServerSection;
