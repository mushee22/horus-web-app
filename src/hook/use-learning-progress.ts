import { UPDATE_VIDEO_PROGRESS_URL } from "@/constants/urls"
import { fetcher } from "@/lib/fetch"
import { useMutation } from "@tanstack/react-query"

export default function useLearningProgress() {

    const { mutate } = useMutation({
        mutationKey: ['updateCourseProgress'],
        mutationFn: async ({ videoId, progress, isCompleted }: { videoId?: number, progress: number, isCompleted?: boolean }) => {
            console.log('videoId', videoId)
            if (!videoId) return
            const res = await fetcher(UPDATE_VIDEO_PROGRESS_URL, {
                method: 'POST',
                body: JSON.stringify({
                    sub_chapter_id: videoId,
                    watched_duration: progress,
                    is_completed: isCompleted
                }),
                isGuest: false,
            })
            return res
        }
    })

    return {
        onUpdateVideoProgress: mutate
    }
}
