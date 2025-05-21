'use client'
import Container from '../elements/container'
import PageHeader from '../elements/page-header'
import RelatedVideoSection from '../sections/video/related-video-list'
import VideoPlayerSection from '../sections/video/video-player'

export default function VideoPageContent({ chapterId, videoId }: { chapterId?: string, videoId: string }) {

    return (
        <Container>
            <PageHeader
                isBackButton
                pageTitle='Video'
            />
            <div className='flex flex-col lg:flex-row gap-x-6'>
                <VideoPlayerSection slug={videoId} />
                <RelatedVideoSection
                    slug={chapterId}
                    videoId={videoId}
                />
            </div>
        </Container>
    )
}
