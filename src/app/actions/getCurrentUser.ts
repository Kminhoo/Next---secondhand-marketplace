import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export async function getSession() {
  return await getServerSession(authOptions)
}

// 즉 어떤 페이지에서든 getCurrentUser 함수를 호출하면
// db 에서 사용자 데이터를 가져올 수 있다.

export default async function getCurrentUser() {

  try {
    const session = await getSession()

    if(!session?.user?.email) {
      return null
    }

    const currentUser = await prisma?.user.findUnique({
      where: {
        email: session.user.email
      }
    })

    if(!currentUser) {
      return null
    }

    return currentUser

  } catch (error) {
    return null
  }
}