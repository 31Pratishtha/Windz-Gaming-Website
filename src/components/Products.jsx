import React, { useEffect } from 'react'; // Import useEffect
import { useProduct } from '/src/contexts/ProductContext';

export default function Products() {
  const { getProducts } = useProduct();

  useEffect(() => {
    // Use useEffect to make sure getProducts is called after the component is mounted
    try {
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }, []); // Empty dependency array ensures this runs only once after component mount

  return (
    <div className='text-lightText'>Products</div>
  );
}
