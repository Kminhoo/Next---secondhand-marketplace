import { formatTime } from '@/libs/dayjs'
import { User } from '@prisma/client'
import React from 'react'
import { IconType } from 'react-icons'
import Avatar from '../Avatar'
import ProductCategory from './ProductCategory'

interface ProductInfoProps {
  user: User 
  category?: {
    icon: IconType
    label: string
    path: string
    description: string
  }
  createAt: Date
  description: string
}

const ProductInfo = ({ user, category, createAt, description}: ProductInfoProps) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-2 text-xl font-semibold'>
          <Avatar 
            src={user?.image}
          />
          <p>{user?.name}</p>
        </div>
        <div>
          {formatTime(createAt)}
        </div>
      </div>
      <hr />

      {category && <ProductCategory icon={category.icon} label={category.label} description={category.description}/>}

      <hr />

      <div>
        {description}
      </div>
    </div>
  )
}

export default ProductInfo