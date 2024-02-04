'use client'

import React from 'react'
import { Product, User } from 'prisma/prisma-client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import HeartButton from './HeartButton'
import { changeTime } from '@/libs/dayjs'

interface ProductCardProps {
  currentUser?: User | null ,
  data: Product
}

const ProductCard = ({ currentUser, data }: ProductCardProps) => {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(`/products/${data.id}`)}
      className='col-span-1 cursor-pointer group'
    >
      <div className='flex flex-col w-full gap-2'>
        <div className='relative w-full overflow-hidden aspect-square rounded-xl'>
          {data.imageSrc && (
            <Image 
              fill
              sizes='auto'
              src={data.imageSrc}
              alt="Listing"
              className='object-cover w-full h-full transition group-hover:scale-110'
            />
          )}
          <div className='absolute top-3 right-3'>
            <HeartButton 
              productId={data.id}
              currentUser={currentUser}
            />
          </div>
        </div>

        <div className='text-lg font-semibold'>
          {data.title}
        </div>

        <div className='font-light text-neutral-500'>
          {data.category}
        </div>

        <div className='flex flex-row items-center justify-between gap-1'>
          <div>
            {data.price}{""}
            <span className='font-light'>원</span>
          </div>
          <div>
            {changeTime(data.createAt)}
          </div>
        </div>
      </div>

    </div>
  )
}

export default ProductCard