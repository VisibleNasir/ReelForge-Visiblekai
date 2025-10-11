"use client"

import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback } from './ui/avatar'
import { signOut } from 'next-auth/react'

const NavHeader = ({credits , email}:{credits:number , email:string}) => {
  return (
    <header className='bg-background sticky top-0 z-10 flex justify-center border-b'>
      <div className='flex w-full justify-around'>
        <Link href="/dashboard">
          Visiblekai/Podcast/Clipper
        </Link>

        <div className='items-center flex gap-4'>
          <div className='flex items-center gap-2'>
            <Badge variant="secondary" className='h-8 px-3 py-1.5 text-xs font-medium'>
              {credits} Credits
            </Badge>
            <Button variant="outline" size="sm" asChild className='h-8 text-xs font-medium'>
              <Link href="/dashboard/billing">Buy more</Link>
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className='relative h-8 w-8 rounded-full p-0' variant="ghost"><Avatar><AvatarFallback>{email.charAt(0)}</AvatarFallback></Avatar></Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>
                <p className='text-muted-foreground text-xs'>{email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/billing">Billing</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={()=> signOut({redirectTo : "/login"})} className='text-destructive cursor-pointer'>
                Sign out
              </DropdownMenuItem>

            </DropdownMenuContent>

          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
 
export default NavHeader