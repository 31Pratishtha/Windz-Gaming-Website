import React from "react";
import logoLight from "../assets/Images/logoLight.png";
import { NavLink } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="bg-lightBlue text-blueText font-montserrat">
      <div className="relative container mx-auto p-2 flex items-center justify-between">
        <NavLink to="/">
          <img src={logoLight} alt="WindzGaming" className="w-20" />
        </NavLink>
        <ul className="hidden md:flex space-x-24 ">
          <li className="transition duration-200 ease-in-out hover:scale-110">
            <NavLink
              to="/about"
              className="transition duration-200 ease-in-out hover:text-hoverText"
            >
              About Us
            </NavLink>
          </li>
          <li className="transition duration-200 ease-in-out hover:scale-110">
            <NavLink
              to="/pricing"
              className="transition duration-200 ease-in-out hover:text-hoverText"
            >
              Pricing
            </NavLink>
          </li>
          <li className="transition duration-200 ease-in-out hover:scale-110">
            <NavLink
              to="/contact"
              className="transition duration-200 ease-in-out hover:text-hoverText"
            >
              Contact
            </NavLink>
          </li>
          <li className="transition duration-200 ease-in-out hover:scale-110">
            <NavLink
              to="/cart"
              className="transition duration-200 ease-in-out hover:text-hoverText"
            >
              Cart
            </NavLink>
          </li>
          <li className="transition duration-200 ease-in-out hover:scale-110">
            <NavLink
              to="/signup"
              className="transition duration-200 ease-in-out hover:text-hoverText"
            >
              SignUp
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
