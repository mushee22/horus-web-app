"use client";

import { useAuthContext } from "@/context/auth-context";
import { fetcher, getChatMediaURL } from "@/lib/fetch";
import {
  ChatRoom,
  Message,
  MessageWithDate,
  Student,
  UserInput,
} from "@/type";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getDisplayName } from "@/lib/utils";
import { ChatContextState } from "@/type";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useWebSocket } from "@/hook/use-websocket";
import { useMessageHandling } from "@/hook/use-message-handling";
import { useMediaHandling } from "@/hook/use-media-handling";
import { useInputHandling } from "@/hook/use-input-handling";
import { format, isSameDay, parse } from "date-fns";
import { handleUpdateCommunity } from "@/lib/client";

interface NewSocketMessage {
  type: "chat" | "image";
  message: string;
  time: string;
  image?: string;
  sender?: number;
  profile_pic?: string;
  first_name?: string;
}

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
  isPageIntialLoad: true,
});

export default function ChatContextProvider({ children }: PropsWithChildren) {
  const [page, setPage] = useState(1);

  const [isPageIntialLoad, setIsPageIntialLoad] = useState(true);

  const [messageWitDate, setMessageWithDate] = useState<
    Record<number, MessageWithDate[]>
  >({ 1: [] });

  const [messageInput, setMessageInput] = useState<UserInput>({
    type: "text",
  });

  const { user } = useAuthContext();

  const roomId = useParams().slug as string;

  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const messageContainerRef = useRef<HTMLDivElement>(null);

  const userId = user?.user?.id;

  const moveFocusToLatestMessage = useCallback(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, []);

  const updatedMessageWithDate = useCallback(
    (currentData: Record<number, MessageWithDate[]>, newMessage: Message) => {
      const appendPageNumber = 1;
      const appendPageNumberData = currentData[appendPageNumber] || [];
      const lastData = appendPageNumberData[0];
      const currentMessageDate = format(new Date(Date.now()), "dd-MMMM-yyyy");

      const same = isSameDay(
        new Date(Date.now()),
        parse(lastData.date, "dd-MMMM-yyyy", new Date())
      );

      if (same) {
        lastData.messages.push(newMessage);
        return appendPageNumberData;
      }

      const newMesssageWithData = [
        {
          date: currentMessageDate,
          messages: [newMessage],
        },
        ...appendPageNumberData,
      ];

      return newMesssageWithData;
    },
    []
  );

  const transformMessage = useCallback(
    (message: NewSocketMessage) => {
      // Create a sender object that matches the Student type or undefined
      let sender: Student | undefined;

      if (message.sender === user?.user?.id) {
        sender = user || undefined;
      } else if (message.sender !== undefined) {
        // Create a valid Student object for other senders
        sender = {
          id: message.sender,
          profile_image: message.profile_pic ?? "",
          user: {
            id: message.sender,
            first_name: message.first_name ?? "",
            last_name: "",
            email: "",
            phone: "",
            is_admin: false,
          },
          created_date: "",
          created_time: "",
          modified_date: "",
          modified_time: "",
          is_active: true,
        };
      }

      return {
        community: parseInt(roomId),
        id: 0,
        content: message.message ?? "",
        time: message.time ?? "",
        sender: sender,
        image: message.image ? getChatMediaURL(message.image) : undefined,
      };
    },
    [user, roomId]
  );

  const handleUpdateMessage = useCallback(
    (message: string, source: "ON_MESSAGE" | "SEND_MESSAGE") => {
      const parsedMesage: NewSocketMessage = JSON.parse(message);
      const newMessTransformed = transformMessage(parsedMesage);
      console.log(newMessTransformed, "new message transformed");
      if (
        source == "ON_MESSAGE" &&
        newMessTransformed.sender?.id == user?.user?.id
      )
        return;
      setMessageWithDate((prev) => {
        const appendPageNumber = 1;
        return {
          ...prev,
          [appendPageNumber]: updatedMessageWithDate(prev, newMessTransformed),
        };
      });

      moveFocusToLatestMessage();
    },
    [transformMessage, updatedMessageWithDate, moveFocusToLatestMessage, user]
  );

  const { data, isLoading: isLoadingMessages } = useQuery<ChatRoom>({
    queryKey: ["chat", roomId, page],
    queryFn: () => {
      const body = {
        user: userId,
        community_id: roomId,
      };
      return fetcher(`chat-message/?page=${page}`, {
        method: "POST",
        body: JSON.stringify(body),
      });
    },
    enabled: !!userId && !!roomId,
    refetchOnMount: "always",
  });

  useEffect(() => {
    handleUpdateCommunity(parseInt(roomId), 'reset');
  }, [roomId]);

  const { socketRef } = useWebSocket(
    roomId,
    userId,
    isLoadingMessages,
    handleUpdateMessage
  );

  const { isSendingMessage, handleSendMessage } = useMessageHandling(
    socketRef,
    user,
    roomId,
    userId
  );

  const { handleMediaPicker } = useMediaHandling();

  const { handleMessageInputChange, handleEnterKeyPress, handleEmojiClick } =
    useInputHandling();

  useEffect(() => {
    if (data) {
      setIsPageIntialLoad(false);
      setMessageWithDate((prev) => ({
        ...prev,
        [page]: data.results?.data.toReversed() || [],
      }));
    }
  }, [data, page]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const roomName = getDisplayName(data?.results?.community?.name ?? "");

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
    isNextPageAvilable:
      data && data?.results?.data.length > 0 && data?.next !== null,
    fetchNextPage: handleNextPage,
    onEmojiClick: (emoji: string) =>
      handleEmojiClick(emoji, messageInput, setMessageInput),
    onInput: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      handleMessageInputChange(e, setMessageInput),
    onEnterKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) =>
      handleEnterKeyPress(e, messageInput, () =>
        handleSendMessage(
          messageInput,
          setMessageInput,
          messageInputRef,
          moveFocusToLatestMessage,
          handleUpdateMessage
        )
      ),
    onSendMessage: () =>
      handleSendMessage(
        messageInput,
        setMessageInput,
        messageInputRef,
        moveFocusToLatestMessage,
        handleUpdateMessage
      ),
    onMediaPick: (e: React.ChangeEvent<HTMLInputElement>) =>
      handleMediaPicker(e, setMessageInput),
    setMessageInput,
    isPageIntialLoad: isPageIntialLoad,
  };

  return (
    <ChatContext.Provider value={{ ...value }}>{children}</ChatContext.Provider>
  );
}
