import { GET_CHAPTER_DETAILS_URL } from '@/constants/urls'
import { fetcher } from '@/lib/fetch'
import { Response, SubChapter } from '@/type'
import { useQuery } from '@tanstack/react-query'

export async function getChapterById({ queryKey }: { queryKey: readonly unknown[] }) {
    const id = queryKey[1]
    console.log(id)
    const res = await fetcher(GET_CHAPTER_DETAILS_URL.replace(":id", `${id}`), {
        method: 'GET',
    })
    return res
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
