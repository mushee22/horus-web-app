"use client";
import useCommunity from "@/hook/use-community";
import CommunityCard from "./community-card";

export default function CommunityList() {
  const { data, slug } = useCommunity();

  console.log(slug);

  return (
    <>
      <section className=" pr-1 w-full md:max-w-[420px] min-w-[350px]  h-full block">
        {data?.data?.map((community, index) => (
          <CommunityCard
            {...community}
            key={index}
            isActive={slug == community.id.toString()}
          />
        ))}
      </section>
    </>
  );
}
