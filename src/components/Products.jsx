import React, { useEffect, useState } from "react"; // Import useEffect
import { useProduct } from "/src/contexts/ProductContext";
import { useAuth } from "/src/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

export default function Products() {
  const { currentUser } = useAuth();
  const { products } = useProduct();
  const navigate = useNavigate();

  let cartCollectionRef = null;
  if (currentUser) {
    cartCollectionRef = collection(db, "Users", currentUser.uid, "Cart");
  }

  const handleAddToCart = async (prod) => {
    if (currentUser) {
      const cartItemDocId = prod.id;
      const cartItemsDocRef = doc(cartCollectionRef, cartItemDocId);
      try {
        const cartItemSnapshot = await getDoc(cartItemsDocRef);
        console.log("cartItemSnapshot: ", cartItemSnapshot.id);

        if (!cartItemSnapshot.exists()) {
          await setDoc(cartItemsDocRef, {
            name: prod.Name,
            price: prod.Price,
            qty: 1,
          });
        } else {
          const cartItemData = cartItemSnapshot.data();
          const updatedQty = (cartItemData.qty || 0) + 1;
          await setDoc(cartItemsDocRef, { ...cartItemData, qty: updatedQty });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/authentication", { replace: true });
    }
  };

  return (
    <div className="text-myblack flex flex-col bg-mywhite ">
      <div className="m-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="grid grid-cols-4 gap-2 my-4 items-center bg-slate-200 px-8 py-2 rounded-lg"
          >
            <img
              src={product.Image}
              width={150}
              height={150}
              alt={product.Name}
            />
            <h2>{product.Name}</h2>
            <p className="flex justify-center font-semibold">${product.Price}</p>
            <div className="flex justify-center">
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-slate-800 text-mywhite py-2 w-40 rounded-lg"
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
