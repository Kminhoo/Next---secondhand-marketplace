import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import { PrismaClient } from "@prisma/client"
import { signOut } from "next-auth/react"
import prisma from '@/libs/prismadb'

// const prisma = new PrismaClient()

export const authOption: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com", role: "User" }
  
        if (user) {
          return user
        } else {
          return null
        }
      }
    })
  ],

  session : {
    strategy: 'jwt'
  },

  jwt : {
    secret: process.env.JWT_SECRET,
    maxAge: 30 * 24 * 60 * 60 // 30days
  },

  pages : {
    signIn: '/auth/login',
    signOut: '/'
  },

  callbacks : {
    async jwt({ token, user}) {
      console.log(`token`, token)
      console.log(`user`, user)
      return {...token, ...user}
    },

    async session({ session, token}) {
      console.log(`session`, session)
      console.log('token', token)
      session.user = token
      return session
    }
  }
}

export default NextAuth(authOption)