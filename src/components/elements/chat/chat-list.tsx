import React from "react";
import MessageCard from "./message-card";
import LoadMore from "../load-more";
import useChat from "@/hook/use-chat";

export default function ChatList() {

  const {
    messages,
    user,
    messageContainerRef,
    fetchNextPage,
    isNextPageAvilable,
  } = useChat();


  return (
    <div
      className="p-4 flex-1 flex flex-col-reverse justify-start overflow-y-auto "
      ref={messageContainerRef}
    >
      <>
        {Object.keys(messages)?.map((key) =>
          messages[key as unknown as number].map((item, index) => (
            <div key={index}>
              <p className="text-sm font-medium text-center py-2 bg-background/20">
                {item.date}
              </p>
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
