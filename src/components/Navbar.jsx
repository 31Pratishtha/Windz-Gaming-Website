import React from "react";
import logo from "./logo.png"
export default function Navbar() {
  return (
    <nav className="bg-offWhite">
      <div className="relative container mx-auto p-2 flex items-center justify-between">
        <div>
            <img src={logo} alt="" className="w-32"/>
        </div>
        <div className="flex space-x-6">
            <a href="#">About Us</a>
            <a href="#">Pricing</a>
            <a href="#">Contact</a>
        </div>
      </div>
    </nav>
  );
}
