import { React, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function ProductShow() {
  const { ref, inView } = useInView({
    threshold: 0.3
  });

  const animation = useAnimation();

  useEffect(() => {
    console.log("use effect inView value = ", inView);
    if (inView) {
      animation.start({
        x: 0,
        transition: {
          type: "spring",
          duration: 1,
          bounce: 0.3,
        },
      });
    }

    if (!inView) {
      animation.start({
        x: "-100vw",
        transition: {
          type: "spring",
          duration: 1,
          bounce: 0.3,
        },
      });
    }
  }, [inView]);

  return (
    <main ref={ref} className="bg-mywhite h-96 flex">
      <motion.div
        animate={animation}
        className="flex flex-col justify-center text-left w-2/5 mx-9 gap-4 text-myblack"
      >
        <h1 className="font-montserrat font-bold text-4xl">WindzStation</h1>
        <p className="font-montserrat text-xl font-normal">
          With New Immersive Experience.
        </p>
        <p className="font-montserrat text-xl font-light">
          Unleash Your gaming potential with WindzStation, where gaming dreams
          take flight with cutting-edge technology and endless adventures.
        </p>
      </motion.div>
      <div>{/* image */}</div>
    </main>
  );
}
