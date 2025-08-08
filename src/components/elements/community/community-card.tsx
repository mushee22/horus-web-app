import useIsMobile from "@/hook/use-is-mobile";
import { getImageURL } from "@/lib/fetch";
import { cn, getDisplayName, getInitials } from "@/lib/utils";
import { Community } from "@/type";
import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface Props extends Community {
  show?: boolean;
  isActive?: boolean;
}

export default function CommunityCard({
  id,
  profile_image = "",
  name = "",
  unread_count = 0,
  last_message,
  isActive = false,
}: Props) {
  const lastMessageTime = last_message?.time ?? "";

  const displayName = getDisplayName(name);
  const initials = getInitials(displayName);

  const { isMobile } = useIsMobile();
  const router = useRouter();

  const handleGotoNextPage = () => {
    const gotoPage = `/community/${id}`;
    if (!isMobile) {
      router.replace(gotoPage);
      return;
    }
    router.push(gotoPage);
  };

  return (
    <>
      <button className="w-full md:max-w-[320px]" onClick={handleGotoNextPage}>
        <div
          className={cn(
            "flex w-full items-center gap-x-3.5 p-2 hover:bg-gradient-to-r from-foreground/5 to-foreground/10 rounded-md cursor-pointer",
            isActive ? "bg-foreground/10" : ""
          )}
        >
          <div className="h-[52px] w-[52px] bg-white text-primary rounded-xl overflow-hidden relative">
            {profile_image ? (
              <Image
                src={getImageURL(profile_image)}
                alt={name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="size-full flex items-center   justify-center">
                <p className="text-sm font-bold">{initials}</p>
              </div>
            )}
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center  gap-x-2">
              <h2 className="text-base font-medium  text-primary">{`#${displayName}`}</h2>
              <p className="text-xs text-foreground/50 font-light">
                {lastMessageTime ?? ""}
              </p>
            </div>
            <div className="flex items-center justify-between">
              {last_message?.image ? (
                <div className="flex items-center gap-x-2">
                  <ImageIcon size={20} />
                  <p className="text-sm font-light  line-clamp-1  text-foreground/50 max-w-[250px] ">
                    {last_message?.content}
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-sm font-light  line-clamp-1  text-foreground/50 max-w-[250px]">
                    {last_message?.content}
                  </p>
                </>
              )}

              {unread_count > 0 && (
                <p className="text-xs text-black rounded-xl font-light px-2 py-[2px] bg-primary">
                  {unread_count}
                </p>
              )}
            </div>
          </div>
        </div>
      </button>
    </>
  );
}
