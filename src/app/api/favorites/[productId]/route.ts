import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from '@/libs/prismadb'

interface Params {
  productId?: string
}

export async function POST (request: Request, {params}: {params: Params} ) {
  const currentUser = await getCurrentUser()

  if(!currentUser) {
    return NextResponse.error();
  }

  const { productId } = params

  if(!productId || typeof productId !== 'string') {
    throw new Error("invaild Product ID")
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])]

  favoriteIds.push(productId)

  const user = await prisma.user.update({
    where : {
      id: currentUser.id
    },
    data : {
      favoriteIds: favoriteIds
    }
  })

  return NextResponse.json(user)
}

export async function DELETE(requset: Request, {params} : {params: Params}) {
  const currentUser = await getCurrentUser()

  if(!currentUser) {
    return NextResponse.error();
  }

  const { productId } = params

  if(!productId || typeof productId !== 'string') {
    throw new Error("invaild Product ID")
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])]

  favoriteIds = favoriteIds.filter((id) => id !== productId)

  const user = await prisma.user.update({
    where : {
      id: currentUser.id
    },
    data : {
      favoriteIds: favoriteIds
    }
  })

  return NextResponse.json(user)
}