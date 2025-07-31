"use client";
import useCommunity from "@/hook/use-community";
import CommunityCard from "./community-card";

export default function CommunityList() {

  const { data } = useCommunity();

  return (
    <>
      <section className=" pr-1 w-full md:max-w-[420px]  h-full block">
        {data?.data?.map((community, index) => (
          <CommunityCard {...community} key={index} />
        ))}
      </section>
    </>
  );
}
