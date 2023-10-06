import React, { useContext, createContext } from "react";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";
import { collection, doc, setDoc, getDoc, addDoc } from "firebase/firestore";

//This context is for creating User and their cart data in the firestore

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
    
  async function createUser(newUser) {
    console.log("newUserUserContext", newUser);
    console.log("in createUser");
    if (newUser) {
      console.log("newUser", newUser.uid);
      const id = newUser.uid;
      const userDocRef = doc(db, "Users", id);

      try {
        const userDocSnapshot = await getDoc(userDocRef);

        if (!userDocSnapshot.exists()) {
          await setDoc(doc(db, "Users", id), {
            username: newUser.email,
          });

          const cartCollectionRef = collection(db, "Users", id, "Cart");
          const productData = {
            name: null,
            price: null,
          };

          await addDoc(cartCollectionRef, productData);
          console.log("User Created");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const value = {
    createUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
