import { cn } from "@/lib/utils";
import { Loader2, Send } from "lucide-react";
import React from "react";

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export default function ChatSendMessageButton({
  onClick,
  disabled,
  isLoading,
  className,
  ...props
}: Props) {
  return (
    <button
      disabled={disabled}
      className={cn("size-9 min-w-9 disabled:cursor-not-allowed rounded-full flex items-center bg-[#F0B267] justify-center", className)}
      onClick={onClick}
      {...props}
    >
      {isLoading ? (
        <Loader2 size={16} className="text-black animate-spin" />
      ) : (
        <Send size={16} className="text-black" />
      )}
    </button>
  );
}
