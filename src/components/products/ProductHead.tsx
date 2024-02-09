import { User } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import Heading from '../Heading'
import HeartButton from '../HeartButton'

interface ProductHeadProps {
  title: string
  imageSrc: string
  id: string
  currentUser?: User | null
}

const ProductHead = ({ title, imageSrc, id, currentUser }: ProductHeadProps ) => {
  return (
    <>
      <Heading title={title} />
      <div className='w-full h-[60vh] overflow-hidden rounded-xl relative'>
        <Image 
          src={imageSrc}
          // src="https://res.cloudinary.com/dgl08y6j1/image/upload/v1706923646/dotgufadzyo5ux3vug8t.png"
          fill
          alt="product image"
          className='object-cover w-full'
        />
        <div className='absolute top-5 right-5'>
          <HeartButton productId={id} currentUser={currentUser}/>
        </div>
      </div>
    </>
  )
}

export default ProductHead