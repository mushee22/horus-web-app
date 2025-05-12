import Container from '../elements/container'
import CourseProgressCard from '../elements/course-progress-card'
import PageHeader from '../elements/page-header'
import ChapterListingSection from '../sections/course/chapter-listing'

export default function Course() {
    return (
        <Container>
            <PageHeader
                pageTitle='Learn'
            />
            <section className='mt-4 max-w-2xl'>
                <CourseProgressCard/>
            </section>
            <ChapterListingSection/>
        </Container>
    )
}
