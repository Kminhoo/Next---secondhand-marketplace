'use client'

import Input from "@/components/Input"
import Button from "@/components/Button"
import Container from "@/components/Container"
import Heading from "@/components/Heading"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import ImageUpload from "@/components/ImageUpload"
import { categories } from "@/components/categories/Categories"
import CategoryInput from "@/components/categories/CategoryInput"
// import KakaoMap from "@/components/KakaoMap"
import dynamic from "next/dynamic"
import axios from "axios"
import { useRouter } from "next/navigation"

const ProductUploadPage = () => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState : {
      errors
    },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      latitude: 33.5563,
      longitude: 126.79581,
      imageSrc: '',
      price: 1000
    }
  })

  const imageSrc = watch('imageSrc')
  const category = watch('category')
  const longitude = watch('longitude')
  const latitude = watch('latitude')


  // dynamic import
  const KakaoMap = dynamic(() => import('../../../components/KakaoMap'), {
    ssr: false
  })
  

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    axios.post('/api/products', data)
      .then(response => router.push(`/products/${response.data.id}`))
      .catch(err => console.error(err))
      .finally(() => {
        setIsLoading(true)
      })
  }

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value)
  }

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">

          <Heading title="Product Upload" subtitle="upload your product"/>

          <ImageUpload 
            value={imageSrc}
            onChange={value => setCustomValue('imageSrc', value)}
          />

          <Input 
            id="title"
            label="title"
            disabled={isLoading}
            register={register}
            errors={errors}
            type="text"
            required
          />

          <hr />

          <Input 
            id="description"
            label="Description"
            disabled={isLoading}
            register={register}
            errors={errors}
            type="text"
            required
          />

          <hr />

          <Input 
            id="price"
            label="price"
            disabled={isLoading}
            formatPrice
            register={register}
            errors={errors}
            type="text"
            required
          />

          <hr />

          {/* category 부분 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
            {categories.map((item) => (
              <div key={item.label}>
                <CategoryInput 
                  onClick={category => setCustomValue('category', category)}
                  selected={category === item.path}
                  label={item.label}
                  icon={item.icon}
                  path={item.path}
                />
              </div>
            ))}
          </div>

          <hr />

          {/* kakaoMap 부분 */}
          <KakaoMap setCustomValue={setCustomValue} longitude={longitude} latitude={latitude}/>

          <Button label="상품 등록하기" />

        </form>
      </div>
    </Container>
  )
}

export default ProductUploadPage