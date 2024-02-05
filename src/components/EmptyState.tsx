'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import Heading from '@/components/Heading'
import Button from '@/components/Button'

interface EmptyStateProps {
  title?: string
  subtitle?: string
  showReset?: boolean
}

const EmptyState = ({
  title = '일치하는게 존재하지 않습니다.',
  subtitle = "필터를 일부 변경하시거나, 제거해 보세요.",
  showReset
}: EmptyStateProps) => {

  const router = useRouter();

  return (
    <div className='h-[60vh] flex flex-col gap-2 justify-center items-center'>
      <Heading
        title={title}
        subtitle={subtitle}
        center
      />
      <div className='w-48 mt-4'>
        {showReset && (
            <Button 
            outline
            label='모든 필터 제거'
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </div>
  )
}

export default EmptyState