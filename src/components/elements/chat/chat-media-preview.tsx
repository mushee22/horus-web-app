import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { UserInput } from "@/type";
import ChatSendMessageButton from "./chat-send-message-button";
import useChat from "@/hook/use-chat";

export default function ChatMediaPreview() {
  const { userInput, onSendMessage, isSendingMessage, setMessageInput } =
    useChat();

  const hasMedia = userInput?.media?.file;

  const handleClose = () => {
    setMessageInput?.((prev: UserInput) => ({
      ...prev,
      media: undefined,
      type: "text",
    }));
  };

  const handleSetCaption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput?.((prev: UserInput) => ({
      ...prev,
      media: {
        ...prev.media,
        caption: e.target.value,
      },
      type: "image",
    }));
  };

  if (!hasMedia) return null;

  return (
    <div className="absolute inset-x-0 max-h-[80%] bottom-0 z-40 animate-in slide-in-from-bottom-2 duration-300 ease-out"
     
    >
      <div className="h-full bg-[#161717] pt-12  flex flex-col justify-center items-center rounded-se-2xl rounded-ss-2xl p-2">
        <div className="flex items-center flex-1 justify-center w-full flex-col gap-y-4 rounded-2xl">
          <div
            className="flex items-center gap-2 w-full max-w-[95%] relative"
            style={{
              aspectRatio:
                userInput?.media?.props?.width &&
                userInput?.media?.props?.height
                  ? userInput?.media?.props?.width /
                    userInput?.media?.props?.height
                  : 1,
            }}
          >
            <Image
              src={userInput?.media?.url ?? ""}
              alt="media"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-full   mx-auto flex items-center gap-x-2">
            <input
              type="text"
              placeholder="Add a caption"
              onChange={handleSetCaption}
              className="w-full p-2  bg-[#FFFFFF14] rounded-md border-none max-h-[100px] overflow-y-auto flex-1 focus:outline-none placeholder:text-sm placeholder:text-foreground/30 placeholder:font-light resize-none  overflow-hidden"
            />
            <ChatSendMessageButton
             disabled={isSendingMessage}
             onClick={onSendMessage}
             isLoading={isSendingMessage}
            />
          </div>
        </div>
        <button
          onClick={handleClose}
          className="size-8 min-w-8 disabled:cursor-not-allowed cursor-pointer rounded-full flex items-center bg-[#FFFFFF14] absolute top-2 right-2 justify-center"
        >
          <X size={16} className="text-white" />
        </button>
      </div>
    </div>
  );
}
