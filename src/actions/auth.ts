'use server'

import { signIn, signOut } from '@/lib/auth'

export async function signInUser() {
  return signIn('github')
}

export async function signOutUser() {
  return signOut()
}
