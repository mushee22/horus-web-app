import Container from '../elements/container'
import PageHeader from '../elements/page-header'
import VideoListingSection from '../sections/chapter/video-listing'

export default function ChapterPageContent({ slug }: { slug: string }) {
  return (
    <Container>
      <PageHeader
        pageTitle='Chapter 1: Introduction'
        subTitle='Chapter Title'
        isBackButton
      />
      <VideoListingSection  slug={slug}/>
    </Container>
  )
}
