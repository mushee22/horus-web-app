import { getImageURL } from "@/lib/fetch";
import Image from "next/image";
import React from "react";

export default function MessageMediaBody({
  captions,
  mediaUrl,
}: {
  captions: string;
  mediaUrl: string;
}) {
 

  return (
    <div>
      <div className="relative size-full aspect-video">
        {mediaUrl ? (
          <Image
            src={getImageURL(mediaUrl)}
            alt="image"
            fill
            className="object-cover"
          />
        ) : (
          <div className="size-full flex items-center justify-center">
            <p className="text-sm font-light text-foreground/50">No media</p>
          </div>
        )}
        <p className=" text-sm font-light whitespace-pre-wrap absolute bottom-0 left-0 right-0 p-2 bg-black/80 text-white">
          {captions}
        </p>
      </div>
    </div>
  );
}
