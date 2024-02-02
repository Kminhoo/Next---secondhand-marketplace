import React from 'react'

import { FaTachographDigital } from 'react-icons/fa6'
import { TbDeviceComputerCamera } from "react-icons/tb";
import { GiFurnace } from 'react-icons/gi'
import { GrRestroomWomen } from 'react-icons/gr'
import { FaShirt } from 'react-icons/fa6'
import { FaHeartbeat } from 'react-icons/fa'
import { MdOutlineSportsHandball } from 'react-icons/md'
import { FaCar } from 'react-icons/fa'


export const categories = [
  {
    label: '디지털기기',
    path: 'digital',
    icon: FaTachographDigital,
    description: '디지털기기 카테고리 입니다.'
  },
  {
    label: '생활가전',
    path: 'appliances',
    icon: TbDeviceComputerCamera,
    description: '생활가전 카테고리 입니다.'
  },
  {
    label: '가구/인테리어',
    path: 'interiorl',
    icon: GiFurnace,
    description: '인테리어 카테고리 입니다.'
  },
  {
    label: '여성의류',
    path: 'women-clothing',
    icon: GrRestroomWomen,
    description: '여성의류 카테고리 입니다.'
  },
  {
    label: '남성패션/잡화',
    path: 'man-fashion',
    icon: FaShirt,
    description: '남성패션/잡화 카테고리 입니다.'
  },
  {
    label: '뷰티/미용',
    path: 'beauty',
    icon: FaHeartbeat,
    description: '뷰티/미용 카테고리 입니다.'
  },
  {
    label: '스포츠/레저',
    path: 'sports',
    icon: MdOutlineSportsHandball,
    description: '스포츠/레저 카테고리 입니다.'
  },
  {
    label: '중고차',
    path: 'used-car',
    icon: FaCar,
    description: '중고차 카테고리 입니다.'
  }
]

const Categories = () => {
  return (
    <div>Categories</div>
  )
}

export default Categories