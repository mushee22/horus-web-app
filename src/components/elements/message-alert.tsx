'use client'
import React, { useEffect } from "react";
import { Alert, AlertTitle } from "../ui/alert";
import { MessageSquare } from "lucide-react";
import { useAuthContext } from "@/context/auth-context";

export default function MessageAlert() {
  const { alertProps, setAlertProps } = useAuthContext();

  useEffect(() => {
    if (alertProps?.isOpen) {
      setTimeout(() => {
        setAlertProps?.({
          ...alertProps,
          isOpen: false,
        });
      }, 2000);
    }
  }, [alertProps?.isOpen]);

  if (!alertProps?.isOpen) return null;

  return (
    <Alert className="fixed top-5 z-40 text-black border-white/20 animate-fade bg-primary max-w-[400px] ml-4">
      <MessageSquare />
      <AlertTitle>
        { alertProps.content }
      </AlertTitle>
    </Alert>
  );
}
