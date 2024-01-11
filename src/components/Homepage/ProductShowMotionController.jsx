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

export default function ProductShowMotionController() {
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
          where("Name", "==", "WindzStation Move Motion Controller")
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
      className="bg-myblack h-screen py-11 p-12 overflow-hidden justify-center items-center flex flex-col gap-12 md:flex-row-reverse "
    >
      <motion.div
        animate={descAnimation}
        className="flex text-mywhite flex-col text-center pt-20 md:pt-0 md:text-left w-[80%] md:w-2/5 mx-auto md:mx-14 gap-4"
      >
        <h1 className="font-montserrat font-bold text-4xl">WindzStation Move motion controller</h1>
        <p className="font-montserrat text-xl font-light">
        Bring your hands into the game world and take full control of your VR experiences, giving an even deeper sense of presence and further enhancing your immersion.
        </p>
        <button
          onClick={() => handleClick()}
          className="w-32 py-2 rounded-3xl bg-gradient-to-tr from-orange-400 via-orange-500 to-orange-600 bg-orange-500 hover:bg-gradient-to-bl transition ease-in-out hover:scale-105 duration-300 hover:shadow-md hover:shadow-orange-500/30 font-semibold"
        >
          Add To Cart
        </button>
      </motion.div>
      <div className="md:p-4 flex justify-center mx-auto">
        <motion.img
          whileHover={{
            scale: 1.2,
            transition: { type: "spring", duration: 0.5, bounce: 0.5 },
          }}
          animate={headsetAnimation}
          initial={{ x: "100vw" }}
          src="/assets/Images/motionController.png"
          alt="ps5"
          className="w-[70%] md:w-[50%] h-auto"
        />
      </div>
    </div>
  );
}
