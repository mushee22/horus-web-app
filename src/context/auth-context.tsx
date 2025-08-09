"use client";
import { USER_URL } from "@/constants/urls";
import { queryClient } from "@/lib/client";
import { fetcher } from "@/lib/fetch";
import { deleteSession, getSession } from "@/lib/session";
import { Student } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
} from "react";

interface AuthContexState {
  isAuthenticated: boolean;
  user: Student | null;
  token: string | null;
  isAuthenticating: boolean;
}

interface AlertProps {
  content: string;
  communityId?: string;
  type: "chat" | "image";
  isOpen: boolean;
}

interface AuthContextProps extends AuthContexState {
  setContextState?: React.Dispatch<React.SetStateAction<AuthContexState>>;
  onLogout?: () => void;
  alertProps?: AlertProps;
  setAlertProps?: React.Dispatch<React.SetStateAction<AlertProps>>;
}

const AuthContext = React.createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  token: null,
  isAuthenticating: true,
});

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();
  const socketRef = useRef<WebSocket | null>(null);

  const [contextState, setContextState] = React.useState<AuthContexState>({
    isAuthenticated: false,
    user: null,
    token: null,
    isAuthenticating: true,
  });

  const [alertProps, setAlertProps] = React.useState<AlertProps>({
    content: "",
    type: "chat",
    isOpen: false,
  });

  const { isLoading, data: sessionData } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { isAuthenticated, token, userId } = await getSession();
      // console.log('sessionData', { isAuthenticated, token, userId });
      return {
        isAuthenticated,
        token,
        userId,
      };
    },
  });

  const {
    data,
    isLoading: IsFetchingUserLoading,
    isError,
  } = useQuery({
    queryKey: ["user", sessionData?.userId],
    queryFn: async () => {
      const { token } = sessionData ?? {};
      if (!token) return null;
      const res = await fetcher(USER_URL, {
        isGuest: false,
      });
      return res;
    },
    enabled: !isLoading,
  });

  const onLogout = async () => {
    await deleteSession();
    setContextState({
      isAuthenticated: false,
      user: null,
      token: null,
      isAuthenticating: false,
    });
    router.replace("/sign-in");
  };

  useEffect(() => {
    if (IsFetchingUserLoading || isLoading) return;

    if (isError) {
      deleteSession();
    }

    if (!sessionData?.isAuthenticated) {
      setContextState({
        isAuthenticated: false,
        user: null,
        token: null,
        isAuthenticating: false,
      });
      return;
    }

    // console.log('Error fetching user data:', data);

    setContextState({
      isAuthenticated: !isError || !!sessionData?.isAuthenticated,
      user: data?.data || null,
      token: sessionData?.token || null,
      isAuthenticating: false,
    });
  }, [data, IsFetchingUserLoading]);

  const handleUpdatedMessage = useCallback(
    (ev: MessageEvent) => {
      const currentMessage = JSON.parse(ev.data);
      if (currentMessage.type == "notification") {
        if (
          currentMessage.sender == data?.user?.id ||
          currentMessage.community_id == pathname.split("/")[2]
        )
          return;
        setAlertProps({
          content: currentMessage.message,
          communityId: currentMessage.community_id,
          type: "chat",
          isOpen: true,
        });
        if (pathname.split("/")[1] == "community") {
          queryClient?.invalidateQueries({ queryKey: ["chat-list"] });
        }
      }
    },
    [pathname, data?.user?.id]
  );

  const connectToSocket = useCallback(() => {
    if (
      !contextState.isAuthenticated ||
      !contextState.user ||
      !contextState?.user.user?.id
    )
      return;
    const userId = contextState.user.user.id;
    const path = `${process.env.NEXT_PUBLIC_WS_URL}notifications/${userId}/`;
    socketRef.current = new WebSocket(path);
    socketRef.current.addEventListener("message", handleUpdatedMessage);
    return () => {
      socketRef.current?.removeEventListener("message", handleUpdatedMessage);
      socketRef.current?.close();
      socketRef.current = null;
    };
  }, [contextState?.user, contextState.isAuthenticated, handleUpdatedMessage]);

  useEffect(() => {
    const disconnectFromSocket = connectToSocket();
    return () => {
      disconnectFromSocket?.();
    };
  }, [connectToSocket]);

  const value = {
    ...contextState,
    setContextState,
    onLogout,
    alertProps,
    setAlertProps,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  return context;
};
