'use client'

import { useAuthContext } from '@/context/auth-context';
import { fetcher } from '@/lib/fetch';
import { ChatRoom, MessageWithDate, UserInput } from '@/type';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getDisplayName } from "@/lib/utils";
import { ChatContextState } from "@/type";
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { useWebSocket } from '@/hook/use-websocket';
import { useMessageHandling } from '@/hook/use-message-handling';
import { useMediaHandling } from '@/hook/use-media-handling';
import { useInputHandling } from '@/hook/use-input-handling';

export const ChatContext = React.createContext<ChatContextState>({
  community: undefined,
  isLoadingMessage: false,
  messages: [],
  isSendingMessage: false,
  userInput: {
    type: "text",
  },
  user: null,
  currentPage: 1,
});

export default function ChatContextProvider({ children }: PropsWithChildren) {
  const [page, setPage] = useState(1);
  const [messageWitDate, setMessageWithDate] = useState<Record<number, MessageWithDate[]>>({ 1: [] });
  const [messageInput, setMessageInput] = useState<UserInput>({
    type: "text",
  });

  const { user } = useAuthContext();
  const roomId = useParams().slug as string;
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const userId = user?.user?.id;

  const { data, isLoading: isLoadingMessages } = useQuery<ChatRoom>({
    queryKey: ['chat', roomId, page],
    queryFn: () => {
      const body = {
        user: userId,
        community_id: roomId
      }
      return fetcher(`chat-message/?page=${page}`, {
        method: "POST",
        body: JSON.stringify(body)
      })
    },
    enabled: !!userId && !!roomId
  });

  const { socketRef } = useWebSocket(roomId, userId, isLoadingMessages);
  const { isSendingMessage, handleSendMessage } = useMessageHandling(socketRef, user, roomId, userId);
  const { handleMediaPicker } = useMediaHandling();
  const { handleMessageInputChange, handleEnterKeyPress, handleEmojiClick } = useInputHandling();

  useEffect(() => {
    if (data) {
      setMessageWithDate((prev) => ({
        ...prev,
        [page]: data.results?.data.toReversed() || [],
      }))
    }
  }, [data])

  const handleNextPage = () => {
    setPage(page + 1)
  }

  const roomName = getDisplayName(data?.results?.community?.name ?? "")

  const value: ChatContextState = {
    messages: messageWitDate,
    community: data?.results?.community ?? undefined,
    isLoadingMessage: isLoadingMessages,
    inpuRef: messageInputRef,
    messageContainerRef,
    userInput: messageInput,
    isSendingMessage,
    user,
    roomName,
    currentPage: page,
    isNextPageAvilable: data && data?.results?.data.length > 0 && data?.next !== null,
    fetchNextPage: handleNextPage,
    onEmojiClick: (emoji: string) => handleEmojiClick(emoji, messageInput, setMessageInput),
    onInput: (e: React.ChangeEvent<HTMLTextAreaElement>) => handleMessageInputChange(e, setMessageInput),
    onEnterKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => handleEnterKeyPress(e, messageInput, () => handleSendMessage(messageInput, setMessageInput, messageInputRef, messageContainerRef, setPage)),
    onSendMessage: () => handleSendMessage(messageInput, setMessageInput, messageInputRef, messageContainerRef, setPage),
    onMediaPick: (e: React.ChangeEvent<HTMLInputElement>) => handleMediaPicker(e, setMessageInput),
    setMessageInput
  };

  return (
    <ChatContext.Provider value={{ ...value }}>{children}</ChatContext.Provider>
  );
}

