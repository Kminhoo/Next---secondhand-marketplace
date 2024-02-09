import getCurrentUser from '@/app/actions/getCurrentUser';
import getProductById from '@/app/actions/getProductById';
import EmptyState from '@/components/EmptyState';
import { useParams } from 'next/navigation'
import React from 'react'
import ProductClient from './productClient';

interface Params {
  productId?: string
}

const ProductPage = async ({ params }: { params: Params } ) => {
  // const productId = useParams(); 
  const currentUser = await getCurrentUser()
  const productData = await getProductById(params)

  if(!productData) {
    return (
      <EmptyState />
    )
  }
  
  return (
    <ProductClient 
      currentUser={currentUser}
      productData={productData}
    />
  )
}
export default ProductPage