'use client'
import { useAuthContext } from '@/context/auth-context'
import Container from '../elements/container'
import CourseProgressCard from '../elements/course-progress-card'
import PageHeader from '../elements/page-header'
import ProfileSettingsMenu from '../elements/profile-settings-menu'
import UserDetails from '../sections/profile/user-details'

export default function Profile() {

  const { user, isAuthenticating } = useAuthContext()

  return (
    <Container className='space-y-4'>
      <PageHeader
        pageTitle='Profile'
        endIcon={<>
          <ProfileSettingsMenu />
        </>}
      />
      {
        !isAuthenticating ?
          <UserDetails
            name={user?.user?.first_name + ' ' + (user?.user?.last_name ?? '')}
            role='Learner'
            bio={user?.student_bio ?? ''}
            email={user?.user?.email ?? ''}
            imageUrl={user?.profile_image ?? ''}
          />
          :
        <></>
      }
      <CourseProgressCard/>
    </Container>
  )
}


