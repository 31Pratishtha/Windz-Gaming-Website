import React from "react";
import AboutUs from "./AboutUs";
import Pricing from "./Pricing";
import Contact from "./Contact";
import Homepage from "./Homepage";
import { Routes, Route } from "react-router-dom";

export default function Main() {
  return (
    <main>
      <Routes>
        <Route path="/" Component={Homepage}/>
        <Route path="/about" Component={AboutUs} />
        <Route path="/pricing" Component={Pricing} />
        <Route path="/contact" Component={Contact} />
      </Routes>
    </main>
  );
}
