import { BackButton } from "@/components/elements/page-header";
import { Plus, Send } from "lucide-react";

export default function Page() {
  return (
    <div className=" flex-1 flex flex-col relative h-[100dvh] ">
      <div className="shadow-md py-2 h-[60px] sticky top-0 flex gap-x-3  items-center bg-black/50 pl-2">
        <BackButton className="w-9 h-9 md:hidden"/>
        <p className="text-lg font-medium"># Batch 1</p>
      </div>
      <>
        <div className="p-4 flex-1 overflow-y-auto pb-24">
          {
            chats.map((chat, index) => (
              chat.mode == "user" ?
                <div className="flex mb-4 justify-end cursor-pointer" key={index}>
                  <div className="flex  flex-1 flex-col max-w-96 bg-black rounded-lg p-3 gap-3">
                    <p className="text-sm font-medium ">{chat.username}</p>
                    <p className="text-foreground text-sm font-light">{chat.message}</p>
                    <p className="text-foreground/50 text-xs text-end font-light">{chat.time}</p>
                  </div>
                  <div className="w-9 h-9 bg-white self-end rounded-xl flex items-center justify-center mr-2">
                  </div>
                </div> :
                <div className="flex mb-4  cursor-pointer" key={index}>
                  <div className="w-9 h-9 bg-white self-end rounded-xl flex items-center justify-center mr-2">
                  </div>
                  <div className="flex flex-1 flex-col max-w-96 bg-black rounded-lg p-3 gap-3">
                    <p className="text-sm font-medium ">{chat.username}</p>
                    <p className="text-foreground text-sm font-light">{chat.message}</p>
                    <p className="text-foreground/50 text-end text-xs font-light">{chat.time}</p>
                  </div>
                </div>
            ))
          }

        </div>
      </>
      <footer className=" bg-black px-2 sm:px-5 pt-5 pb-8 absolute bottom-0 w-full flex  gap-x-3">
        <div className="size-9 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(119.22deg, rgba(255, 255, 255, 0.05) 8.5%, rgba(255, 255, 255, 0.02) 91.29%)",
          }}
        >
          <Plus size={16} />
        </div>
        <div className="flex items-center h-9 bg-[#FFFFFF14] rounded-[18px] z-10 flex-1">
          <input
            type="text"
            placeholder="Type a message..."
            className=" p-2 rounded-md border-none focus:outline-none placeholder:text-sm placeholder:text-foreground/30 placeholder:font-light"
          />
        </div>
        <div className="size-9 min-w-9 rounded-full flex items-center bg-[#F0B267] justify-center">
          <Send size={16} className="text-black" />
        </div>
      </footer>
    </div>
  )
}


const chats = [
  {
    mode: "user",
    message: "I just bought ETH at $3,200. Do you think it’s a good entry point?",
    username: "TraderJoe",
    time: "2025-05-12 10:05 AM"
  },
  {
    mode: "system",
    message: "Trade Insight: ETH is showing strong support around $3,180. Entry at $3,200 aligns with current trend momentum.",
    username: "TradeBot",
    time: "2025-05-12 10:06 AM"
  },
  {
    mode: "user",
    message: "I just bought ETH at $3,200. Do you think it’s a good entry point?",
    username: "TraderJoe",
    time: "2025-05-12 10:05 AM"
  },

  {
    mode: "system",
    message: "Trade Insight: ETH is showing strong support around $3,180. Entry at $3,200 aligns with current trend momentum.",
    username: "TradeBot",
    time: "2025-05-12 10:06 AM"
  },
  {
    mode: "user",
    message: "Awesome, I’ll keep an eye on the volume. Let me know if there's any shift in the trend.",
    username: "TraderJoe",
    time: "2025-05-12 10:07 AM"
  },
  {
    mode: "system",
    message: "Monitoring active. Alerts will be triggered if ETH drops below $3,150 or spikes above $3,250.",
    username: "TradeBot",
    time: "2025-05-12 10:07 AM"
  }
];


