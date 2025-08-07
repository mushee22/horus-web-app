import { getImageURL } from "@/lib/fetch";
import Image from "next/image";
import React, { useState } from "react";

export default function MessageMediaBody({
  captions,
  mediaUrl,
}: {
  captions: string;
  mediaUrl: string;
}) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      {open ? (
        <div className="fixed  inset-0 flex bg-black/15 flex-col z-30 justify-center items-center">
          <div
            className="absolute z-10 inset-0 bg-black/30"
            onClick={() => setOpen(false)}
          ></div>
          <div className="aspect-video animate-fade z-20 w-[90%]  mx-auto relative">
            <Image
              src={getImageURL(mediaUrl)}
              alt="image"
              fill
              className="object-cover"
            />
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="relative size-full aspect-video">
        {mediaUrl ? (
          <Image
            src={getImageURL(mediaUrl)}
            alt="image"
            fill
            className="object-cover"
            onClick={() => setOpen(true)}
          />
        ) : (
          <div className="size-full flex items-center justify-center">
            <p className="text-sm font-light text-foreground/50">No media</p>
          </div>
        )}
        {
          captions && (
            <p className=" text-sm font-light whitespace-pre-wrap absolute bottom-0 left-0 right-0 p-2 bg-black/80 text-white">
              {captions}
            </p>
          )
        }
      </div>
    </div>
  );
}
