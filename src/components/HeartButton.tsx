import { User } from '@prisma/client'
import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

interface HeartButtonProps {
  productId: string
  currentUser?: User | null
}

const HeartButton = ({ productId, currentUser }: HeartButtonProps) => {
  return (
    <div className='relative cursor-pointer transition hover:opacity-80'>
      <AiOutlineHeart 
        size={30}
        className='absolute fill-white -top-[2px] -right-[2px]'
      />
      <AiFillHeart 
        size={25}
        className={`fill-rose-500`}
      />
    </div>
  )
}

export default HeartButton