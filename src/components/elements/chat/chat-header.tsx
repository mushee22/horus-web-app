import React from "react";
import { BackButton } from "../page-header";
import useChat from "@/hook/use-chat";
import { getDisplayName } from "@/lib/utils";

const ChatHeader = () => {
  const { community } = useChat();

  const roomName = getDisplayName(community?.name ?? "");

  return (
    <div className="shadow-md py-2 h-[60px] sticky top-0 flex gap-x-3  items-center bg-black/50 pl-2">
      <BackButton className=" md:hidden" />
      <p className="text-lg font-medium">{`#${roomName}`}</p>
    </div>
  );
};

export default ChatHeader;
