
import { fetcher } from "@/lib/fetch";
import { Community, Response } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function useCommunity() {
  const roomId = useParams().slug as string;

  const { data, isLoading } = useQuery<Response<Community[]>>({
    queryKey: ["chat-list"],
    queryFn: () => {
      return fetcher("list-rooms/");
    },
    refetchOnMount: 'always'
  });



  return {
    slug: roomId,
    data,
    isLoading,
  };
}
