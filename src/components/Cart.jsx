import React, { useEffect, useState } from "react";
import { useAuth } from "/src/contexts/AuthContext";
import { db } from "../firebase";
import { useCartItems } from "/src/contexts/CartItemsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Cart() {
  const {handleAddToCart, handleRemoveFromCart, itemQty, cart, setCart} = useCartItems();
  const { currentUser } = useAuth();
  // const [cart, setCart] = useState([]);
  const [deleting, setDeleting] = useState(false);

  const cartCollectionRef = collection(db, "Users", currentUser.uid, "Cart");

  const deleteItem = async (prod) => {
    setDeleting(true);
    const cartItemDocId = prod.id;
    const cartItemsDocRef = doc(cartCollectionRef, cartItemDocId);
    await deleteDoc(cartItemsDocRef);
    setDeleting(false);
  };

  const fetchCart = async () => {
    console.log("fetching cart");
    try {
      if (currentUser) {
        const querySnapshot = await getDocs(
          collection(db, "Users", currentUser.uid, "Cart")
        );

        const items = [];

        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });

        setCart(items);
        console.log("items ", items);
      }
    } catch (error) {
      console.log("error fetching cart", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [itemQty, deleting]);

  console.log("cart", cart);
  return (
    <div className="flex flex-col text-myblack bg-mywhite">
      <div className="bg-slate-200 h-20 justify-center items-center flex">
        <p className="text-myblack text-3xl">
          <i>Your Cart</i>
        </p>
      </div>
      <div className="flex flex-grow bg-red-400 ">
        <div className="w-3/5 bg-slate-300 text-myblack pb-2 max-h-screen overflow-y-auto">
          {cart
            .filter((item) => item.qty > 0)
            .map((item) => {
              return (
                <div className="relative" key={item.id}>
                  <div className="text-myblack grid grid-cols-2 max-h-70 py-7 pl-5 ">
                    <img
                      src={item.image}
                      style={{ width: "70%" }}
                      alt={item.name}
                    />
                    <div className="grid grid-rows-2">
                      <div className="flex items-center">
                        <p className="text-lg font-semibold">{item.name}</p>
                      </div>
                      <div className="flex justify-between pr-12">
                        <div className="flex justify-center items-center gap-2">
                          <div className="flex justify-center">
                            <div className="grid grid-flow-col w-40 rounded-lg border border-solid border-slate-400  text-slate-800 ">
                              <button
                                onClick={() => handleRemoveFromCart(item)}
                                className="px-[15%] py-2 bg-slate-800 text-mywhite rounded-s-lg "
                              >
                                -
                              </button>
                              <p className="text-center py-2">{item.qty}</p>
                              <button
                                onClick={() => handleAddToCart(item)}
                                className="px-[15%] py-2 bg-slate-800 text-mywhite rounded-e-lg"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center items-center">
                          <p className="font-medium">₹ {item.price}</p>
                        </div>
                        <div className="flex justify-center items-center">
                          <button onClick={() => deleteItem(item)}>
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-6 right-6 bottom-0 border-b-[1px] border-gray-500"></div>
                </div>
              );
            })}
        </div>
        <div className="w-2/5 bg-slate-400">checkout</div>
      </div>
    </div>
  );
}
