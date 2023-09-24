import { React, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Ps5Img from "/src/assets/Images/ps5.png"

export default function ProductShowPs5() {
  const { ref, inView } = useInView({
    threshold: 0.3,
  });

  const NameAnimation = useAnimation();
  const ps5Amimaton = useAnimation();

  useEffect(() => {
    if (inView) {
      NameAnimation.start({
        x: 0,
        transition: {
          type: "spring",
          duration: 1,
          bounce: 0.3,
        },
      });

      ps5Amimaton.start({
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
      NameAnimation.start({
        x: "-100vw",
      });

      ps5Amimaton.start({
        x: "100vw",
      });
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className="bg-mywhite text-myblack h-auto mx-auto justify-center items-center p-12 flex flex-col md:flex-row gap-12 md:flex"
    >
      <motion.div
        animate={NameAnimation}
        className="flex flex-col text-center pt-20 md:pt-0 md:text-left w-[80%] md:w-2/5 mx-auto md:mx-14 gap-4 text-myblack"
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
      <div className="p-3 md:p-16 flex justify-center mx-auto overflow-hidden">
        <motion.img
          whileHover={{
            scale: 1.2,
            transition: { type: "spring", duration: 0.5, bounce: 0.3 },
          }}
          animate={ps5Amimaton}
          initial={{ x: "100vw" }}
          src={Ps5Img}
          alt="ps5"
        />
      </div>
    </div>
  );
}
