import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";

import EmojiPicker, { Theme } from "emoji-picker-react";

export default function EmojiPickerPopup({
  onEmojiClick,
}: {
  onEmojiClick?: (emoji: string) => void;
}) {
  return (
    <div>
      <Popover>
        <PopoverTrigger className=" size-9 max-md:hidden text-3xl cursor-pointer rounded-full flex items-center justify-center">
          &#128512;
        </PopoverTrigger>
        <PopoverContent className="bg-white rounded-lg p-0 border-0  w-auto overflow-y-auto">
          <EmojiPicker
            onEmojiClick={(emoji) => onEmojiClick?.(emoji.emoji)}
            theme={Theme.DARK}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
