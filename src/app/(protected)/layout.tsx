
import MessageAlert from '@/components/elements/message-alert';
import MobileNavBar from '@/components/layout/mobile-nav-bar';
import AuthContextProvider from '@/context/auth-context';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';


export default async function layout({ children }: PropsWithChildren) {

    const { isAuthenticated } = await getSession();

    if (!isAuthenticated) redirect('/sign-in');

    return (
        <div className={'md:pl-[230px]  relative'}>
            <AuthContextProvider>
                {children}
                <MobileNavBar />
                <MessageAlert/>
            </AuthContextProvider>
        </div>
    )
}
