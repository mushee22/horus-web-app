'use client'
import ChapterCard from '@/components/elements/chapter-card'
import { Chapter, Response } from '@/type'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

export default function ChapterListingSection() {

    const { data, } = useQuery<Response<Chapter[]>>({
        queryKey: ['chapters'],
        queryFn: async () => {
            // const res = await fetcher(GET_CHPATERS_LIST_URL, {
            //     method: 'GET',
            // })
            return {
                message: "",
                resp_code: 1,
                data: [
                    {
                        id: 1,
                        total_subchapters: 3,
                        completed_subchapters: 2,
                        total_duration: 900,
                        created_date: "2025-04-28",
                        created_time: "08:00:00",
                        modified_date: "2025-05-10",
                        modified_time: "16:00:00",
                        is_active: true,
                        title: "Basics of Trading",
                        thumbnail: "",
                        description: "Covers terminology and types of financial markets.",
                        duration: 900,
                        order: 1
                    },

                    {
                        id: 2,
                        total_subchapters: 5,
                        completed_subchapters: 3,
                        total_duration: 1500,
                        created_date: "2025-05-01",
                        created_time: "10:00:00",
                        modified_date: "2025-05-11",
                        modified_time: "10:30:00",
                        is_active: true,
                        title: "Technical Analysis",
                        thumbnail: "",
                        description: "Learn how to analyze charts and indicators.",
                        duration: 1500,
                        order: 2
                    },
                    {
                        id: 2,
                        total_subchapters: 5,
                        completed_subchapters: 3,
                        total_duration: 1500,
                        created_date: "2025-05-01",
                        created_time: "10:00:00",
                        modified_date: "2025-05-11",
                        modified_time: "10:30:00",
                        is_active: true,
                        title: "Technical Analysis",
                        thumbnail: "",
                        description: "Learn how to analyze charts and indicators.",
                        duration: 1500,
                        order: 2
                    },
                    {
                        id: 2,
                        total_subchapters: 5,
                        completed_subchapters: 3,
                        total_duration: 1500,
                        created_date: "2025-05-01",
                        created_time: "10:00:00",
                        modified_date: "2025-05-11",
                        modified_time: "10:30:00",
                        is_active: true,
                        title: "Technical Analysis",
                        thumbnail: "",
                        description: "Learn how to analyze charts and indicators.",
                        duration: 1500,
                        order: 2
                    },
                    {
                        id: 2,
                        total_subchapters: 5,
                        completed_subchapters: 3,
                        total_duration: 1500,
                        created_date: "2025-05-01",
                        created_time: "10:00:00",
                        modified_date: "2025-05-11",
                        modified_time: "10:30:00",
                        is_active: true,
                        title: "Technical Analysis",
                        thumbnail: "",
                        description: "Learn how to analyze charts and indicators.",
                        duration: 1500,
                        order: 2
                    }
                ]
            }
        },
        enabled: true,
    })


    return (
        <section className='space-y-4 mt-4 md:grid grid-cols-2 gap-x-4 gap-y-4'>
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
