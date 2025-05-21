
import MobileNavBar from '@/components/layout/mobile-nav-bar'
import AuthContextProvider from '@/context/auth-context'
import { getSession } from '@/lib/session'
import { PropsWithChildren } from 'react'


export default async function layout({ children }: PropsWithChildren) {

    // const pathname = usePathname()

    const { isAuthenticated } = await getSession();

    // const isHideMobileNavBar = pathname.includes('community')


    // if (!isAuthenticated) redirect('/sign-in');

    return (
        <div className={'md:pl-[230px]  relative'}>
            <AuthContextProvider>
                {children}
                <MobileNavBar />
            </AuthContextProvider>
        </div>
    )
}
