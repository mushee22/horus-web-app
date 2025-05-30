"use client"
import { CommiunityIcon, LearnIcon, ProfileIcon } from "@/components/elements/icons"
import { nunito } from '@/lib/font'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MobileNavBar() {

    const  pathname = usePathname();

    // const isHideMobileNavBar = pathname.includes('community')

  

    return (
        <div className={cn('fixed z-20 bottom-0 inset-x-0 md:inset-y-0 md:w-[230px] max-md:h-[83px] md:pt-8 flex md:flex-col max-md:items-center max-md:justify-around')}
            style={{
                background: "linear-gradient(90deg, rgba(0, 0, 0, 0.47) 0%, rgba(0, 0, 0, 0.46) 100%)",
                backdropFilter: "blur(60px)"
            }}
        >
            {
                menues.map((menu) => (
                    <Link  href={menu.path} key={menu.title} className={cn(nunito.className, 'cursor-pointer flex text-[10px] md:text-base text-primary flex-col md:flex-row md:py-3 md:px-4 md:justify-start gap-x-2 justify-center items-center md:hover:bg-gradient-to-l md:hover:from-foreground/5 md:to-foreground/10')}>
                        <menu.icon isActive={pathname == menu.path}/>
                        <span className={cn( pathname == menu.path ? "text-primary" : 'text-muted' )}>{menu.title}</span>
                    </Link>
                ))
            }
        </div>
    )
}


const menues = [
    {
        title: "Community",
        path: "/community",
        icon: CommiunityIcon
    },
    {
        title: "Learn",
        path: "/",
        icon: LearnIcon
    },
    {
        title: "Profile",
        path: "/profile",
        icon: ProfileIcon
    }
]

