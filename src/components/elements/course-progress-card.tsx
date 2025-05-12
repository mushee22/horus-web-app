'use client'

import { CourseProgress, Response } from '@/type';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Progress } from '../ui/progress';

// interface Props {
//     title: string;
//     coureseImage?: string;
//     progress?: number;
//     lastViewedChapter?: string;
// }

export default function CourseProgressCard() {

    // const { title, coureseImage, progress, lastViewedChapter } = props
    

    const { data, } = useQuery<Response<CourseProgress>>({
        queryKey: ['course-progress'],
        queryFn: async () => {
            // const res = await fetcher(USER_COURSE_PROGRESS_URL, {
            //     method: 'GET',
            //     isGuest: false,
            // })
            
            return {
                resp_code: 1,
                message: "",
                data: {
                    total_subchapters: 12, 
                    completed_subchapters: 9
                }
            }
        },
        enabled: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })

    const completedPercentage = data?.data?.completed_subchapters ? (data?.data?.completed_subchapters / data?.data?.total_subchapters) * 100 : 0

    return (
        <div className='border border-foreground/10 rounded-xl p-4 space-y-2.5'>
            <div className='flex items-center gap-x-2'>
                <p className='uppercase font-medium text-[10px]'>course progress</p>
                <Progress
                    value={completedPercentage}
                    max={100}
                    className='flex-1 h-1'
                />
            </div>
            <div className='flex items-center gap-x-4'>
                <p className='text-foreground/50 text-sm font-medium'>CH</p>
                <p className='text-foreground text-sm font-medium flex-1 whitespace-nowrap line-clamp-1'>
                    15. Fundamentals of spending
                </p>
                <Link href={""} className='text-primary font-medium text-sm'>
                    Resume
                </Link>
            </div>
        </div>
    )
}
