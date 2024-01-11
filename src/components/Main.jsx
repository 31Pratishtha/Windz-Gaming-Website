import React from "react";
import AboutUs from "./AboutUs";
import Homepage from "./Homepage/Homepage";
import AuthPage from "./Auths/AuthPage";
import Logout from "./Auths/Logout";
import Cart from "./Cart";
import Products from "./Products";
import { Routes, Route } from "react-router-dom";

export default function Main() {
  return (
    <main>
      <Routes>
        <Route exact path="/" Component={Homepage}/>
        <Route path="/about" Component={AboutUs} />
        <Route path="/products" Component={Products} />
        <Route path="/cart" Component={Cart} />
        <Route path="/authentication" Component={AuthPage} />
        <Route path="/profile" Component={Logout} />
      </Routes>
    </main>
  );
}
