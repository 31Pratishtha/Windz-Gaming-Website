import React from "react";
import Carousel from "./Carousel";
import ProductShowPs5 from "./ProductShowPs5";
import ProductShowHeadset from "./ProductShowHeadset";
import ProductShowVR from "./ProductShowVR";
import ProductShowMotionController from "./ProductShowMotionController";
import { useAuth } from "/src/contexts/AuthContext";
export default function Homepage() {
  const { currentUser } = useAuth();
  return (
    <>
      <Carousel />
      <ProductShowPs5 />
      <ProductShowHeadset />
      <ProductShowVR />
      <ProductShowMotionController />
    </>
  );
}
