import { Response, SubChapter } from '@/type'
import { useQuery } from '@tanstack/react-query'

export async function getChapterById({ queryKey }: { queryKey: readonly unknown[] }) {
    const id = queryKey[1]
    console.log(id)
    // const res = await fetcher(GET_CHAPTER_DETAILS_URL.replace(":id", `${id}`), {
    //     method: 'GET',
    // })
    return {
        message: "",
        resp_code: 1,
        data: [
            {
                id: 1,
                chapter_name: "Basics of Trading",
                is_completed: true,
                created_date: "2025-04-28",
                created_time: "08:15:00",
                modified_date: "2025-05-11",
                modified_time: "13:22:00",
                is_active: true,
                title: "What is Trading?",
                description: "Intro to financial trading and market participants.",
                video: "https://example.com/videos/intro.mp4",
                thumbnail: "",
                duration: 300,
                order: 1,
                chapter: 1,
                progress: {
                    id: 201,
                    created_date: "2025-05-01",
                    created_time: "09:10:00",
                    modified_date: "2025-05-11",
                    modified_time: "13:22:00",
                    is_active: true,
                    is_completed: true,
                    watched_duration: 300,
                    last_watched_at: "2025-05-11T13:22:00Z",
                    student: 1,
                    sub_chapter: 1
                  }
            },
            {
                id: 2,
                chapter_name: "Basics of Trading",
                is_completed: false,
                created_date: "2025-04-29",
                created_time: "09:00:00",
                modified_date: "2025-05-12",
                modified_time: "14:30:00",
                is_active: true,
                title: "Market Types",
                description: "Covers spot, futures, and options markets.",
                video: "https://example.com/videos/markets.mp4",
                thumbnail: "",
                duration: 600,
                order: 2,
                chapter: 1,
                progress:  {
                    id: 202,
                    created_date: "2025-05-02",
                    created_time: "10:00:00",
                    modified_date: "2025-05-12",
                    modified_time: "14:30:00",
                    is_active: true,
                    is_completed: false,
                    watched_duration: 180,
                    last_watched_at: "2025-05-12T14:30:00Z",
                    student: 1,
                    sub_chapter: 2
                  }
            },
            {
                id: 3,
                chapter_name: "Basics of Trading",
                is_completed: true,
                created_date: "2025-04-28",
                created_time: "08:15:00",
                modified_date: "2025-05-11",
                modified_time: "13:22:00",
                is_active: true,
                title: "What is Trading?",
                description: "Intro to financial trading and market participants.",
                video: "https://example.com/videos/intro.mp4",
                thumbnail: "",
                duration: 300,
                order: 1,
                chapter: 1,
                progress: {
                    id: 201,
                    created_date: "2025-05-01",
                    created_time: "09:10:00",
                    modified_date: "2025-05-11",
                    modified_time: "13:22:00",
                    is_active: true,
                    is_completed: true,
                    watched_duration: 300,
                    last_watched_at: "2025-05-11T13:22:00Z",
                    student: 1,
                    sub_chapter: 1
                  }
            },
            {
                id: 4,
                chapter_name: "Basics of Trading",
                is_completed: false,
                created_date: "2025-04-29",
                created_time: "09:00:00",
                modified_date: "2025-05-12",
                modified_time: "14:30:00",
                is_active: true,
                title: "Market Types",
                description: "Covers spot, futures, and options markets.",
                video: "https://example.com/videos/markets.mp4",
                thumbnail: "",
                duration: 600,
                order: 2,
                chapter: 1,
                progress:  {
                    id: 202,
                    created_date: "2025-05-02",
                    created_time: "10:00:00",
                    modified_date: "2025-05-12",
                    modified_time: "14:30:00",
                    is_active: true,
                    is_completed: false,
                    watched_duration: 180,
                    last_watched_at: "2025-05-12T14:30:00Z",
                    student: 1,
                    sub_chapter: 2
                  }
            }
        ]
    }
}


export default function useGetChapterById(id: string) {

    const { data, } = useQuery<Response<SubChapter[]>>({
        queryKey: ['chapters', id],
        queryFn: getChapterById,
        enabled: true,
    })
    const completedChapters = data?.data?.filter((chapter) => chapter.is_completed).length ?? 0

    return {
        subChapter: data?.data ?? [],
        completedChapters: completedChapters
    }
}
