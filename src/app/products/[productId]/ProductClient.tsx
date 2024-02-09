'use client'

import Button from '@/components/Button'
import Container from '@/components/Container'
import ProductHead from '@/components/products/ProductHead'
import ProductInfo from '@/components/products/ProductInfo'
import { Product, User } from '@prisma/client'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import React from 'react'
import { categories } from '../../../components/categories/Categories'

interface ProductClientProps {
  currentUser?: User | null
  productData: Product & { user: User }
}

const ProductClient = ({ currentUser, productData }: ProductClientProps) => {
  const router = useRouter();

  const KakaoMap = dynamic(() => import("../../../components/KakaoMap"), {
    ssr: false
  })

  const category = categories.find(item => item.path === productData.category)

  console.log(productData)
  return (
    <Container>
      <div className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col gap-6'>
          <ProductHead 
            title={productData.title}
            id={productData.id}
            imageSrc={productData.imageSrc}
            currentUser={currentUser}
          />
          <div className='grid grid-cols-1 mt-6 md:grid-cols-2 md:gap-10'>
            <ProductInfo 
              user={productData?.user}
              category={category}
              createAt={productData.createAt}
              description={productData.description}
            />
            <div>
              <KakaoMap 
                detailPage 
                latitude={productData.latitude} 
                longitude={productData.longitude} 
              />
            </div>
          </div>
        </div>

        <div className='mt-10'>
          <Button 
            label='판매자와 채팅하기'
            onClick={() => router.push('/chat')}
          />
        </div>
      </div>
    </Container>
  )
}

export default ProductClient