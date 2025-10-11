
import { redirect } from 'next/navigation'
import React from 'react'
import NavHeader from '~/components/navHeader'
import { db } from '~/server/db'
import { auth} from "~/server/auth/index";
import { Toaster } from '~/components/ui/sonner';

const layout = async ({children}:{children: React.ReactNode}) => {
    const session = await auth();

    if(!session?.user?.id){
        redirect("/login")
    }
    const user = await db.user.findUniqueOrThrow({
        where: {id : session.user.id},
        select: {credits:true , email:true}
    })
  return (
    <div className='flex min-h-screen flex-col'>
      <NavHeader credits={user.credits} email={user.email} />
      <main className='container mx-auto flex-1 py-6' >{children}</main>
      <Toaster/>
    </div>
  )
}

export default layout
