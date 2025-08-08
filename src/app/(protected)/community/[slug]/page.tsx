'use client'
import dynamic from "next/dynamic";

const ChatRoom = dynamic(() => import("@/components/elements/chat"), {
  ssr: false,
});

export default function Page() {
   return (
    <ChatRoom/>
   )
}
