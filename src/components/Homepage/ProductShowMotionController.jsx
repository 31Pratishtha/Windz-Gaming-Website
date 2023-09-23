import { React, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function ProductShowMotionController() {
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
      className="bg-myblack h-auto py-11 p-12 overflow-hidden justify-center items-center flex flex-col gap-12 md:flex-row-reverse "
    >
      <motion.div
        animate={descAnimation}
        className="flex text-mywhite flex-col text-center pt-20 md:pt-0 md:text-left w-[80%] md:w-2/5 mx-auto md:mx-14 gap-4"
      >
        <h1 className="font-montserrat font-bold text-4xl">WindzStation Move motion controller</h1>
        <p className="font-montserrat text-xl font-light">
        Bring your hands into the game world and take full control of your VR experiences, giving an even deeper sense of presence and further enhancing your immersion.
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
          src="/src/assets/Images/motionController.png"
          alt="ps5"
          className="w-[70%] md:w-[50%] h-auto"
        />
      </div>
    </div>
  );
}
