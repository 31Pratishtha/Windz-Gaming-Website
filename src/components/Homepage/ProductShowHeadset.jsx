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
      className="bg-myblack h-auto py-11 overflow-hidden justify-center items-center p-12 flex flex-col gap-12 md:flex-row-reverse"
    >
      <motion.div
        animate={descAnimation}
        className="flex text-mywhite flex-col text-center pt-20 md:pt-0 md:text-left w-[80%] md:w-2/5 mx-auto md:mx-14 gap-4"
      >
        <h1 className="font-montserrat font-bold text-4xl">Pulse 3D Wireless Headset</h1>
        <p className="font-montserrat text-xl font-light">
        Enjoy a seamless, wireless experience with a headset fine-tuned for 3D Audio on WindzStation Console. The PULSE 3D wireless headset features a refined design with dual noise-cancelling microphones, USB Type-C® charging, and an array of easy-access controls.
        </p>
      </motion.div>
      <div className="md:p-4 flex justify-center mx-auto">
        <motion.img
          whileHover={{
            scale: 1.2,
            transition: { type: "spring", duration: 0.5, bounce: 0.5 },
          }}
          animate={headsetAnimation}
          initial={{ x: "100vw" }}
          src="/src/assets/Images/headset.png"
          alt="headset"
        />
      </div>
    </div>
  );
}
