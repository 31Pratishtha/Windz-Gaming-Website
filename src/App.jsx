import { React, useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import { ProductProvider } from "./contexts/ProductContext";
import { UserProvider } from "./contexts/UserContext";
import { CartItemsProvider } from "./contexts/CartItemsContext";

export default function App() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <AuthProvider>
      <ProductProvider>
        <UserProvider>
          <CartItemsProvider>
            <div
              className={`bg-myblack overflow-hidden ${navOpen ? "h-screen" : "min-h-screen"}`}
            >
              <Navbar navOpen={navOpen} setNavOpen={setNavOpen} />
              <Main />
              <Footer />
            </div>
          </CartItemsProvider>
        </UserProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
