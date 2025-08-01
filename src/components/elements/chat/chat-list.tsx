import React from "react";
import MessageCard from "./message-card";
import LoadMore from "../load-more";
import useChat from "@/hook/use-chat";
import { formatRelativeDate } from "@/lib/utils";

export default function ChatList() {
  const {
    messages,
    user,
    messageContainerRef,
    fetchNextPage,
    isNextPageAvilable,
    isSendingMessage,
  } = useChat();

  return (
    <div
      className="p-4 flex-1 flex flex-col-reverse justify-start overflow-y-auto "
      ref={messageContainerRef}
    >
      <>
        {!isSendingMessage && (
          <div className="flex items-center justify-end py-4 pr-4">
            <div className="loader"></div>
          </div>
        )}
        {Object.keys(messages)?.map((key) =>
          messages[key as unknown as number].map((item, index) => (
            <div key={index}>
              <div className="flex gap-x-4 items-center mb-4">
                <div className="border-b flex-1 border-foreground/10"></div>
                <p className="text-xs font-medium px-2 py-[2px] bg-white/10 text-center rounded-xl">
                  {formatRelativeDate(item.date)}
                </p>
                <div className="border-b flex-1 border-foreground/10"></div>
              </div>
              {item.messages.map((chat, index) => (
                <MessageCard
                  key={index}
                  chat={chat}
                  userType={chat.sender.id == user?.id ? "user" : "system"}
                  user={chat.sender}
                />
              ))}
            </div>
          ))
        )}

        {isNextPageAvilable !== undefined && (
          <LoadMore
            fetchNextPage={fetchNextPage}
            hasNextPage={isNextPageAvilable || false}
          />
        )}
      </>
    </div>
  );
}
