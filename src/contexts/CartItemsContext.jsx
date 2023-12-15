import React, { useContext, createContext, useState, useEffect } from "react";
import { useAuth } from "/src/contexts/AuthContext";
import { db } from "../firebase";
import { collection, doc, onSnapshot} from "firebase/firestore";

const CartItemsContext = createContext();

export function useCartItems() {
  return useContext(CartItemsContext);
}

export function CartItemsProvider({ children }) {

    const { currentUser } = useAuth();

    if(currentUser){
    const UsersCollectionRef = collection(db, "Users");
    const UserDocRef = doc(UsersCollectionRef, currentUser.uid);
    const UserCartRef = collection(UserDocRef, "Cart");
    
    try{
        const cartItems = [];
        
            onSnapshot(UserCartRef, (querySnapshot) => {
                cartItems.length = 0;

                querySnapshot.forEach((doc) => {
                    const item = doc.data();
                    cartItems.push(item);
                })  
                const cartQty = cartItems.reduce((total, item) => total + item.qty, 0);
                console.log("cartQty: ", cartQty);
            })

        
        }catch(error){
            console.log("Error retrieving user's cart data: ", error);
        };

    }


    const value = {};
    return(
        <CartItemsContext.Provider value={value}>
            {children}
        </CartItemsContext.Provider>
    );
}