'use client'
import { useAuthContext } from '@/context/auth-context'
import Container from '../elements/container'
import PageHeader from '../elements/page-header'
import PasswordUpdateForm from '../sections/profile/password-update-form'

export default function UpdatePassword() {
   
    const { user } = useAuthContext();

    return (
        <Container>
            <PageHeader
                pageTitle="Update Password" 
                isBackButton
            />
            <PasswordUpdateForm/>
        </Container>
    )
}
