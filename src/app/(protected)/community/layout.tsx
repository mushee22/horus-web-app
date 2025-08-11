import CommunityList from "@/components/elements/community/community-list";
import Container from "@/components/elements/container";
import { PropsWithChildren } from "react";

export default  function layout({ children }: PropsWithChildren) {

  return (
    <Container className=" pt-0 pl-0 !pr-0 pb-0 md:pl-0 flex md:py-0 flex-col">
      <div className="md:flex-1  md:flex">
        <div className="bg-black h-screen overflow-y-auto px-2 space-y-3  hidden md:block">
          <div className="shadow-md bg-black sticky top-0 py-2 h-[70px] flex  items-center z-10 pl-2">
            <p className="text-xl font-medium">Community</p>
          </div>
          <div className="">
            <CommunityList />
          </div>
        </div>
        {children}
      </div>
    </Container>
  );
}
