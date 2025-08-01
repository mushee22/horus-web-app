import { getImageURL } from "@/lib/fetch";
import { cn, getInitials } from "@/lib/utils";
import { Message, Student } from "@/type";
import Image from "next/image";
import MessageTexBody from "./message-text-body";
import MessageMediaBody from "./message-media-body";

const MessageCard = ({
  chat,
  userType,
  user,
}: {
  chat: Message;
  userType: "user" | "system";
  user: Student;
}) => {
  const isUser = userType == "user";

  const initials = getInitials(
    chat?.sender?.user?.first_name || user?.user?.first_name
  );

  return (
    <div className={cn("flex", isUser ? "justify-end" : "")}>
    <div
      className={cn("flex mb-4 w-fit min-w-[300px]  cursor-pointer", isUser ? "justify-end " : "")}
    >
        {isUser ? (
          <></>
        ) : (
          <div className="w-9 h-9 bg-white self-end rounded-xl overflow-hidden flex items-center justify-center mr-2">
            {user?.profile_image ? (
              <Image
                src={getImageURL(user?.profile_image ?? "")}
                alt="profile"
                width={36}
                height={36}
              />
            ) : (
              <div className="size-full flex items-center text-black justify-center">
                <p className="text-sm font-medium">{initials}</p>
              </div>
            )}
          </div>
        )}
      <div className={cn("flex  flex-1 flex-col max-w-96  rounded-lg p-3 gap-3", isUser ? 'bg-[#F0B2671A]' : 'bg-[#FFFFFF0F]')}>
        {isUser ? (
          <></>
        ) : (
          <p className="text-sm font-medium ">
            {chat?.sender?.user?.first_name || user?.user?.first_name}
          </p>
        )}
        {chat.image ? (
          <MessageMediaBody captions={chat.content} mediaUrl={chat.image} />
        ) : (
          <MessageTexBody body={chat.content} />
        )}
        <p className="text-foreground/50 text-xs text-end font-light">
          {chat.time}
        </p>
      </div>
    </div>
    </div>
  );
};

export default MessageCard;
