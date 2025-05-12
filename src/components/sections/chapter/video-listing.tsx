'use client'

import VideoCard from '@/components/elements/video-card'
import useGetChapterById from '@/hook/use-get-chapter-by-id'
import Link from 'next/link'


export default function VideoListingSection({ slug }: { slug?: string }) {

    const { completedChapters, subChapter } = useGetChapterById(slug ?? '')

    return (
        <section className='mt-8'>
            <div className='flex justify-between text-xs font-medium'>
                <span className=''>Video</span>
                <span>{completedChapters}/{subChapter?.length ?? 0}</span>
            </div>
            <div className='flex flex-col md:grid grid-cols-2 gap-y-4 mt-4'>
                {
                    subChapter?.map((subChapter) => (
                        <Link className='inline-block' href={`/course/chapter/${slug}/video/${subChapter.id}`} key={subChapter.id}>
                            <VideoCard
                                duration={subChapter.duration}
                                progress={0}
                                title={subChapter.title}
                                isCompleted={subChapter.is_completed}
                                thumbnail={subChapter.thumbnail ?? ''}
                            />
                        </Link>
                    ))
                }
            </div>
        </section>
    )
}
