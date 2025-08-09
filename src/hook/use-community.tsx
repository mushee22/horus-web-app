
import { fetcher } from "@/lib/fetch";
import { Community, Response } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import {  useMemo } from "react";
import { parse } from 'date-fns'
// import useWs from "./use-ws";

export default function useCommunity() {
  const roomId = useParams().slug as string;

  

 

  const { data, isLoading } = useQuery<Response<Community[]>>({
    queryKey: ["chat-list"],
    queryFn: () => {
      return fetcher("list-rooms/");
    },
    refetchOnMount: "always",
  });

 

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
