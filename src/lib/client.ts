import { Community, Response } from "@/type";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: 1, // Reduced retry attempts
      staleTime: 5 * 60 * 1000, // 5 minutes default stale time
      gcTime: 10 * 60 * 1000, // 10 minutes garbage collection time
      refetchOnMount: true,
    },
    mutations: {
      retry: 1,
      retryDelay: 1000,
    },

  },
})

export const handleUpdateCommunity = (roomId: number, type: "increase" | 'reset', unreadCount = 0, lastMessage = '') => {
  queryClient.setQueryData(["chat-list"], (oldData: Response<Community[]>) => {
    if (!oldData) return oldData;
    return {
      // ...oldData,
      data: oldData?.data?.map((item) => {
        if (item.id == roomId) {
          const countToUpdate = type == 'increase' ? (item?.unread_count || 0) + unreadCount : 0;
          const updatedCount = countToUpdate;
          const updatedLastMessage = lastMessage ? {
            ...item.last_message,
            content: lastMessage,
          } : item.last_message;
          return {
            ...item,
            unread_count: updatedCount,
            last_message: updatedLastMessage,
          }
        }
        return item;
      })
    }
  }
  );
}
