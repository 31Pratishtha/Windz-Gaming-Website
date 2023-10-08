import React, { useEffect, useState } from "react"; // Import useEffect
import { useProduct } from "/src/contexts/ProductContext";
import {useAuth} from "/src/contexts/AuthContext"
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {   collection, doc, getDoc, setDoc } from 'firebase/firestore';


export default function Products() {
  const { currentUser } = useAuth();
  const { products } = useProduct();
  const navigate = useNavigate();

  const cartCollectionRef = collection(db, "Users", currentUser.uid, "Cart");
  
  const handleAddToCart = async(prod) => {
    
    if(currentUser) {
      // console.log("prodId: ", prod.id); //abcd
      const cartItemDocId = prod.id;
      const cartItemsDocRef = doc(cartCollectionRef, cartItemDocId)
      // console.log("prodName: ", prod.Name);
      // console.log("prodprice: ", prod.Price);
      try{
        const cartItemSnapshot = await getDoc(cartItemsDocRef);
        console.log("cartItemSnapshot: ", cartItemSnapshot.id); //abcd

        if(!cartItemSnapshot.exists()){
          // console.log("exist?: ", cartItemSnapshot.exists());
          await setDoc(cartItemsDocRef, {name: prod.Name, price: prod.Price, qty: 1})
        }
        else{
          const cartItemData = cartItemSnapshot.data();
          const updatedQty = (cartItemData.qty || 0) + 1;
          await setDoc(cartItemsDocRef, {...cartItemData, qty: updatedQty});
        }

      }catch(error){
        console.log(error);
      } 
      // console.log("CartItem: ", cartItemsDocRef.id); //abcd
    }
    else{
      navigate("/authentication", {replace: true})
    }
  }

  return <div className="text-lightText">
    <div className="text-myblack flex flex-col ">
      {products.map((product) => (
        <div key={product.id} className="flex justify-between items-center bg-mywhite">
          <h2>{product.Name}</h2>
          <p>Price: ${product.Price}</p>
          <img src={product.Image} width={200} height={200} alt={product.Name} />
          <button onClick={() => handleAddToCart(product)}>Add to cart</button>
        </div>
      ))}
    </div>
  </div>;
}
