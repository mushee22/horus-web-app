import Container from '../elements/container'
import VideoListingSection from '../sections/chapter/video-listing'

export default function ChapterPageContent({ slug }: { slug: string }) {
  return (
    <Container>
      
      <VideoListingSection  slug={slug}/>
    </Container>
  )
}
