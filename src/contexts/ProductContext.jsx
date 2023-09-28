import React, {useContext, createContext} from 'react'
import { db } from "../firebase"
import { collection, getDocs } from "firebase/firestore"; 

const ProductContext = createContext();

export function useProduct(){
    return useContext(ProductContext);
}

export function ProductProvider({children}) {
    async function getProducts() {
        const products = await getDocs(collection(db, "products"));
        console.log(products);
    }

    const value = {
        getProducts,
    };
    
    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
  )
}
