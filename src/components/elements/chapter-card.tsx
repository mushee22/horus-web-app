import { secondsToMinutes } from '@/lib/utils';
import Image from 'next/image';
import { useMemo } from 'react';
import { Progress } from '../ui/progress';

interface ChapterCardProps {
    title: string;
    description?: string;
    isCompleted?: boolean;
    // onClick: () => void;
    duration: number;
    numberOfLessons: number;
    numberOfCompletedLessons?: number;
    thumbnail?: string;
    // onProgressChange: (progress: number) => void;
}

export default function ChapterCard({ thumbnail, numberOfLessons, numberOfCompletedLessons, duration, title, }: ChapterCardProps) {

    const progress = useMemo(() => {
        return Math.round(((numberOfCompletedLessons || 0) / numberOfLessons) * 100)
    }, [numberOfCompletedLessons, numberOfLessons])

    const { durationText } = secondsToMinutes(duration)

    return (
        <div className='flex gap-x-3 items-center p-2 rounded-xl hover:bg-gradient-to-r from-foreground/5 to-foreground/10'>
            <div className='w-13 h-14 rounded-xl bg-[#D9D9D9] relative overflow-scroll'>
                {
                    thumbnail &&
                    <Image
                        src={thumbnail}
                        alt={title}
                        fill
                        sizes='84px'
                    />
                }
            </div>
            <div className='flex-1 space-y-1'>
                <div className='flex justify-between items-center'>
                    <h3>
                        <span className='text-sm font-semibold'>{title}</span>
                    </h3>
                    {
                        progress ?
                            <div className='flex gap-x-2 items-center'>
                                <span className='text-xs  font-light text-foreground/50'>{numberOfLessons} Videos</span>
                                <div className='w-[1px] bg-foreground/10 h-[8px]'></div>
                                <span className='text-xs  font-light text-foreground/50'>{durationText} min</span>
                            </div>
                            :
                            <></>
                    }
                </div>
                {
                    progress ?

                        <div className='flex items-center gap-x-3'>
                            <Progress value={progress} max={100} className='flex-1 h-1' />
                            <span className='text-xs  font-light text-foreground/50'>{progress}%</span>
                        </div>
                        :
                        <div className='flex gap-x-2 items-center'>
                            <span className='text-xs  font-light text-foreground/50'>{numberOfLessons} Videos</span>
                            <div className='w-[1px] bg-foreground/10 h-[8px]'></div>
                            <span className='text-xs  font-light text-foreground/50'>{durationText} min</span>
                        </div>
                }
            </div>
        </div>
    )
}
