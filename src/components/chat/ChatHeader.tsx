import React from 'react'
import Avatar from '../Avatar'
import { IoChevronBackCircleSharp } from 'react-icons/io5'
import { formatTime } from '@/libs/dayjs'

interface ChatHeaderProps {
 receiverName: string
 receiverImage: string
 setLayout: (layout: boolean) => void
 lastMessageTime: Date | undefined
}

const ChatHeader = ({ receiverName, receiverImage, setLayout, lastMessageTime }:ChatHeaderProps ) => {
  return (
    <div className='pl-4 border-b-[1px]'>
      <div className='flex items-center h-16 gap-4'>
        <div className='flex items-center justify-center text-3xl text-gray-400 hover:text-gray-600'>
          <button className='md:hidden' onClick={() => setLayout(false)}>
            <IoChevronBackCircleSharp />
          </button>
        </div>
      <div className='flex items-center gap-[0.5rem]'>
        <div>
          <Avatar src={receiverImage} />
        </div>
        <h2 className='text-lg font-semibold'>{receiverName}</h2>
        {lastMessageTime &&  <p className='text-gray-600'>{formatTime(lastMessageTime)}</p>}
        </div>
      </div>
    </div>
  )
}

export default ChatHeader