'use client'

import { signInUser, signOutUser } from '@/actions/auth'
import { Avatar, Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { useSession } from 'next-auth/react'

function HeaderAuth() {
  const session = useSession()

  // Loading
  if (session.status === 'loading') {
    return null
  }

  // Signed In
  if (session.data?.user)
    return (
      <Popover placement="bottom">
        <PopoverTrigger>
          <Avatar src={session.data.user.image || ''} />
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4">
            <form action={signOutUser}>
              <Button type="submit">Sign Out</Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    )

  // Signed Out
  return (
    <form action={signInUser}>
      <Button type="submit" color="primary">
        Sign In
      </Button>
    </form>
  )
}

export default HeaderAuth
