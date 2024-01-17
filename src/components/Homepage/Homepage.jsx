import React from "react";
import Carousel from "./Carousel";
import ProductShowPs5 from "./ProductShowPs5";
import ProductShowHeadset from "./ProductShowHeadset";
import ProductShowVR from "./ProductShowVR";
import ProductShowMotionController from "./ProductShowMotionController";
import { useAuth } from "/src/contexts/AuthContext";
import { motion } from "framer-motion";

export default function Homepage() {
  const { currentUser } = useAuth();
  return (
    <>
      <motion.div
        className="h-screen overflow-y-auto snap-y snap-mandatory no-scrollbar"
        initial={{ opacity: 0, transition: { duration: 0.3 } }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
      >
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
      </motion.div>
    </>
  );
}
