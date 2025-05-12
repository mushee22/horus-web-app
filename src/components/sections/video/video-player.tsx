
import { Response, SubChapter } from "@/type"
import { useQuery } from "@tanstack/react-query"
import dynamic from "next/dynamic"

const Player = dynamic(() => import("@/components/elements/player"), { ssr: false })

interface Props {
  slug?: string
}

export default function VideoPlayerSection({ slug }: Props) {

  const { data, } = useQuery<Response<SubChapter>>({
    queryKey: ['sub-chapter', slug],
    queryFn: async () => {
      // const res = await fetcher(GET_SUBCHAPTER_DETAILS_URL.replace(":id", slug ?? ''), {
      //   method: 'GET',
      // })
      return {
        message: "",
        resp_code: 1,
        data:  {
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
          video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
          thumbnail: "https://example.com/thumbs/intro.jpg",
          duration: 300,
          order: 1,
          chapter: 1,
          progress: {
            id: 202,
            created_date: "2025-05-02",
            created_time: "10:00:00",
            modified_date: "2025-05-12",
            modified_time: "14:30:00",
            is_active: true,
            is_completed: false,
            watched_duration: 0,
            last_watched_at: "2025-05-12T14:30:00Z",
            student: 1,
            sub_chapter: 2
          }
        },
      }
    },
    enabled: true,
  })

  return (
    <div className='space-y-3 mt-4 flex-1 md:max-w-[60vw]'>
      <Player
        url={data?.data?.video ?? ''}
        light={data?.data?.thumbnail ?? ''}
        videoId={data?.data?.id}
        watchedDuration={data?.data?.progress?.watched_duration}
        isCompleted={data?.data?.progress?.is_completed}
      />
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <p className='font-medium'>{data?.data?.title}</p>
          <span className='text-xs font-light text-foreground/50'>120 Min</span>
        </div>
        <p className='text-xs font-light p-3'>
          {data?.data?.description}
        </p>
      </div>
    </div>
  )
}
