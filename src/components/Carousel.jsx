import { React, useEffect, useRef, useState } from "react";

export default function Carousel() {
  const timerRef = useRef(null);
  const slides = [
    { url: "/src/assets/Images/Destiny.jpg", title: "Destiny" },
    { url: "/src/assets/Images/Chrononexus.jpg", title: "Chrononexus" },
    { url: "/src/assets/Images/Astralascendancy.jpg", title: "Astralascendancy"},
    { url: "/src/assets/Images/cyberpunk.jpg", title: "cyberpunk" },
    { url: "/src/assets/Images/Nomansky.png", title: "Nomansky" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
    if (currentIndex === 0) {
      setCurrentIndex(slides.length - 1);
    }
  };

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (currentIndex === slides.length - 1) {
      setCurrentIndex(0);
    }
  };

  // useEffect(() => {
  //   if(timerRef.current){
  //     clearTimeout(timerRef.current)
  //   }
  //   console.log("useEffect")
  //   timerRef.current = setTimeout(() => {
  //     nextSlide()
  //   }, 2500)

  //   return () => {clearTimeout(timerRef.current)}
  // }, [nextSlide])

  return (
    <div className="h-[12rem] sm:max-w-2xl sm:h-[19rem] md:max-w-6xl md:h-[33rem] mx-auto my-10 px-5">
      <div className="relative h-[92%] w-full rounded-2xl ">
        <div
          className="bg-no-repeat rounded-2xl bg-cover bg-center flex items-center"
          style={{
            backgroundImage: `url(${slides[currentIndex].url})`,
            width: "100%",
            height: "100%",
            transition: "0.5s ease-in-out",
          }}
        >
          <div className="flex justify-between items-center px-3 w-full">
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
            {slideindex === currentIndex ? "●" : "○"  }
          </div>
        ))}
      </div>
    </div>
  );
}
