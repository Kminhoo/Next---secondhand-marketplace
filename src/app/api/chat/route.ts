import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/libs/prismadb'

export async function GET(request: Request) {
  // 현재 로그인한 유저의 데이터를 가져오기
  const currentUser = await getCurrentUser()

  // 유저의 데이터가 없다면?
  if(!currentUser) {
    return NextResponse.error()
  }

  // 데이터베이스에서 필요한 데이터를 찾는 쿼리
  const users = await prisma.user.findMany({
    include: {
      conversations: {
        include: {
          messages: {
            include: {
              sender: true,
              receiver: true
            },
            orderBy: {
              createAt: 'asc'
            }
          },
          users: true
        }
      }
    }
  })

  // 해당 데이터를 client로 리턴
  return NextResponse.json(users)
}