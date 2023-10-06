import React, { useEffect, useState} from "react"; // Import useEffect
import { useProduct } from "/src/contexts/ProductContext";
import {useAuth} from "/src/contexts/AuthContext"
import { useNavigate } from "react-router-dom";


export default function Products() {
  const { currentUser } = useAuth();
  const { products } = useProduct();
  const navigate = useNavigate();

  const handleAddToCart = (prodId) => {
    if(currentUser) {
      alert("Added to cart");
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
          <button onClick={() => handleAddToCart(product.id)}>Add to cart</button>
        </div>
      ))}
    </div>
  </div>;
}
