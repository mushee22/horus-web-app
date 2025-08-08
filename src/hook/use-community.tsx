// import { useAuthContext } from "@/context/auth-context";
import { useAuthContext } from "@/context/auth-context";
import { fetcher } from "@/lib/fetch";
import { Community, Response } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { parse } from 'date-fns'
// import useWs from "./use-ws";

export default function useCommunity() {
  const roomId = useParams().slug as string;

  const socketRef = useRef<WebSocket | null>(null);

  const { user } = useAuthContext();

  const { data, isLoading, refetch } = useQuery<Response<Community[]>>({
    queryKey: ["chat-list"],
    queryFn: () => {
      return fetcher("list-rooms/");
    },
    refetchOnMount: "always",
  });

  const handleUpdatedMessage = useCallback(
    (ev: MessageEvent) => {
      const currentMessage = JSON.parse(ev.data);
      if (currentMessage.type == "notification") {
        console.log('currentMessage', currentMessage)
        refetch();
      }
    },
    [refetch]
  );

  const connectToSocket = useCallback(() => {
    if (!user || !user.user?.id) return;
    const path = `${process.env.NEXT_PUBLIC_WS_URL}notifications/${user.user.id}/`;
    socketRef.current = new WebSocket(path);
    socketRef.current.addEventListener("message", handleUpdatedMessage);
    return () => {
      socketRef.current?.removeEventListener("message", handleUpdatedMessage);
      socketRef.current?.close();
      socketRef.current = null;
    };
  }, [user, handleUpdatedMessage]);

  useEffect(() => {
    const disconnectFromSocket = connectToSocket();
    return () => {
      disconnectFromSocket?.();
    };
  }, [connectToSocket]);

  const sortRoomListBasedOnLasMessageTime = useMemo(() => {
    if (!data?.data) return [];
    return data.data.sort((a, b) => {
      if (!a.last_message || !b.last_message) return 0;
      const aMessageDate = a.last_message.date;
      const aMessageTime = a.last_message.time;
      const bMessageDate = b.last_message.date;
      const bMessageTime = b.last_message.time;
      
      const aDateTime = parse(`${aMessageDate}, ${aMessageTime}`, 'dd-MMMM-yyyy, hh:mm a', new Date());
      const bDateTime = parse(`${bMessageDate}, ${bMessageTime}`, 'dd-MMMM-yyyy, hh:mm a', new Date());
      return bDateTime.getTime() - aDateTime.getTime() || 0;
      
    })
  },[data])

  return {
    slug: roomId,
    data: sortRoomListBasedOnLasMessageTime,
    isLoading,
    // socketRef
  };
}
