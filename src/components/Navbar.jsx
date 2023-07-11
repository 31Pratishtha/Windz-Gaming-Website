import React from "react";
import LogoLight from "./logoLight.png";
import { NavLink } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="bg-lightBlue">
      <div className="relative container mx-auto p-2 flex items-center justify-between">
        <NavLink to="/">
          <img src={LogoLight} alt="WindzGaming" className="w-28" />
        </NavLink>
        <ul className="flex space-x-24">
          <li className="transition duration-200 ease-in-out hover:scale-110">
            <NavLink to="/about" className="transition duration-200 ease-in-out hover:text-hoverText">About Us</NavLink>
          </li>
          <li className="transition duration-200 ease-in-out hover:scale-110">
            <NavLink to="/pricing" className="transition duration-200 ease-in-out hover:text-hoverText">Pricing</NavLink>
          </li>
          <li className="transition duration-200 ease-in-out hover:scale-110">
            <NavLink to="/contact" className="transition duration-200 ease-in-out hover:text-hoverText">Contact</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
