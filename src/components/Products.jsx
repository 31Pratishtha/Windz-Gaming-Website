import React, { useEffect, useState } from "react";
import { useProduct } from "/src/contexts/ProductContext";
import { useAuth } from "/src/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";

export default function Products() {
  const { currentUser } = useAuth();
  const { products } = useProduct();
  const navigate = useNavigate();
  const [itemQty, setItemQty] = useState({});

  let cartCollectionRef = null;
  if (currentUser) {
    cartCollectionRef = collection(db, "Users", currentUser.uid, "Cart");
  }

  useEffect(() => {
    const fetchItemQty = async () => {
      const qtyMap = {};
      for (const product of products) {
        const cartItemDocRef = doc(cartCollectionRef, product.id);

        try {
          const cartItemSnapshot = await getDoc(cartItemDocRef);
          const cartItemData = cartItemSnapshot.data();
          qtyMap[product.id] = cartItemData?.qty || 0;
        } catch (error) {
          console.log(error);
        }
      }
      setItemQty(qtyMap);
    };

    fetchItemQty();
  }, [products, currentUser]);

  const handleAddToCart = async (prod) => {
    try {
      const cartItemDocId = prod.id;
      const cartItemsDocRef = doc(cartCollectionRef, cartItemDocId);
      const cartItemSnapshot = await getDoc(cartItemsDocRef);
      const cartItemData = cartItemSnapshot.data();
      console.log("cartItemSnapshot: ", cartItemSnapshot.id);

      if (!cartItemSnapshot.exists()) {
        await setDoc(cartItemsDocRef, {
          name: prod.Name,
          image: prod.Image,
          price: Number(prod.Price),
          qty: 1,
        });
      } else {
        const updatedQty = (cartItemData.qty || 0) + 1;
        await setDoc(cartItemsDocRef, { ...cartItemData, qty: updatedQty });
      }

      setItemQty((prevQty) => ({
        ...prevQty,
        [prod.id]: (prevQty[prod.id] || 0) + 1,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFromCart = async (prod) => {
    try {
      const cartItemDocId = prod.id;
      const cartItemsDocRef = doc(cartCollectionRef, cartItemDocId);
      const cartItemSnapshot = await getDoc(cartItemsDocRef);
      const cartItemData = cartItemSnapshot.data();

      if (cartItemData.qty == 1) {
        await deleteDoc(cartItemsDocRef);
      } else if (cartItemData.qty > 1) {
        const updatedQty = (cartItemData.qty || 0) - 1;
        await setDoc(cartItemsDocRef, { ...cartItemData, qty: updatedQty });
      }

      setItemQty((prevQty) => ({
        ...prevQty,
        [prod.id]: Math.max((prevQty[prod.id] || 0) - 1, 0),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const navToLogin = () => {
    navigate("/authentication", { replace: true });
  };

  return (
    <motion.div
      className="text-myblack flex flex-col bg-slate-300 overflow-y-auto"
      initial={{ opacity: 0, transition: { duration: 0.3 } }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <div className="m-4">
        {products.map((product) => {
          return (
            <div
              key={product.id}
              className="grid grid-cols-4 gap-2 my-4 items-center bg-gradient-to-t from-slate-300 via-slate-200 to-slate-50 px-8 py-2 rounded-lg"
            >
              <img
                src={product.Image}
                width={150}
                height={150}
                alt={product.Name}
              />
              <h2>{product.Name}</h2>
              <p className="flex justify-center font-semibold">
                ₹{product.Price}
              </p>

              {currentUser ? (
                itemQty[product.id] > 0 ? (
                  <div className="flex justify-center">
                    <div className="grid grid-flow-col w-40 rounded-lg border border-solid border-slate-400  text-slate-800 ">
                      <button
                        onClick={() => handleRemoveFromCart(product)}
                        className="px-[15%] py-2 bg-slate-800 text-mywhite rounded-s-lg hover:bg-gradient-to-b hover:from-[#065f46bd] hover:via-[#065f4689] hover:ease-in-out hover:scale-105 hover:duration-150 "
                      >
                        -
                      </button>
                      <p className="text-center py-2">{itemQty[product.id]}</p>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="px-[15%] py-2 bg-slate-800 text-mywhite rounded-e-lg hover:bg-gradient-to-b hover:from-[#065f46bd] hover:via-[#065f4689] hover:ease-in-out hover:scale-105 hover:duration-150 "
                      >
                        +
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center ">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-slate-800 text-mywhite py-2 w-40 rounded-lg hover:bg-gradient-to-b hover:from-[#065f46bd]  hover:via-[#065f4689] hover:ease-in-out hover:scale-105 hover:duration-150 "
                    >
                      Add to cart
                    </button>
                  </div>
                )
              ) : (
                <div className="flex justify-center">
                  <button
                    onClick={() => navToLogin()}
                    className="bg-slate-800 text-mywhite py-2 w-40 rounded-lg hover:bg-gradient-to-b hover:from-[#065f46bd] hover:via-[#065f4689] hover:ease-in-out hover:scale-105 hover:duration-150 "
                  >
                    Add to cart
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
