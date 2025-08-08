'use client'

import { queryClient } from '@/lib/client';
import { useCallback, useEffect, useState } from 'react';
import useWs from './use-ws';

const getCommunityWsUrl = (roomId: string, userId: number) => {
  return `${process.env.NEXT_PUBLIC_WS_URL}community/${roomId}/${userId}/`;
}



export const useWebSocket = (roomId: string, userId: number | undefined, isLoadingMessages: boolean, onMessage: (message: string, source: "ON_MESSAGE" | "SEND_MESSAGE") => void) => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])


  const handleOnMessage = useCallback((ev: MessageEvent) => {
    try {
      const currentMessage = JSON.parse(ev.data)
      if (currentMessage.type === "chat" || currentMessage.type === "image") {
        console.log('currentMessage', currentMessage)
        onMessage(ev.data, 'ON_MESSAGE');
        if (!isMobile) {
          queryClient.invalidateQueries({ queryKey: ['chat-list'] })
        }
      }
    } catch (error) {
      console.error('Error parsing WebSocket message:', error)
    }
  }, [onMessage, isMobile])

  const handleOnClose = useCallback(() => { }, [])

  const handleOnError = useCallback((error: Event) => {
    console.log('WebSocket error:', error)
  }, [])

  const handleOnOpen = useCallback(() => {
    // console.log("WebSocket connection opened")
  }, [])

  const {
    socketRef: wsSocketRef
  } = useWs({
    path: getCommunityWsUrl(roomId, userId || 0),
    isEnabled: (!userId || !roomId || isLoadingMessages),
    onMessage: handleOnMessage,
    onError: handleOnError,
    onClose: handleOnClose,
    onOpen: handleOnOpen,
  })

  // const connectWebSocket = useCallback(() => {
  //   if (!userId || !roomId || isLoadingMessages) return;

  //   if (socketRef.current) {
  //     socketRef.current.close()
  //   }

  //   const url = getCommunityWsUrl(roomId, userId)
  //   const socket = new WebSocket(url);

  //   socket.onopen = handleOnOpen
  //   socket.onmessage = handleOnMessage
  //   socket.onclose = handleOnClose
  //   socket.onerror = handleOnError

  //   socketRef.current = socket;
  // }, [userId, roomId, isLoadingMessages, handleOnMessage, handleOnClose, handleOnError, handleOnOpen])

  // useEffect(() => {
  //   connectWebSocket()
  //   return () => {
  //     if (socketRef.current) {
  //       socketRef.current.close()
  //       socketRef.current = null
  //     }
  //   }
  // }, [connectWebSocket])

  return { socketRef: wsSocketRef }
}