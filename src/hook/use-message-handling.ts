'use client'

import { queryClient } from '@/lib/client';
import { getURL } from '@/lib/fetch';
import { UserInput, Student } from '@/type';
import { useCallback, useState } from 'react';

export const useMessageHandling = (socketRef: React.RefObject<WebSocket | null>, user: Student | null, roomId: string, userId: number | undefined) => {

  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const sendMessage = (data: string) => {
    return new Promise((resolve: (value: string | PromiseLike<string>) => void, reject: (reason?: string | Error) => void) => {
      setTimeout(() => {
        if (!socketRef.current) {
          reject(new Error("Socket is not connected"))
          return
        }
        resolve(data)
      }, 200)
    })
  }

  const handleSendMessage = useCallback(async (messageInput: UserInput, setMessageInput: (value: React.SetStateAction<UserInput>) => void, messageInputRef: React.RefObject<HTMLTextAreaElement | null>, messageContainerRef: React.RefObject<HTMLDivElement | null>, setPage: (page: number) => void) => {
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
      }
    }

    try {

      setIsSendingMessage(true)

      sendMessage(JSON.stringify(messageBody)).then((data: string) => {
        socketRef.current?.send(data)
        setIsSendingMessage(false)
        setMessageInput({
          type: "text",
          text: ""
        })
        queryClient.invalidateQueries({ queryKey: ['chat-list'] })
        if (messageInputRef.current) {
          messageInputRef.current.style.height = "40px"
        }

        if (messageContainerRef.current) {
          messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }

        setPage(1)
      }).catch((error) => {
        console.error('Error sending message:', error)
      }).finally(() => {
        setIsSendingMessage(false)
      })

    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      // setIsSendingMessage(false)
    }
  }, [userId, roomId, user, socketRef])

  return { isSendingMessage, handleSendMessage }
} 