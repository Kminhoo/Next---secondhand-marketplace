import React, { useMemo } from 'react'

import { User } from 'prisma/prisma-client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

interface UseFavorite {
  productId: string
  currentUser?: User | null
}

const useFavorite = ({ productId, currentUser }: UseFavorite) => {
  const router = useRouter()

  const hasFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || []
    return list.includes(productId)
  }, [productId, currentUser])

  const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()

    if(!currentUser) {
      toast.warning("로그인을 먼저 해주세요!")
      return null
    }

    try {
      let request;

      if(hasFavorite) {
        request = () => axios.delete(`/api/favorites/${productId}`)
      } else {
        request =() => axios.post(`/api/favorites/${productId}`)
      }

      await request()

      router.refresh()
      toast.success("좋아요/취소를 성공했습니다..")
    } catch (error) {
      toast.error("에러가 발생했습니다.")
      console.log(error)
    }
  }

  return {
    hasFavorite,
    toggleFavorite
  }
}

export default useFavorite