'use client'

import { USER_COURSE_PROGRESS_URL } from '@/constants/urls';
import { fetcher } from '@/lib/fetch';
import { CourseProgress, Response } from '@/type';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Progress } from '../ui/progress';


export default function CourseProgressCard() {

    const { data, isLoading } = useQuery<Response<CourseProgress>>({
        queryKey: ['course-progress'],
        queryFn: async () => {
            const res = await fetcher(USER_COURSE_PROGRESS_URL, {
                method: 'GET',
                isGuest: false,
            })

            return res
        },
        enabled: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })

    const completedPercentage = data?.data?.completed_subchapters && data?.data?.total_subchapters
        ? Number(((data.data.completed_subchapters / data.data.total_subchapters) * 100).toFixed(2))
        : 0
    const lastViewedVideo = data?.data?.last_watched_sub_chapter


    if(isLoading) return <SkeletonView/>


    return (
        <>
            <div className='border border-foreground/10 rounded-xl p-4 space-y-2.5'>
                {
                    !data?.data ?
                        <></>
                        :
                        <>
                            <div className='flex items-center gap-x-2'>
                                <p className='uppercase font-medium text-[10px]'>Progress</p>
                                <Progress
                                    value={completedPercentage}
                                    max={100}
                                    className='flex-1 h-1'
                                />
                                <p className='uppercase font-medium text-[10px]'>{completedPercentage}%</p>
                            </div>
                            {
                                lastViewedVideo ?
                                    <div className='flex items-center gap-x-4'>
                                        {/* <p className='text-foreground/50 text-sm font-medium'></p> */}
                                        <p className='text-foreground text-sm font-medium flex-1 whitespace-nowrap line-clamp-1'>
                                            {lastViewedVideo.title}
                                        </p>
                                        <Link href={`/course/chapter/${lastViewedVideo.chapter}/video/${lastViewedVideo.id}`} className='text-primary font-medium text-sm'>
                                            Resume
                                        </Link>
                                    </div>
                                    :
                                    <></>
                            }
                        </>
                }
            </div>

        </>
    )
}


function SkeletonView() {
    return (
        <div className="border border-foreground/10 rounded-xl p-4 space-y-2.5">
            <div className="animate-pulse flex items-center gap-x-2">
                <div className='uppercase font-medium text-[10px] h-1 bg-white w-10 rounded-md'></div>
                <div className='uppercase font-medium text-[10px] h-1 bg-white  rounded-md flex-1'></div>
                <div className='uppercase font-medium text-[10px] h-1 bg-white w-5 rounded-md'></div>
            </div>
            <div className="animate-pulse flex items-center gap-x-4">
                <div className='uppercase font-medium text-[10px] h-[6px] bg-white  rounded-md flex-1'></div>
                <div className='uppercase font-medium text-[10px] h-[12px] bg-white w-10 rounded-md'></div>
            </div>
        </div>
    )
}
