import { React, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useCartItems } from "/src/contexts/CartItemsContext";
import { useAuth } from "/src/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "/src/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function ProductShowHeadset() {
  
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
          where("Name", "==", "Pulse 3D Wireless Headset")
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
      className="bg-myblack h-screen overflow-hidden items-center lg:p-12 md:p-10  sm:p-12 flex flex-col lg:gap-12 sm:gap-16 md:gap-6 md:flex-row-reverse"
    >
      <motion.div
        animate={descAnimation}
        className="flex text-mywhite flex-col text-center sm:pt-0 sm:px-8 md:text-left lg:w-2/5 md:w-3/5 mx-auto lg:mx-14 md:mx-8 gap-4"
      >
        <h1 className="font-montserrat font-bold lg:text-4xl md:text-2xl sm:text-xl">
          Pulse 3D Wireless Headset
        </h1>
        <p className="font-montserrat lg:text-xl md:text-lg sm:text-base font-light">
          Enjoy a seamless, wireless experience with a headset fine-tuned for 3D
          Audio on WindzStation Console. Featuring a refined design with dual noise-cancelling microphones, USB Type-C®
          charging, and an array of easy-access controls.
        </p>
        <div>
          <button
            onClick={() => handleClick()}
            className="w-32 py-2 rounded-3xl bg-gradient-to-tr from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-bl transition ease-in-out hover:scale-105 duration-300 hover:shadow-md hover:shadow-orange-500/30 font-semibold"
          >
            Add To Cart
          </button>
        </div>
      </motion.div>
      <div className="md:p-4 flex justify-center mx-auto">
        <motion.img
          whileHover={{
            scale: 1.2,
            transition: { type: "spring", duration: 0.5, bounce: 0.5 },
          }}
          animate={headsetAnimation}
          initial={{ x: "100vw" }}
          src="/assets/Images/headset.webp"
          alt="headsets"
          className="lg:w-[97%] md:w-[80%] sm:w-[50%]"
        />
      </div>
    </div>
  );
}
