import useChat from "@/hook/use-chat";
import { Plus } from "lucide-react";
import React from "react";

export default function ChatMediaPicker() {

  const { onMediaPick } = useChat();

  return (
    <div className="">
      <label
        htmlFor="media-picker"
        className="flex justify-center items-center size-9 rounded-full  bg-[#F0B267]"
      >
        <input
          id="media-picker"
          type="file"
          className="invisible w-0 h-0"
          accept="image/*"
          onChange={onMediaPick}
        />
        <Plus size={16} />
      </label>
    </div>
  );
}
