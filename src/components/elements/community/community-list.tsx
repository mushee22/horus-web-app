"use client";
import useCommunity from "@/hook/use-community";
import CommunityCard from "./community-card";
import CommunityCardSkeleton from "./community-card-skeleton";

export default function CommunityList() {
  const { data, slug, isLoading } = useCommunity();

  console.log(slug);

  return (
    <>
      <section className=" pr-1 w-full md:max-w-[420px] min-w-[350px]  h-full block">
        {isLoading
          ? Array.from({ length: 7 }).map((_, index) => (
              <CommunityCardSkeleton key={index} />
            ))
          : data?.data?.map((community, index) => (
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
