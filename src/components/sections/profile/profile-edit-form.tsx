

import useProfileMutation from '@/hook/use-profile-edit';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


export default function ProfileEditForm() {

    const {
        mutate,
        isPending,
        data,
        userState,
        handleChange,
    } = useProfileMutation()

    return (
        <section className='mt-10'>
            <form onSubmit={mutate} className='flex flex-col gap-y-5 max-w-xl '>
                {
                    data?.message && (
                        <p className='text-red-500 text-sm font-medium'>{data?.message}</p>
                    )
                }
                <div className='flex flex-col gap-y-1'>
                    <label className='text-sm font-medium'>Full Name</label>
                    <Input
                        type="text"
                        placeholder="Name"
                        className=""
                        name='name'
                        value={userState.name}
                        onChange={handleChange}
                    />
                    {
                        data?.errors?.name && (
                            <p className='text-red-500 text-sm font-medium'>{data?.errors?.name[0]}</p>
                        )
                    }
                </div>
                <div className='flex flex-col gap-y-1'>
                    <label className='text-sm font-medium'>Email</label>
                    <Input
                        type="text"
                        placeholder="Email"
                        className=""
                        name='email'
                        value={userState.email}
                        onChange={handleChange}
                    />
                    {
                        data?.errors?.email && (
                            <p className='text-red-500 text-sm font-medium'>{data?.errors?.email[0]}</p>
                        )
                    }
                </div>
                <div className='flex flex-col gap-y-1'>
                    <label className='text-sm font-medium'>Phone</label>
                    <Input
                        type="text"
                        placeholder="Phone"
                        className=""
                        name='phone'
                        value={userState.phone}
                        onChange={handleChange}
                    />
                    {
                        data?.errors?.phone && (
                            <p className='text-red-500 text-sm font-medium'>{data?.errors?.phone[0]}</p>
                        )
                    }
                </div>
                {/* <div className='flex flex-col gap-y-1'>
                    <label className='text-sm font-medium'>Old Password</label>
                    <Input
                        type="password"
                        placeholder="Password"
                        className=""
                        name='old_password'
                    />
                    {
                        data?.errors?.old_password && (
                            <p className='text-red-500 text-sm font-medium'>{data?.errors?.old_password[0]}</p>
                        )
                    }
                </div> */}
                {/* <div className='flex flex-col gap-y-1'>
                    <label className='text-sm font-medium'>New Password</label>
                    <Input
                        type="password"
                        placeholder="Password"
                        className=""
                        name='password'
                    />
                    {
                        data?.errors?.password && (
                            <p className='text-red-500 text-sm font-medium'>{data?.errors?.password[0]}</p>
                        )
                    }
                </div> */}
                <div className='flex flex-col gap-y-1'>
                    <label className='text-sm font-medium'>Bio</label>
                    <textarea
                        placeholder="Name"
                        className="border-primary/50 resize-none outline-0 border rounded-md p-2"
                        name='student_bio'
                        rows={5}
                        value={userState.student_bio}
                        onChange={handleChange}

                    />
                </div>
                <Button disabled={isPending}>
                    {
                        isPending ? 'Saving...' : 'Save'
                    }
                </Button>
            </form>
        </section>
    )
}
