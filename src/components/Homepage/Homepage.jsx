import React from 'react'
import Carousel from './Carousel'
import ProductShowPs5 from './ProductShowPs5'
import ProductShowHeadset from './ProductShowHeadset'
import ProductShowVR from './ProductShowVR'
import ProductShowMotionController from './ProductShowMotionController'
export default function Homepage() {
  return (
    <>
        <Carousel />
        <ProductShowPs5 />
        <ProductShowHeadset />
        <ProductShowVR />
        <ProductShowMotionController />

    </>
  )
}
