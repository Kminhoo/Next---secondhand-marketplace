import { changeTime } from '@/libs/dayjs'
import { TUserWithChat } from '@/types'
import React from 'react'
import Avatar from '../Avatar'


interface UserProps {
  user: TUserWithChat
  currentUserId: string
}

const User = ({ user, currentUserId }: UserProps ) => {

  // 즉 자신과 대화를 한 유저의 데이터만 가져온다
  const messageWithCurrentUser = user.conversations.find((conversation) => 
    conversation.users.find((user) => user.id === currentUserId)
  )

  // 가장 마지막 메세지를 가져온다
  const latestMessage = messageWithCurrentUser?.messages.slice(-1)[0]

  return (
    <div className='grid grid-cols-[40px_1fr_50px] grid-rows-[40px] gap-3 py-3 px-4 border-b-[1px] hover:cursor-pointer hover:bg-orange-500'>
      <div>
        <Avatar src={user.image} />
      </div>

      <div>
        <h3>{user.name}</h3>
        {latestMessage && <p className='overflow-hidden text-xs font-medium text-gray-600 break-words whitespace-pre-wrap'>{latestMessage.text}</p>}
        {(latestMessage && latestMessage.image) && <p>[이미지]</p>}
        <p></p>
      </div>

      <div className='flex justify-end text-xs text-gray-500'>
        {latestMessage && (<p>{changeTime(latestMessage.createAt)}</p>)}
      </div>
    </div>
  )
}

export default User

