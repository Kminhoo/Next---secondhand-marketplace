import React from 'react'
import { IconType } from 'react-icons'


interface CatergoryProps {
  // key: string
  selected?: boolean
  label: string
  icon: IconType
  path: string
  onClick: (value: string) => void;
}

const CategoryInput = ({
  icon: Icon,
  label,
  selected,
  path,
  onClick
}: CatergoryProps) => {
  return (
    <div onClick={() => onClick(path)}
      className={`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
        hover:border-orange-500
        transition
        curosr-pointer
        ${selected ? 'border-orange-500' : 'border-neutral-200'}
      `}
    >
      <Icon size={30}/>
      <div className='font-semibold'>{label}</div>
    </div>
  )
}

export default CategoryInput