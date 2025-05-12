'use client'
import { deleteSession, getSession } from '@/lib/session';
import { Student } from '@/type';
import { useQuery } from '@tanstack/react-query';
import React, { PropsWithChildren, useEffect } from 'react';

interface AuthContexState {
    isAuthenticated: boolean;
    user: Student | null,
    token: string | null;
    isAuthenticating: boolean;
}

interface AuthContextProps extends AuthContexState {
    setContextState?: React.Dispatch<React.SetStateAction<AuthContexState>>;
    onLogout?: () => void;
}

const AuthContext = React.createContext<AuthContextProps>({
    isAuthenticated: false,
    user: null,
    token: null,
    isAuthenticating: true,
});



export default function AuthContextProvider({ children }: PropsWithChildren) {

    const [contextState, setContextState] = React.useState<AuthContexState>({
        isAuthenticated: false,
        user: null,
        token: null,
        isAuthenticating: true,
    });

    const { isLoading, data: sessionData } = useQuery({
        queryKey: ['session'],
        queryFn: async () => {
            const { isAuthenticated, token, userId } = await getSession();
            console.log('sessionData', { isAuthenticated, token, userId });
            return {
                isAuthenticated,
                token,
                userId,
            };
        },

    });

    const { data, isLoading: IsFetchingUserLoading, isError } = useQuery({
        queryKey: ['user', sessionData?.userId],
        queryFn: async () => {
            const { token } = sessionData ?? {};
            if (!token) return null;
            // const res = await fetcher(USER_URL, {
            //     isGuest: false,
            // });
            const data = {
                data: {
                    id: 1,
                    user: {
                        id: 2,
                        first_name: "Rahul",
                        last_name: "Kumar",
                        email: "rahul.kumar@example.com",
                        phone: "+919999999999"
                    },
                    created_date: "2025-04-25",
                    created_time: "09:00:00",
                    modified_date: "2025-05-10",
                    modified_time: "15:30:00",
                    is_active: true,
                    group_code: "GRP2025A",
                    profile_image: "",
                    student_bio: "Passionate about finance and crypto."
                }
            };
            return data;
        },
        enabled: !isLoading,
    })

    const onLogout = async () => {
        await deleteSession();
        setContextState({
            isAuthenticated: false,
            user: null,
            token: null,
            isAuthenticating: false,
        });
    }

    useEffect(() => {
        if (IsFetchingUserLoading || isLoading) return

        if (isError) {
            deleteSession();

        }

        if (!sessionData?.isAuthenticated) {
            setContextState({
                isAuthenticated: false,
                user: null,
                token: null,
                isAuthenticating: false,
            })
            return
        }

        console.log('Error fetching user data:', data);

        setContextState({
            isAuthenticated: !isError || !!sessionData?.isAuthenticated,
            user: data?.data || null,
            token: sessionData?.token || null,
            isAuthenticating: false,
        })

    }, [data, IsFetchingUserLoading])



    const value = {
        ...contextState,
        setContextState,
        onLogout
    }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )


}


export const useAuthContext = () => {
    const context = React.useContext(AuthContext);
    return context;
}