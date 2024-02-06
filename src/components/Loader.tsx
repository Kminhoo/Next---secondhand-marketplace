'use client'
import React from 'react'
import { Blocks } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div className='h-[60vh] max-w-6xl mx-auto w-full py-40 flex flex-row items-center justify-center'>
      <Blocks 
        height="100"
        width="100"
        visible={true}
      />
    </div>
  )
}

export default Loader