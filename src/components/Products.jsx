import React, { useEffect, useState} from "react"; // Import useEffect
import { useProduct } from "/src/contexts/ProductContext";

export default function Products() {
  const { products } = useProduct();

  const handleAddToCart = () => {
    
  }

  return <div className="text-lightText">
    <div className="text-myblack flex flex-col ">
      {products.map((product) => (
        <div key={product.id} className="flex justify-between bg-mywhite">
          <h2>{product.Name}</h2>
          <p>Price: ${product.Price}</p>
          <img src={product.Image} width={200} height={200} alt={product.Name} />
          <button onClick={handleAddToCart}>Add to cart</button>
        </div>
      ))}
    </div>
  </div>;
}
