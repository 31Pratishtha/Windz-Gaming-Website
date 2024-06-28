import React, { Suspense } from "react";
import Carousel from "./Carousel";
const ProductShowPs5 = React.lazy(() => import("./ProductShowPs5"));
const ProductShowHeadset = React.lazy(() => import("./ProductShowHeadset"));
const ProductShowVR = React.lazy(() => import("./ProductShowVR"));
const ProductShowMotionController = React.lazy(() =>
  import("./ProductShowMotionController")
);
import { motion } from "framer-motion";

export default function Homepage() {
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
          <Suspense>
            <ProductShowPs5 />
          </Suspense>
        </section>
        <section className="snap-start">
          <Suspense>
            <ProductShowHeadset />
          </Suspense>
        </section>
        <section className="snap-start">
          <Suspense>
            <ProductShowVR />
          </Suspense>
        </section>
        <section className="snap-start">
          <Suspense>
            <ProductShowMotionController />
          </Suspense>
        </section>
      </motion.div>
    </>
  );
}
