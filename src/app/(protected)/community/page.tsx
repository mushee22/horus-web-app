import ChatList from "@/components/elements/chat-list";
import { BackButton } from "@/components/elements/page-header";

export default function Page() {
  return (
    <>
      <div className=' px-2 space-y-1  block md:hidden'>
        <div className="shadow-md py-2 bg-black sticky top-0 h-[50px] flex gap-x-3  items-center z-20 pl-2">
          <BackButton />
          <p className="text-base font-medium">Community</p>
        </div>
        <div className=''>
          <ChatList />
        </div>
      </div>
      <div className=" flex-1 hidden md:flex justify-center items-center ">
        <p>No Community Selected</p>
      </div>
    </>
  )
}
