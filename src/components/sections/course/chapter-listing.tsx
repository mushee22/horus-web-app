'use client'
import ChapterCard, { LearnContentCardSkeleton } from '@/components/elements/chapter-card'
import { GET_CHPATERS_LIST_URL } from '@/constants/urls'
import { fetcher } from '@/lib/fetch'
import { Chapter, Response } from '@/type'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

export default function ChapterListingSection() {

    const { data, isLoading} = useQuery<Response<Chapter[]>>({
        queryKey: ['chapters'],
        queryFn: async () => {
            const res = await fetcher(GET_CHPATERS_LIST_URL, {
                method: 'GET',
            })
            return res
        },
        enabled: true,
    })


    return (
        <section className='space-y-4 mt-4 md:grid grid-cols-2 gap-x-4 gap-y-4'>
            {isLoading && <LearContentListSkeletonView/>}
            {
                data?.data?.map((chapter, index) => (
                    <Link className='block' key={index} href={`/course/chapter/${chapter?.id}`}>
                        <ChapterCard
                            duration={chapter?.total_duration}
                            numberOfLessons={chapter?.total_subchapters}
                            title={chapter?.title}
                            description={chapter?.description}
                            thumbnail={chapter?.thumbnail}
                            isCompleted={chapter?.completed_subchapters === chapter?.total_subchapters}
                            numberOfCompletedLessons={chapter?.completed_subchapters ?? 0}
                        />
                    </Link>
                ))
            }
        </section>
    )
}


export function LearContentListSkeletonView() {
    return (
        <>
          <LearnContentCardSkeleton/>
          <LearnContentCardSkeleton/>
          <LearnContentCardSkeleton/>
          <LearnContentCardSkeleton/>
          <LearnContentCardSkeleton/>
          <LearnContentCardSkeleton/>
        </>
    )
}