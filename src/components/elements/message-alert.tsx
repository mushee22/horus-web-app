"use client";
import React, { useCallback, useEffect } from "react";
import { Alert, AlertTitle } from "../ui/alert";
import { MessageSquare, XIcon } from "lucide-react";
import { useAuthContext } from "@/context/auth-context";
import { useRouter } from "next/navigation";

export default function MessageAlert() {
  const { alertProps, setAlertProps } = useAuthContext();

  const router = useRouter();

  const handleClose = useCallback(() => {
    if (!alertProps?.isOpen) return;
    setAlertProps?.({
      ...alertProps,
      isOpen: false,
    });
  }, [alertProps, setAlertProps]);

  useEffect(() => {
    if (!alertProps?.isOpen) return;
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [alertProps?.isOpen, handleClose]);

  const handleNavigateToCommunity = () => {
    if (!alertProps?.communityId) return;
    handleClose();
    router.push(`/community/${alertProps?.communityId}`);
  };

  if (!alertProps?.isOpen) return null;

  return (
    <Alert
      onClick={handleNavigateToCommunity}
      className="fixed cursor-pointer top-5 z-40 flex items-center text-black border-white/20 animate-fade bg-primary max-w-[350px] -translate-x-1/2 left-1/2"
    >
      <MessageSquare />
      <AlertTitle className="flex-1 line-clamp-1">
        {alertProps?.content || "New message"}
      </AlertTitle>
      <button
        className="p-1 cursor-pointer bg-white/30 rounded-full"
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
      >
        <XIcon size={14} />
      </button>
    </Alert>
  );
}
