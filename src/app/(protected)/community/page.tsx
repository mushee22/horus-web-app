import CommunityList from "@/components/elements/community/community-list";
import Header from "@/components/elements/community/header";

export default function Page() {
  return (
    <>
      <div className=" px-2 space-y-1  block md:hidden">
        <Header />
        <CommunityList />
      </div>
      <div className=" flex-1 hidden md:flex justify-center items-center ">
        <p>No Community Selected</p>
      </div>
    </>
  );
}
