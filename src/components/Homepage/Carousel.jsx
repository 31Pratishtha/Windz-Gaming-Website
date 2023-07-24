import { React, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Carousel() {
  const timerRef = useRef(null);
  const slides = [
    {
      url: "/src/assets/Images/Destiny.jpg",
      title: "Destiny",
      desc: "Unleash your destiny in this action-packed adventure, where fate awaits at every turn.",
    },
    {
      url: "/src/assets/Images/Chrononexus.jpg",
      title: "Chrononexus",
      desc: " Enter a time-bending world of mystery and marvels, where the nexus of time beckons.",
    },
    {
      url: "/src/assets/Images/Astralascendancy.jpg",
      title: "Astralascendancy",
      desc: "Ascend to astral heights and explore uncharted realms in this epic odyssey.",
    },
    {
      url: "/src/assets/Images/Cyberpunk.jpg",
      title: "Cyberpunk",
      desc: "Immerse yourself in a cybernetic metropolis, where neon-soaked streets hold secrets and surprises.",
    },
    {
      url: "/src/assets/Images/Nomansky.png",
      title: "Nomansky",
      desc: "Embark on an endless journey through the cosmos, where boundless skies and uncharted planets await your discovery.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const prevSlide = () => {
    setDirection(-1);

    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
    if (currentIndex === 0) {
      setCurrentIndex(slides.length - 1);
    }
  };

  const nextSlide = () => {
    setDirection(1);

    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (currentIndex === slides.length - 1) {
      setCurrentIndex(0);
    }
  };

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    console.log("useEffect");
    timerRef.current = setTimeout(() => {
      nextSlide();
    }, 2500);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [nextSlide]);

  const variants = {
    initial: (direction) => {
      return {
        x: direction > 0 ? 10 : -10,
        opacity: 0,
      };
    },
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => {
      return {
        x: direction < 0 ? 10 : -10,
        opacity: 0,
      };
    },
  };

  return (
    <div className="h-[12rem] sm:max-w-2xl sm:h-[19rem] md:max-w-6xl md:h-[33rem] mx-auto my-10 px-5">
      <div className="relative h-[92%] w-full rounded-2xl overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            key={slides[currentIndex].url}
            className=" bg-no-repeat rounded-2xl bg-cover bg-center flex items-center"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7) 43%, rgba(0, 0, 0, 0.2)), url(${slides[currentIndex].url})`,
              width: "100%",
              height: "100%",
            }}
          >
            <motion.div initial={{x: -100, opacity: 0}} animate={{ x: 0, opacity: 1}} transition={{delay:0.5,  duration: 0.6, ease: "easeInOut" }} className="flex flex-col w-[40%] pl-32">
              <h2 className="font-montserrat text-4xl text-mywhite font-extrabold">
                {slides[currentIndex].title}
              </h2>
              <p className="font-montserrat text-md text-mywhite font-normal pt-6">{slides[currentIndex].desc}</p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <div className="flex absolute top-[50%] justify-between items-center px-3 w-full">
          <div
            className="text-base w-6 h-6 sm:text-xl sm:w-8 sm:h-8 md:w-12 md:h-12 bg-white md:text-2xl opacity-40 rounded-full flex items-center justify-center hover:opacity-60 hover:cursor-pointer transition duration-200 ease-in-out"
            onClick={() => {
              prevSlide();
            }}
          >
            🡨
          </div>
          <div
            className="text-base w-6 h-6 sm:text-xl sm:w-8 sm:h-8 md:w-12 md:h-12 bg-white md:text-2xl opacity-40 rounded-full flex items-center justify-center hover:opacity-60 hover:cursor-pointer transition duration-200 ease-in-out"
            onClick={() => {
              nextSlide();
            }}
          >
            🡪
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full">
        {slides.map((slide, slideindex) => (
          <div
            className="text-white opacity-40 rounded-full flex items-center justify-center w-8 h-8 hover:opacity-60 hover:cursor-pointer transition duration-200 ease-in-out"
            onClick={() => {
              setCurrentIndex(slideindex);
            }}
            key={slideindex}
          >
            {slideindex === currentIndex ? "●" : "○"}
          </div>
        ))}
      </div>
    </div>
  );
}
