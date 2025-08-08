import React, { useEffect } from "react";
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

  // Function to notify React Native about keyboard events
  const notifyReactNative = (eventType: string) => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: eventType
      }));
    }
  };

  useEffect(() => {
    // Cleanup function to ensure keyboard is hidden when component unmounts
    return () => {
      notifyReactNative('keyboardWillHide');
    };
  }, []);

  return (
    <div className="bg-black px-2 sm:px-5 pt-5 pb-8 w-full flex items-center gap-x-3">
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
          className="p-2 rounded-md border-none max-h-[100px] overflow-y-auto flex-1 focus:outline-none placeholder:text-sm placeholder:text-foreground/30 placeholder:font-light resize-none overflow-hidden"
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = target.scrollHeight + "px";
            if (target.value.length == 0) {
              target.style.height = "40px";
            }
          }}
          onFocus={() => {
            // Notify React Native that the keyboard should appear
            notifyReactNative('keyboardWillShow');
            
            // Scroll the view after a short delay to ensure the keyboard is visible
            setTimeout(() => {
              inpuRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
          }}
          onBlur={() => {
            // Notify React Native that the keyboard should hide
            notifyReactNative('keyboardWillHide');
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
