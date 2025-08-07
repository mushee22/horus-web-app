import { queryClient } from "@/lib/client";
import { fetcher } from "@/lib/fetch";
import { Community, Response } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function useCommunity() {
  const roomId = useParams().slug as string;

  const { data, isLoading } = useQuery<Response<Community[]>>({
    queryKey: ["chat-list"],
    queryFn: () => {
      return fetcher("list-rooms/");
    },
  });

  useEffect(() => {
     queryClient.invalidateQueries({queryKey: ["chat-list"]})
  },[])

  return {
    slug: roomId,
    data,
    isLoading,
  };
}
