import React, { useEffect, useState } from "react";
import { useAuth } from "/src/contexts/AuthContext";
import { db } from "../firebase";
import { useCartItems } from "/src/contexts/CartItemsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Cart() {
  const { handleAddToCart, handleRemoveFromCart, itemQty, cart, setCart } =
    useCartItems();
  const { currentUser } = useAuth();
  const [deleting, setDeleting] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
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
        const sub = cart.reduce(
          (total, item) => total + item.price * item.qty,
          0
        );
        const disc = cart.reduce(
          (discount, item) => discount + 0.1 * item.price * item.qty,
          0
        );
        setSubtotal(sub);
        setDiscount(disc);
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
    <div className="flex flex-col text-myblack bg-mywhite min-h-screen">
      <div className="bg-slate-200 h-20 justify-center items-center flex">
        <p className="text-myblack text-3xl">
          <i>Your Cart</i>
        </p>
      </div>
      <div className="flex flex-grow bg-red-400 ">
        <div className="w-5/6 bg-[#ecf0f1] text-myblack pb-2 max-h-screen  overflow-y-auto">
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
                            <div className="grid grid-flow-col w-24 rounded-lg border border-solid border-slate-400  text-slate-800 ">
                              <button
                                onClick={() => handleRemoveFromCart(item)}
                                className="px-[2%] py-1 text-slate-800 rounded-s-lg hover:scale-150 "
                              >
                                -
                              </button>
                              <p className="text-center py-1">{item.qty}</p>
                              <button
                                onClick={() => handleAddToCart(item)}
                                className="px-[2%] py-1 text-slate-800 rounded-e-lg hover:scale-150"
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
        <div className="w-2/5 bg-slate-400 p-10 flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>
                ₹ {cart.reduce((total, item) => total + item.price * item.qty, 0)}
              </p>
            </div>

            <div className="flex justify-between">
              <p>Discount</p>
              <p>
                ₹ {cart.reduce(
                  (discount, item) => discount + 0.1 * item.price * item.qty,
                  0
                )}
              </p>
            </div>

            <div className="flex justify-between">
              <p>Grand Total</p>
              <p>
                ₹ {cart.reduce(
                  (total, item) => total + item.price * item.qty,
                  0
                ) -
                  cart.reduce(
                    (discount, item) => discount + 0.1 * item.price * item.qty,
                    0
                  )}
              </p>
            </div>
          </div>
          <button>Checkout</button>
        </div>
      </div>
    </div>
  );
}
