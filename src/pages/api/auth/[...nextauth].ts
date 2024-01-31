import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import { PrismaClient } from "@prisma/client"
// import { signOut } from "next-auth/react"
import bcrypt from 'bcryptjs'
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
        email: { label: "email", type: "text"},
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
       
        if(!credentials?.email || !credentials?.password) {
          throw new Error('Invaild Credentials')
        }

        // user 테이블에서 email이 credentials.email 과 같은 user를 찾는다.
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        // user가 없다 - 회원가입을 하지 않았거나 입력된 이메일이 틀렸거나
        // 비밀번호가 없다 - 다른 로그인 방식으로 로그인 했다.
        if(!user || !user.hashedPassword) {
          throw new Error('Invaild Credentials')
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if(!isCorrectPassword) {
          throw new Error('Invaild Credentials')
        }

        return user
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