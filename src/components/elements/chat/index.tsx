"use client";

import React from "react";
import ChatHeader from "./chat-header";
import ChatList from "./chat-list";
import MessageInput from "./message-input";
import ChatMediaPreview from "./chat-media-preview";
import ChatContextProvider from "@/context/chat-context";

export default function Chat() {
  return (
    <div className=" flex-1 flex flex-col relative h-[100dvh] md:h-screen ">
      <ChatContextProvider>
        <ChatHeader />
        <div className="flex flex-col flex-1 overflow-y-auto relative">
          <ChatList />
          <MessageInput />
          <ChatMediaPreview />
        </div>
      </ChatContextProvider>
    </div>
  );
}