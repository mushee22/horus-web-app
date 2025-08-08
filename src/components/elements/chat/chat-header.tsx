import React from "react";
import { BackButton } from "../page-header";
import useChat from "@/hook/use-chat";
import { getDisplayName } from "@/lib/utils";

const ChatHeader = () => {
  const { community, isLoadingMessage, currentPage, isPageIntialLoad } = useChat();

  const roomName = getDisplayName(community?.name ?? "");

  return (
    <div className="shadow-md py-2 h-[60px]  flex gap-x-3  items-center bg-black/50 pl-4">
      <BackButton className=" md:hidden" />
      {(isLoadingMessage && currentPage == 1) || isPageIntialLoad ? (
        <div className="h-2 w-full bg-white animate-pulse max-w-[200px]  rounded-xl overflow-hidden relative"></div>
      ) : (
        <p className="text-lg font-medium text-primary">{`#${roomName}`}</p>
      )}
    </div>
  );
};

export default ChatHeader;
