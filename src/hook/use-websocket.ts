'use client'

import { queryClient } from '@/lib/client';
import { useCallback, useEffect, useRef, useState } from 'react';

const getCommunityWsUrl = (roomId: string, userId: number) => {
  return `${process.env.NEXT_PUBLIC_WS_URL}community/${roomId}/${userId}/`;
}

export const useWebSocket = (roomId: string, userId: number | undefined, isLoadingMessages: boolean, onMessage: (message: string) => void) => {

  const socketRef = useRef<WebSocket | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])


  const handleOnMessage = useCallback((ev: MessageEvent) => {
    try {
      const currentMessage = JSON.parse(ev.data)
      if (currentMessage.type === "chat" || currentMessage.type === "image") {
        console.log('currentMessage', currentMessage)
        onMessage(ev.data);
        if (!isMobile) {
          queryClient.invalidateQueries({ queryKey: ['chat-list'] })
        }
      }
    } catch (error) {
      console.error('Error parsing WebSocket message:', error)
    }
  }, [ onMessage, isMobile])

  const handleOnClose = useCallback(() => { }, [])

  const handleOnError = useCallback((error: Event) => {
    console.log('WebSocket error:', error)
  }, [])

  const handleOnOpen = useCallback(() => {
    // console.log("WebSocket connection opened")
  }, [])

  const connectWebSocket = useCallback(() => {
    if (!userId || !roomId || isLoadingMessages) return;

    if (socketRef.current) {
      socketRef.current.close()
    }

    const url = getCommunityWsUrl(roomId, userId)
    const socket = new WebSocket(url);

    socket.onopen = handleOnOpen
    socket.onmessage = handleOnMessage
    socket.onclose = handleOnClose
    socket.onerror = handleOnError

    socketRef.current = socket;
  }, [userId, roomId, isLoadingMessages, handleOnMessage, handleOnClose, handleOnError, handleOnOpen])

  useEffect(() => {
    connectWebSocket()
    return () => {
      if (socketRef.current) {
        socketRef.current.close()
        socketRef.current = null
      }
    }
  }, [connectWebSocket])

  return { socketRef }
}