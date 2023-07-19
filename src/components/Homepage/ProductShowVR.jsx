import { React, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function ProductShowVR() {
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
      className="bg-mywhite text-myblack h-auto mx-auto justify-center items-center p-12 md:flex"
    >
      <motion.div
        animate={NameAnimation}
        className="flex flex-col text-center pt-20 md:pt-0 md:text-left w-[80%] md:w-2/5 mx-auto md:mx-14 gap-4 text-myblack"
      >
        <h1 className="font-montserrat font-bold text-4xl">WindzStation VR</h1>
        <p className="font-montserrat text-xl font-light">
          Enter an extraordinary gaming universe where dreams come alive.
          Powered by WindzStation and immersive VR, experience mind-bending
          adventures beyond reality. Get ready for exhilarating gameplay like
          never before.
        </p>
      </motion.div>
      <div className="md:p-4 flex justify-center mx-auto overflow-hidden">
        <motion.img
          whileHover={{
            scale: 1.2,
            transition: { type: "spring", duration: 0.5, bounce: 0.5 },
          }}
          animate={ps5Amimaton}
          initial={{ x: "100vw" }}
          src="/src/assets/Images/VR.png"
          alt="VR Headset"
        />
      </div>
    </div>
  );
}
