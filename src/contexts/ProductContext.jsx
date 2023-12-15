import React, { useContext, createContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const ProductContext = createContext();

export function useProduct() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  
  //Creating a Collection Reference
  const collectionRef = collection(db, "Products");
  
  //Creating a Query
  async function getMultipleDocs() {
    const querySnapshot = await getDocs(collectionRef);
    const productsArray = [];

    querySnapshot.forEach((doc) => {
      productsArray.push({ id: doc.id, ...doc.data() });
    });
    setProducts(productsArray);
    console.log("productsArray: ", productsArray);
  }
  
  useEffect(() => {
    getMultipleDocs();
  }, [])
  

  const value = {
    products,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
