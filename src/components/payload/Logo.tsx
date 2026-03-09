import React from 'react'
import logo from '@/assets/logo.png'
import Image from 'next/image'

export default function Logo() {
  return (
    <div>
      <Image className="h-20 object-contain" src={logo} alt="" />
    </div>
  )
}
