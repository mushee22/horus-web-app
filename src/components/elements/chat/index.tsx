"use client";

import React, { useEffect, useState, useRef } from "react";
import ChatHeader from "./chat-header";
import ChatList from "./chat-list";
import MessageInput from "./message-input";
import ChatMediaPreview from "./chat-media-preview";
import ChatContextProvider from "@/context/chat-context";

export default function Chat() {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to detect if running in React Native WebView
    const isReactNativeWebView = () => {
      return window.ReactNativeWebView !== undefined || 
             /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    };

    if (isReactNativeWebView()) {
      // Setup keyboard listeners for React Native WebView
      const handleMessage = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'keyboardWillShow') {
            setKeyboardVisible(true);
            setKeyboardHeight(data.keyboardHeight || 300); // Default height if not provided
          } else if (data.type === 'keyboardWillHide') {
            setKeyboardVisible(false);
            setKeyboardHeight(0);
          }
        } catch (e) {
          console.log(e)
          // Ignore non-JSON messages
        }
      };

      // Listen for messages from React Native
      window.addEventListener('message', handleMessage);

      // Fallback for iOS devices using viewport height changes
      const handleResize = () => {
        const viewportHeight = window.innerHeight;
        const chatContainer = chatContainerRef.current;
        
        if (chatContainer) {
          const previousHeight = chatContainer.dataset.previousHeight;
          const currentHeight = viewportHeight.toString();
          
          if (previousHeight && parseInt(previousHeight) > parseInt(currentHeight)) {
            // Keyboard likely appeared (viewport got smaller)
            setKeyboardVisible(true);
            setKeyboardHeight(parseInt(previousHeight) - parseInt(currentHeight));
          } else if (previousHeight && parseInt(previousHeight) < parseInt(currentHeight)) {
            // Keyboard likely disappeared (viewport got larger)
            setKeyboardVisible(false);
            setKeyboardHeight(0);
          }
          
          chatContainer.dataset.previousHeight = currentHeight;
        }
      };

      window.addEventListener('resize', handleResize);
      
      // Initialize previous height
      if (chatContainerRef.current) {
        chatContainerRef.current.dataset.previousHeight = window.innerHeight.toString();
      }

      return () => {
        window.removeEventListener('message', handleMessage);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
    <div 
      ref={chatContainerRef}
      className="flex-1 flex flex-col relative h-[100dvh] md:h-screen"
      style={keyboardVisible ? { paddingBottom: `${keyboardHeight}px` } : undefined}
    >
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
