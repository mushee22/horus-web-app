'use client'

import { UserInput } from '@/type';
import { useCallback } from 'react';

export const useInputHandling = () => {
  
  const setTextMessage = useCallback((text: string, setMessageInput: (value: React.SetStateAction<UserInput>) => void) => {
    setMessageInput((prev) => ({ ...prev, text, type: "text" }))
  }, [])

  const handleMessageInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>, setMessageInput: (value: React.SetStateAction<UserInput>) => void) => {
    setTextMessage(e.target.value, setMessageInput)
  }, [setTextMessage])

  const handleEnterKeyPress = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>, messageInput: UserInput, handleSendMessage: () => void) => {
    if (e.key == "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (messageInput.text && messageInput.text.length > 0) {
        handleSendMessage()
      }
    }
  }, [])

  const handleEmojiClick = useCallback((emoji: string, messageInput: UserInput, setMessageInput: (value: React.SetStateAction<UserInput>) => void) => {
    setTextMessage((messageInput.text || '') + emoji, setMessageInput)
  }, [setTextMessage])

  return { handleMessageInputChange, handleEnterKeyPress, handleEmojiClick }
} 