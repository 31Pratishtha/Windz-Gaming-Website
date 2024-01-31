import React from "react";
import AboutUs from "./AboutUs";
import Homepage from "./Homepage/Homepage";
import AuthPage from "./Auths/AuthPage";
import Logout from "./Auths/Logout";
import Cart from "./Cart";
import Products from "./Products";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";


export default function Main() {
  const location = useLocation();
  return (
    <main className="font-montserrat">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route exact path="/" Component={Homepage} />
          <Route path="/about" Component={AboutUs} />
          <Route path="/products" Component={Products} />
          <Route path="/cart" Component={Cart} />
          <Route path="/authentication" Component={AuthPage} />
          <Route path="/profile" Component={Logout} />
        </Routes>
      </AnimatePresence>
    </main>
  );
}