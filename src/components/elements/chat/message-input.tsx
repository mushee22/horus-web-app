import React from "react";
import EmojiPicker from "./emoji-picker";
import ChatMediaPicker from "./chat-media-picker";
import ChatSendMessageButton from "./chat-send-message-button";
import useChat from "@/hook/use-chat";


export default function MessageInput() {
  const {
    userInput,
    onInput,
    onEnterKeyPress,
    onEmojiClick,
    onSendMessage,
    isSendingMessage,
    inpuRef,
  } = useChat();

  return (
    <div className=" bg-black px-2 sm:px-5 pt-5 pb-8 w-full flex items-center  gap-x-3">
      <ChatMediaPicker />
      <div className="flex items-center min-h-9 bg-[#FFFFFF14] rounded-[18px] z-10 flex-1">
        <textarea
          id="message-input"
          name="message"
          ref={inpuRef}
          value={userInput.text ?? ""}
          onChange={onInput}
          placeholder="Type a message..."
          onKeyDown={onEnterKeyPress}
          style={{ height: "40px" }}
          className="p-2 rounded-md border-none max-h-[100px] overflow-y-auto flex-1 focus:outline-none placeholder:text-sm placeholder:text-foreground/30 placeholder:font-light resize-none  overflow-hidden"
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = target.scrollHeight + "px";
            if (target.value.length == 0) {
              target.style.height = "40px";
            }
          }}
        />
      </div>
      <EmojiPicker onEmojiClick={onEmojiClick} />
      <ChatSendMessageButton
        disabled={isSendingMessage || (userInput?.text || '').length == 0}
        onClick={onSendMessage}
        isLoading={isSendingMessage}
      />
    </div>
  );
}
