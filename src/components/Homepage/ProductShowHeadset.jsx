import { React, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function ProductShowHeadset() {
  const { ref, inView } = useInView({
    threshold: 0.3,
  });

  const descAnimation = useAnimation();
  const headsetAnimation = useAnimation();

  useEffect(() => {
    if (inView) {
      headsetAnimation.start({
        x: 0,
        transition: {
          type: "spring",
          duration: 1,
          bounce: 0.3,
        },
      });

      descAnimation.start({
        x: 0,
        transition: {
          type: "spring",
          duration: 1,
          duration: 1,
          bounce: 0.3,
        },
      });
    }

    if (!inView) {
      headsetAnimation.start({
        x: "-100vw",
      });

      descAnimation.start({
        x: "100vw",
      });
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className="bg-myblack h-auto py-11 overflow-hidden justify-center items-center md:flex md:flex-row-reverse"
    >
      <motion.div
        animate={descAnimation}
        className="flex text-mywhite flex-col text-center pt-20 md:pt-0 md:text-left w-[80%] md:w-2/5 mx-auto md:mx-14 gap-4 text-myblack"
      >
        <h1 className="font-montserrat font-bold text-4xl">WindzStation</h1>
        <p className="font-montserrat text-xl font-normal">
          With New Immersive Experience.
        </p>
        <p className="font-montserrat text-xl font-light">
          Unleash your gaming potential with WindzStation, where gaming dreams
          take flight with cutting-edge technology and endless adventures.
        </p>
      </motion.div>
      <div className="md:p-4 flex justify-center mx-auto">
        <motion.img
          animate={headsetAnimation}
          initial={{ x: "100vw" }}
          src="/src/assets/Images/headset.png"
          alt="ps5"
        />
      </div>
    </div>
  );
}
