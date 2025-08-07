import React from 'react'

export default function MessageCardSkeleton({ index }: { index: number }) {

  const isEven = index % 2 === 0;

  return (
    <div className={`animate-pulse py-6  bg-white rounded-xl my-2 w-[300px] ${isEven ? 'self-end' : 'self-start'}`}>
      <div className="h-6 w-full  rounded-xl overflow-hidden relative"></div>
    </div>
  )
}
