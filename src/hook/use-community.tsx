// import { useAuthContext } from "@/context/auth-context";
import { fetcher } from "@/lib/fetch";
import { Community, Response } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
// import useWs from "./use-ws";

export default function useCommunity() {
  const roomId = useParams().slug as string;

  // const { user } = useAuthContext();

  const { data, isLoading, } = useQuery<Response<Community[]>>({
    queryKey: ["chat-list"],
    queryFn: () => {
      return fetcher("list-rooms/");
    },
    refetchOnMount: "always",
  });

  // const handleUpdatedMessage = (ev: MessageEvent) => {
  //   const currentMessage = JSON.parse(ev.data);
  //   if (currentMessage.type == "notification") {
  //     refetch();
  //   }
  // };

  // const { socketRef } = useWs({
  //   path: `notifications/${user?.user.id}`,
  //   isEnabled: !!user,
  //   onMessage: handleUpdatedMessage,
  //   onClose: () => {},
  //   onOpen: () => {},
  //   onError: () => {},
  // });

  return {
    slug: roomId,
    data,
    isLoading,
    // socketRef
  };
}
