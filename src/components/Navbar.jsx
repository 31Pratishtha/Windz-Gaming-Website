import React from "react";
import logoLight from "/assets/Images/LogoLight.png";
import { NavLink } from "react-router-dom";
import { useAuth } from "/src/contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const { currentUser } = useAuth();

  return (
    <nav className="bg-lightBlue text-blueText font-montserrat">
      <div className="relative container mx-auto p-2 flex items-center justify-between">
        <NavLink to="/">
          <img src={logoLight} alt="WindzGaming" className="w-20" />
        </NavLink>
        <ul className="hidden md:flex space-x-16 ">
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
              to="/Products"
              className="transition duration-200 ease-in-out hover:text-hoverText"
            >
              Products
            </NavLink>
          </li>

          {currentUser ? (
            <>
              <li className="transition duration-200 ease-in-out hover:scale-110">
                <NavLink
                  to="/profile"
                  className="transition duration-200 ease-in-out hover:text-hoverText"
                >
                  Profile
                </NavLink>
              </li>
              <li className="transition duration-200 ease-in-out hover:scale-110">
                <NavLink
                  to="/cart"
                  className="transition duration-200 ease-in-out hover:text-hoverText"
                >
                  <div className="flex justify-center gap-2">
                    Cart
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      className="text-2xl"
                    />
                  </div>
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="transition duration-200 ease-in-out hover:scale-110">
                <NavLink
                  to="/authentication"
                  className="transition duration-200 ease-in-out hover:text-hoverText"
                >
                  SignUp
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
