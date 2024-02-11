import axios from 'axios'
import React, { FormEvent, useRef, useState } from 'react'
import { IoImageOutline } from 'react-icons/io5'
import { RiSendPlaneLine } from 'react-icons/ri'
import { CgClose } from 'react-icons/cg'
import { json } from 'stream/consumers'
import useSWRMutation from 'swr/mutation'
import previewImage from '@/libs/previewImage'

interface InputProps {
  receiverId: string
  currentUserId: string
}

const sendRequest = (url: string, {arg}: {
  arg: {
    text: string
    image: string
    receiverId: string
    senderId: string
  }
}) => {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(arg)
  }).then(res =>  res.json())
}

const Input = ({ receiverId, currentUserId }: InputProps) => {

  // input의 내용을 저장하기 위한 상태
  const [message, setMessage] = useState("")

  // file 자체를 위한 상태
  const [image, setImage] = useState<File | null>(null)

  // Image 프리뷰를 위한 상태
  const [imagePreview, setImagePreview] = useState<string>("")

  const imageRef = useRef<HTMLInputElement>(null)

  const chooseImage =() => {
    imageRef.current?.click()
  }

  const { trigger } = useSWRMutation('/api/chat', sendRequest)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const imgUrl = ""
    if(message || imgUrl) {
      try {
        trigger({
          text: message,
          image: imgUrl,
          receiverId,
          senderId: currentUserId
        })
        // await axios.post('/api/chat', {
        //   text: message,
        //   image: imgUrl,
        //   receiverId,
        //   senderId: currentUserId
        // })
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
      {imagePreview && (
        <div className='absolute right-0 w-full overflow-hidden rounded-md bottom-[4.2rem] max-w-[300px] shadow-md'>
          <img src={imagePreview} alt="Preview Image" />
          <span
            className='absolute flex items-center justify-center p-2 text-xl bg-gray-900 cursor-pointer top-[0.4rem] right-[0.4rem] rounded-full opacity-60 hover:opacity-100'
            onClick={() => setImagePreview("")}
          >
            <CgClose />
          </span>
        </div>
      )}

      <input 
        className='w-full text-base outline-none'
        placeholder='메세지를 입력해 주세요.'
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <input
        type='file'
        className='hidden'
        multiple={false}
        accept='image/*'
        ref={imageRef}
        onChange={(e) => previewImage(e, setImagePreview, setImage)}
      />

      <div 
        onClick={chooseImage}
        className='text-2xl text-gray-200 cursor-pointer'
      >
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