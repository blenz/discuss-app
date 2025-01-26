import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { db } from './db'

const nextAuth = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session && user) {
        session.user.id = user.id
      }
      return session
    },
  },
})

export const {
  handlers: { GET, POST },
  auth,
  signOut,
  signIn,
} = nextAuth
