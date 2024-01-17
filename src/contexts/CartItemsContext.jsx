import React, { useContext, createContext, useState, useEffect } from "react";
import { useAuth } from "/src/contexts/AuthContext";
import { db } from "../firebase";
import {
  collection,
  doc,
  onSnapshot,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

const CartItemsContext = createContext();

export function useCartItems() {
  return useContext(CartItemsContext);
}

export function CartItemsProvider({ children }) {
  const [itemQty, setItemQty] = useState({});
  const [cart, setCart] = useState([]);
  const { currentUser } = useAuth();
  let cartCollectionRef;

  if (currentUser) {
    cartCollectionRef = collection(db, "Users", currentUser.uid, "Cart");
    const UsersCollectionRef = collection(db, "Users");
    const UserDocRef = doc(UsersCollectionRef, currentUser.uid);
    const UserCartRef = collection(UserDocRef, "Cart");

    try {
      const cartItems = [];

      onSnapshot(UserCartRef, (querySnapshot) => {
        cartItems.length = 0;

        querySnapshot.forEach((doc) => {
          const item = doc.data();
          cartItems.push(item);
        });
        const cartQty = cartItems.reduce((total, item) => total + item.qty, 0);
        console.log("cartQty: ", cartQty);
      });
    } catch (error) {
      console.log("Error retrieving user's cart data: ", error);
    }
  }

  const handleAddToCart = async (prod) => {
    try {
      console.log("data from handleAddToCart: ", prod);
      console.log("data from handleAddToCart: prod name", prod.Name);
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

      setItemQty(prod.qty);
      setItemQty((prevQty) => ({
        prevQty: prevQty + 1,
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

  const value = {
    handleAddToCart,
    handleRemoveFromCart,
    itemQty,
    cart,
    setCart,
  };
  return (
    <CartItemsContext.Provider value={value}>
      {children}
    </CartItemsContext.Provider>
  );
}
