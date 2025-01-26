'use server'

import { signIn, signOut } from '@/auth'

export async function signInUser() {
  return signIn('github')
}

export async function signOutUser() {
  return signOut()
}
