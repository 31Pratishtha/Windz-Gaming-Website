import React from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import { ProductProvider } from "./contexts/ProductContext";
export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <div className="bg-myblack min-h-screen">
          <Navbar />
          <Main />
          <Footer />
        </div>
      </ProductProvider>
    </AuthProvider>
  );
}
