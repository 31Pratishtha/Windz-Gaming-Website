import React, { Suspense } from "react";
import AboutUs from "./AboutUs";
const Homepage = React.lazy(() => import("./Homepage/Homepage"));
const AuthPage = React.lazy(() => import("./Auths/AuthPage"));
const Logout = React.lazy(() => import("./Auths/Logout"));
const Cart = React.lazy(() => import("./Cart"));
const Products = React.lazy(() => import("./Products"));
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

export default function Main() {
  const location = useLocation();
  return (
    <main className="font-montserrat">
      <AnimatePresence mode="wait">
        <Suspense fallback={<p>Loading...</p>}>
          <Routes location={location} key={location.pathname}>
            <Route exact path="/" Component={Homepage} />
            <Route path="/about" Component={AboutUs} />
            <Route path="/products" Component={Products} />
            <Route path="/cart" Component={Cart} />
            <Route path="/authentication" Component={AuthPage} />
            <Route path="/profile" Component={Logout} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </main>
  );
}
