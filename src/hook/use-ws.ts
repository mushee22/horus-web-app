import { useCallback, useEffect, useRef } from 'react'

interface WsProps {
    path: string;
    isEnabled: boolean;
    onMessage: (mev: MessageEvent) => void;
    onError: (ev: Event) => void;
    onClose: VoidFunction;
    onOpen: VoidFunction;
    onConnect?: VoidFunction;
}

export default function useWs({ path, isEnabled, onConnect, onMessage, onError, onClose, onOpen }: WsProps) {
    const socketRef = useRef<WebSocket | null>(null);


    const connectWebSocket = useCallback(() => {
        if (!isEnabled) return;

        onConnect?.()

        if (socketRef.current) {
            socketRef.current.close()
        }

        const url = path
        const socket = new WebSocket(url);

        socket.onopen = onOpen
        socket.onmessage = onMessage
        socket.onclose = onClose
        socket.onerror = onError

        socketRef.current = socket;
    }, [isEnabled, path, onConnect, onMessage, onError, onClose, onOpen])

    useEffect(() => {
        connectWebSocket()
        return () => {
            if (socketRef.current) {
                socketRef.current.close()
                socketRef.current = null
            }
        }
    }, [connectWebSocket])

    return {
        socketRef
    }

}

