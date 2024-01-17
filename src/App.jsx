import React from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import { ProductProvider } from "./contexts/ProductContext";
import { UserProvider } from "./contexts/UserContext";
import { CartItemsProvider } from "./contexts/CartItemsContext";

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <UserProvider>
          <CartItemsProvider>
            <div className="bg-myblack min-h-screen overflow-hidden">
              <Navbar />
              <Main />
              <Footer />
            </div>
          </CartItemsProvider>
        </UserProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
