import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/libs/prismadb'
import { connect } from "http2";

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

export async function POST(request: Request) {
  // 현재 로그인한 유저의 데이터를 가져오기
  const currentUser = await getCurrentUser()

  // 유저의 데이터가 없다면?
  if(!currentUser) {
    return NextResponse.error()
  }

  const body = await request.json()

  // 대화 이력이 있는지 확인하기
  const conversation = await prisma.conversation.findFirst({
    where: {
      AND: [
        {
          users: {
            some: {
              id: body.senderId
            }
          }
        },
        {
          users: {
            some: {
              id: body.receiverId
            }
          }
        }
      ]
    }
  })

  if(conversation) {
    try {
      const message = await prisma.message.create({
        data: {
          text: body.text,
          image: body.image,
          senderId: body.senderId,
          receiverId: body.receiverId,
          conversationId: conversation.id
        }
      })

      return NextResponse.json(message)
    } catch (error) {
      return NextResponse.error()
    }
  } else {
    const newConversation = await prisma.conversation.create({
      data: {
        senderId: body.senderId,
        receiverId: body.receiverId,
        users: {
          connect: [
            {
              id: body.senderId
            },
            {
              id: body.receiverId
            }
          ]
        }
      }
    })

    try {
      const message = await prisma.message.create({
        data: {
          text: body.text,
          image: body.image,
          senderId: body.senderId,
          receiverId: body.receiverId,
          conversationId: newConversation.id
        }
      })

      return NextResponse.json(message)
    } catch (error) {
      return NextResponse.error()
    }
  }
}