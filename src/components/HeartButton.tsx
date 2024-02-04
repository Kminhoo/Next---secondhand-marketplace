import { User } from '@prisma/client'
import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import useFavorite from '@/hooks/useFavorite'
import { routeModule } from 'next/dist/build/templates/app-page'

interface HeartButtonProps {
  productId: string
  currentUser?: User | null
}

const HeartButton = ({ productId, currentUser }: HeartButtonProps) => {
  const { hasFavorite, toggleFavorite } = useFavorite({ productId, currentUser })
  return (
    <div 
      onClick={toggleFavorite}
      className='relative cursor-pointer transition hover:opacity-80'
    >
      <AiOutlineHeart 
        size={30}
        className='absolute fill-white -top-[2px] -right-[2px]'
      />
      <AiFillHeart 
        size={25}
        className={hasFavorite ? `fill-rose-500` : `fill-neutral-500/70`}
      />
    </div>
  )
}


export default HeartButton