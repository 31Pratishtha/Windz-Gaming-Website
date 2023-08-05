import React from "react";
import AboutUs from "./AboutUs/AboutUs";
import Pricing from "./Pricing/Pricing";
import Contact from "./Contact/Contact";
import Homepage from "./Homepage/Homepage";
import Signup from "./Auths/Signup";
import Login from "./Auths/Login";
import { Routes, Route } from "react-router-dom";

export default function Main() {
  return (
    <main>
      <Routes>
        <Route exact path="/" Component={Homepage}/>
        <Route path="/about" Component={AboutUs} />
        <Route path="/pricing" Component={Pricing} />
        <Route path="/contact" Component={Contact} />
        <Route path="/signup" Component={Signup} />
        <Route path="/signup" Component={Signup} />
        <Route path="/login" Component={Login} />
      </Routes>
    </main>
  );
}
