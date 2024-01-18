import { useState } from "react";
import { React, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useProduct } from "/src/contexts/ProductContext";
import { useCartItems } from "/src/contexts/CartItemsContext";
import { useAuth } from "/src/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "/src/firebase";
import { collection, getDocs, query, where, doc } from "firebase/firestore";

export default function ProductShowVR() {

    
  //for adding to cart
  const { handleAddToCart } = useCartItems();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const navToLogin = () => {
    navigate("/authentication", { replace: true });
  };

  const handleClick = async () => {
    if (currentUser) {
      try {
        const q = query(
          collection(db, "Products"),
          where("Name", "==", "WindzStation VR")
        );
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


  //for animations

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
      className="bg-mywhite text-myblack h-screen mx-auto justify-center items-center lg:p-12 md:p-10 lg:gap-12 sm:gap-1 md:gap-3 md:flex"
    >
      <motion.div
        animate={NameAnimation}
        className="flex flex-col text-center sm:pt-12 sm:px-8 md:text-left lg:w-2/5 md:w-3/5 mx-auto md:mx-14 gap-4 text-myblack"
      >
        <h1 className="font-montserrat font-bold lg:text-4xl md:text-2xl sm:text-xl">WindzStation VR</h1>
        <p className="font-montserrat lg:text-xl md:text-lg sm:text-base font-light">
          Enter an extraordinary gaming universe where dreams come alive.
          Powered by WindzStation and immersive VR, experience mind-bending
          adventures beyond reality. Get ready for exhilarating gameplay like
          never before.
        </p>
        <div>
          <button
            onClick={() => handleClick()}
            className="w-32 py-2 rounded-3xl bg-gradient-to-tr from-orange-400 via-orange-500 to-orange-600 bg-orange-500 hover:bg-gradient-to-bl transition ease-in-out hover:scale-105 duration-300 hover:shadow-md hover:shadow-orange-500/30 font-semibold"
          >
            Add To Cart
          </button>
        </div>

      </motion.div>
      <div className="lg:p-20 md:p-12 sm:p-11 flex justify-center mx-auto overflow-hidden">
        <motion.img
          whileHover={{
            scale: 1.2,
            transition: { type: "spring", duration: 0.5, bounce: 0.5 },
          }}
          animate={ps5Amimaton}
          initial={{ x: "100vw" }}
          src="/assets/Images/VR.png"
          alt="VR Headset"
          className="md:w-[100%] sm:w-[40%]"
        />
      </div>
    </div>
  );
}
