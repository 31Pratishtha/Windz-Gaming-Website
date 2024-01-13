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
      <div className="h-screen overflow-y-auto snap-y snap-mandatory">
        <section className="snap-start">
          <Carousel />
        </section>
        <section className="snap-start">
          <ProductShowPs5 />
        </section>
        <section className="snap-start">
          <ProductShowHeadset />
        </section>
        <section className="snap-start">
          <ProductShowVR />
        </section>
        <section className="snap-start">
          <ProductShowMotionController />
        </section>
      </div>
    </>
  );
}
