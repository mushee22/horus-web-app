import React from 'react'

export default function CommunityCardSkeleton() {
  return (
    <div>
      <div className={"flex w-full  md:w-[320px] items-center gap-x-3.5 p-2 hover:bg-gradient-to-r from-foreground/5 to-foreground/10 rounded-md cursor-pointer"}>
          <div className="h-[52px] w-[52px] bg-primary/80 animate-pulse text-black rounded-xl overflow-hidden relative"></div>
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center  gap-x-2">
              <h2 className="text-base font-medium bg-foreground/80 rounded-full flex-1 py-1.5 animate-pulse text-primary"></h2>
              <p className="text-xs text-foreground/50 bg-foreground/80 font-light py-1 animate-pulse"></p>
            </div>
            <div className="flex items-center justify-between py-1 animate-pulse bg-foreground/80 max-w-[80%] rounded-full">
            </div>
          </div>
        </div>
    </div>
  )
}
