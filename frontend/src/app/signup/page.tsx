
import { redirect } from 'next/navigation'
import React from 'react'
import SignupForm from '~/components/signupForm'
import { auth } from '~/server/auth'

const page = async() => {
  const session = await auth()

  if(session){
    redirect("/dashboard")
  }

  return (
    <div className='flex h-screen w-screen items-center justify-center bg-slate-950'>
      <SignupForm />
    </div>
  )
}

export default page
