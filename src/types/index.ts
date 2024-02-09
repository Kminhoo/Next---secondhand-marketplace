import { Message, User } from "@prisma/client";

export type TUserWithChat = User & {
  conversations: TConversation[]
}

export type TConversation = {
  id: string
  name: string
  senderId: string
  receiverId: string
  users: User[]
  messages: Message[]
  createdAt: Date
}