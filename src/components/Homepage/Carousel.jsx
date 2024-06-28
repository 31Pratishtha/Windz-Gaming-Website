import { React, useEffect, useRef, useState } from "react";
import { useAuth } from "/src/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "/src/firebase";
import { useCartItems } from "/src/contexts/CartItemsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Carousel() {
  const { currentUser } = useAuth();
  const { handleAddToCart } = useCartItems();
  const navigate = useNavigate();

  const navToLogin = () => {
    navigate("/authentication", { replace: true });
  };

  const timerRef = useRef(null);
  const slides = [
    {
      url: "/assets/Images/Destiny.webp",
      title: "Destiny",
      desc: "Unleash your destiny in this action-packed adventure, where fate awaits at every turn.",
    },
    {
      url: "/assets/Images/Chrononexus.webp",
      title: "Chrononexus",
      desc: " Enter a time-bending world of mystery and marvels, where the nexus of time beckons.",
    },
    {
      url: "/assets/Images/Astralascendancy.webp",
      title: "Astralascendancy",
      desc: "Ascend to astral heights and explore uncharted realms in this epic odyssey.",
    },
    {
      url: "/assets/Images/Cyberpunk.webp",
      title: "Cyberpunk",
      desc: "Immerse yourself in a cybernetic metropolis, where neon-soaked streets hold secrets and surprises.",
    },
    {
      url: "/assets/Images/Nomansky.webp",
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
     timerRef.current = setTimeout(() => {
       nextSlide();
     }, 3000);

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

  //Add to cart function
  const handleClick = async (title) => {
    if (currentUser) {
      try {
        const q = query(collection(db, "Products"), where("Name", "==", title));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
          const itemToAdd = { id: doc.id, ...doc.data() };
          console.log("data from hompage: ", itemToAdd);
          console.log("data from homepage: doc name", itemToAdd.Name);

          handleAddToCart(itemToAdd);
        });
        window.alert("Item added to cart");
        console.log("querySnapshot ", querySnapshot);
      } catch (error) {
        console.log("error ", error);
      }
    } else {
      window.alert("Please login to add to cart");
      navToLogin();
    }
  };

  return (
    <div className="min-h-screen sm:max-w-xl md:max-w-6xl sm:h-[40rem] mx-auto px-5">
      <span className="top-8 relative">
        <div className="relative h-[80%] w-full rounded-2xl overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              key={slides[currentIndex].url}
              className=" bg-no-repeat rounded-2xl bg-cover bg-center flex items-center justify-around md:justify-normal"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7) 40%, rgba(0, 0, 0, 0.1)), url(${slides[currentIndex].url})`,
                width: "100%",
                height: "100%",
              }}
            >
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6, ease: "easeInOut" }}
                className="flex flex-col w-[70%] md:w-[40%] px-6 md:px-0 md:pl-32 text-center md:text-left"
              >
                <h2 className="font-montserrat text-2xl md:text-4xl text-mywhite font-extrabold">
                  {slides[currentIndex].title}
                </h2>
                <p className="font-montserrat text-sm md:text-lg text-mywhite font-normal pt-6">
                  {slides[currentIndex].desc}
                </p>
                <div className="pt-6">
                  <button
                    onClick={() => handleClick(slides[currentIndex].title)}
                    className="w-24 md:w-32 py-2 text-xs md:text-base rounded-3xl bg-gradient-to-tr from-orange-400 via-orange-500 to-orange-600 bg-orange-500 hover:bg-gradient-to-bl transition ease-in-out hover:scale-105 duration-300 hover:shadow-md hover:shadow-orange-500/30 font-semibold"
                  >
                    Add To Cart
                  </button>
                </div>
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
              <FontAwesomeIcon icon={faArrowLeft} />
            </div>
            <div
              className="text-base w-6 h-6 sm:text-xl sm:w-8 sm:h-8 md:w-12 md:h-12 bg-white md:text-2xl opacity-40 rounded-full flex items-center justify-center hover:opacity-60 hover:cursor-pointer transition duration-200 ease-in-out"
              onClick={() => {
                nextSlide();
              }}
            >
              <FontAwesomeIcon icon={faArrowRight} />
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
      </span>
    </div>
  );
}
