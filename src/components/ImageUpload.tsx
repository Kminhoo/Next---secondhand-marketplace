'use client'

import Image from 'next/image';

import { CldUploadWidget } from 'next-cloudinary';

import { TbPhotoPlus } from 'react-icons/tb'

interface ImageUploadProps {
  value: string
  onChange: (value: string) => void
}

const ImageUpload = ({ onChange, value }: ImageUploadProps ) => {

  // image 가 업로드 되고 실행될 함수
  const handleUpload = (result: any) => {
    console.log('result :', result)
    onChange(result.info.secure_url)
  }

  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

  return (
    <CldUploadWidget 
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1
      }}
    >
      {({open}) => {
        return (
          <div 
            onClick={() => open?.()}
            className="relative flex flex-col items-center justify-center gap-4 p-20 transition border-2 border-dashed cursor-pointer hover:opacity-70 border-neutral-300 text-neutral-300"
          >
            <TbPhotoPlus size={20} />
            {value && (
              <div className='absolute inset-0 w-full h-full'>
                <Image
                  fill={true}
                  style={{ objectFit: 'cover' }}
                  src={value}
                  alt="입력되어진 이미지"
                />
              </div>
            )}
          </div>
        )
      }}
    </CldUploadWidget>
  )
}

export default ImageUpload