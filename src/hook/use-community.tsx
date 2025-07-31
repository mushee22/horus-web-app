import { fetcher } from "@/lib/fetch";
import { Community, Response } from "@/type";
import { useQuery } from "@tanstack/react-query";


export default function useCommunity() {

  const { data, isLoading } = useQuery<Response<Community[]>>({
    queryKey: ["chat-list"],
    queryFn: () => {
      return fetcher("list-rooms/");
    },
  });

  return {
    data,
    isLoading,
  };
}
