'use client'
import Header from "@/components/elements/community/header";
import dynamic from "next/dynamic";

const CommunityList = dynamic(
  () => import("@/components/elements/community/community-list"),
  {
    ssr: false,
  }
);

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
