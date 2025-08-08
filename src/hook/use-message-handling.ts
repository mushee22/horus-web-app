'use client'

import { format } from 'date-fns';
import { getURL } from '@/lib/fetch';
import { UserInput, Student } from '@/type';
import { useCallback, useState } from 'react';

export const useMessageHandling = (socketRef: React.RefObject<WebSocket | null>, user: Student | null, roomId: string, userId: number | undefined) => {

  const [isSendingMessage, setIsSendingMessage] = useState(false);
  
  const handleSendMessage = useCallback(async (messageInput: UserInput, setMessageInput: (value: React.SetStateAction<UserInput>) => void, messageInputRef: React.RefObject<HTMLTextAreaElement | null>, moveFocusToLatestMessage: () => void, onCompleteSendMessage: (message: string, source: "ON_MESSAGE" | "SEND_MESSAGE") => void) => {
    if (!userId || !roomId || !socketRef.current) return;

    const input = messageInput.type == "image" ? messageInput?.media?.caption ?? '' : messageInput.text

    const messageBody = {
      message: input,
      user: userId,
      first_name: user?.user?.first_name,
      last_name: user?.user?.last_name,
      profile_pic: user?.profile_image ?? "",
      is_admin: user?.user?.is_admin ?? false,
      image_url: undefined,
      type: messageInput.type
    }

    if (messageInput.type === "image") {

      if (!messageInput.media?.file) return;

      setIsSendingMessage(true)

      const formData = new FormData()
      formData.append("image", messageInput.media.file);

      try {
        const url = getURL("upload-image-file/")
        const response = await fetch(url, {
          method: "POST",
          body: formData
        })

        if (!response.ok) {
          setMessageInput((prev) => ({
            ...prev,
            error: "Failed to upload image"
          }))
          return;
        }

        const data = await response.json();
        messageBody.image_url = data.image_url ?? undefined
      } catch (error) {
        console.log(error)
        setMessageInput((prev) => ({
          ...prev,
          error: "Failed to upload image"
        }))
        return
      }
    }

    try {

      setIsSendingMessage(true);
      
      socketRef.current?.send(JSON.stringify(messageBody));

      setIsSendingMessage(false)
        setMessageInput({
          type: "text",
          text: ""
        })
        
        const message = JSON.stringify({
          type: messageBody.image_url ? 'image' : 'chat',
          message: messageBody.message,
          sender: userId,
          time: format(Date.now(), 'hh:mm a'),
          first_name: messageBody.first_name,
          profile_pic: messageBody.profile_pic,
          is_admin: messageBody.is_admin,
          image: messageBody.image_url ?? "",
        })

        onCompleteSendMessage(message, 'SEND_MESSAGE')

        if (messageInputRef.current) {
          messageInputRef.current.style.height = "40px"
        }

        moveFocusToLatestMessage?.()

    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsSendingMessage(false)
    }
  }, [userId, roomId, user, socketRef])

  return { isSendingMessage, handleSendMessage }
} 