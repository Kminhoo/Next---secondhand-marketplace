import axios from 'axios'
import React, { FormEvent, useState } from 'react'
import { IoImageOutline } from 'react-icons/io5'
import { RiSendPlaneLine } from 'react-icons/ri'

interface InputProps {
  receiverId: string
  currentUserId: string
}

const Input = ({ receiverId, currentUserId }: InputProps) => {

  // input의 내용을 저장하기 위한 상태
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const imgUrl = ""
    if(message || imgUrl) {
      try {
        await axios.post('/api/chat', {
          text: message,
          image: imgUrl,
          receiverId,
          senderId: currentUserId
        })
      } catch (error) {
        console.log(error)
      }
    }

    setMessage("")
  }

  return (
    <form 
      className='relative flex items-center justify-between w-full gap-4 p-2 pl-4 border-[1px] border-gray-300 rounded-md shadow-sm'
      onSubmit={handleSubmit}
    >
      <input 
        className='w-full text-base outline-none'
        placeholder='메세지를 입력해 주세요.'
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className='text-2xl text-gray-200 cursor-pointer'>
        <IoImageOutline />
      </div>
      <button
        className='flex items-center justify-center p-2 text-gray-900 bg-orange-500 rounded-lg cursor-pointer hover:bg-orange-600 disabled:opacity-60'
        type='submit'
      >
        <RiSendPlaneLine className='text-white' />
      </button>
    </form>
  )
}

export default Input