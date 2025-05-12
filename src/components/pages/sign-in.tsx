'use client'

import React from 'react'
import Container from '../elements/container'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

import Image from 'next/image'
import Link from 'next/link'

import DotsPattern from "@/assets/images/dots.png"
import HomrLogo from "@/assets/images/home/home-logo-icon.png"
import Logo from "@/assets/images/logo.svg"

import useSignIn from '@/hook/use-sign-in'

export default function SignInPageContent() {

    const {
        data,
        isPending,
        mutate
    } = useSignIn()


    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        mutate(event)
    }


    return (
        <Container className='mx-auto mt-10'>
            <Pattern />
            <div className="max-w-xl mx-auto ">
                <div className='relative'>
                    <Image
                        src={Logo}
                        alt="Horus Logo"
                        className="mx-auto mb-4 absolute left-1/2 -translate-x-1/2 -translate-y-[25px]"
                    />
                    <Image
                        src={HomrLogo}
                        alt="Horus Logo"
                        className="mx-auto mb-4"
                    />
                </div>
                <div>
                    <h1 className='text-2xl font-semibold mb-6'>Login to your account</h1>
                    <form onSubmit={onSubmit} className="flex flex-col space-y-4  ">
                        {data?.message && (
                            <p className='text-red-500 text-sm font-medium'>{data?.message}</p>
                        )}
                        <div className='flex flex-col gap-y-1'>
                            <label>Email</label>
                            <Input
                                type="email"
                                placeholder="Email"
                                className=""
                                name='email'
                            />
                            {data?.errors?.email && (
                                <p className='text-red-500 text-sm font-medium'>{data?.errors?.email[0]}</p>
                            )}
                        </div>
                        <div className='flex flex-col gap-y-1'>
                            <label>Password</label>
                            <Input
                                type="password"
                                placeholder="Password"
                                className=""
                                name='password'
                            />
                            {data?.errors?.password && (
                                <p className='text-red-500 text-sm font-medium'>{data?.errors?.password[0]}</p>
                            )}
                            <div className='text-right'>
                                <Link href="/forgot-password" className='text-primary text-sm font-medium'>Forgot Password?</Link>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="rounded-xl"
                            disabled={isPending}
                        >
                            Sign In
                        </Button>
                    </form>
                    {/* <div className="flex flex-col items-center justify-center mt-6">
                        <p> {"Don't"} You Have <Link replace href="/sign-up" className='text-primary'>Sign Up</Link> </p>
                    </div> */}
                </div>
            </div>
        </Container>
    )
}


function Pattern() {
    return (
        <>
            <Image
                src={DotsPattern}
                alt="Horus Logo"
                className="mx-auto mb-4 absolute left-3 hidden md:block"
            />

            <Image
                src={DotsPattern}
                alt="Horus Logo"
                className="mx-auto mb-4 absolute right-3 translate-y-[120px] hidden md:block"
            />

            <Image
                src={DotsPattern}
                alt="Horus Logo"
                className="mx-auto mb-4 absolute left-3 bottom-0 -translate-y-[120px] hidden md:block"
            />

            <Image
                src={DotsPattern}
                alt="Horus Logo"
                className="mx-auto mb-4 absolute right-3 bottom-0 -translate-y-[80px] hidden md:block"
            />
        </>
    )
}