import React, { useEffect, useState } from "react";
import logoLight from "/assets/Images/LogoLight.webp";
import { NavLink } from "react-router-dom";
import { useAuth } from "/src/contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faBars } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion, spring } from "framer-motion";

export default function Navbar({ navOpen, setNavOpen }) {
  const { currentUser } = useAuth();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [prevWindowWidth, setPrevWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setPrevWindowWidth(windowWidth);
      console.log("prevWindowWidth", prevWindowWidth);
      setWindowWidth(window.innerWidth);
      console.log("WindowWidth", windowWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  useEffect(() => {
    if (
      (navOpen && prevWindowWidth > 768 && windowWidth <= 768) ||
      (prevWindowWidth <= 768 && windowWidth > 768)
    ) {
      setNavOpen(false);
    }
  }, [navOpen, windowWidth, prevWindowWidth, setNavOpen]);

  const toggleMenu = () => {
    setNavOpen((prevOpen) => !prevOpen);
  };

  return (
    <>
      <nav className="bg-lightBlue text-blueText font-montserrat relative z-20">
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
          <div
            className="md:hidden sm:flex text-2xl hover:cursor-pointer"
            onClick={toggleMenu}
          >
            <FontAwesomeIcon icon={faBars} />
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {navOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={navOpen ? { y: 0 } : { y: "-100%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full h-screen bg-lightBlue z-10 text-blueText font-montserrat"
          >
            <div className="w-screen h-screen flex items-center justify-center ">
              <div className="-top-11 relative">
                <ul className="flex flex-col items-center justify-center text-2xl gap-6">
                  <li className="transition duration-200 ease-in-out hover:scale-110">
                    <NavLink
                      to="/about"
                      className="transition duration-200 ease-in-out hover:text-hoverText"
                      onClick={toggleMenu}
                    >
                      About Us
                    </NavLink>
                  </li>
                  <li className="transition duration-200 ease-in-out hover:scale-110">
                    <NavLink
                      to="/Products"
                      className="transition duration-200 ease-in-out hover:text-hoverText"
                      onClick={toggleMenu}
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
                          onClick={toggleMenu}
                        >
                          Profile
                        </NavLink>
                      </li>
                      <li className="transition duration-200 ease-in-out hover:scale-110">
                        <NavLink
                          to="/cart"
                          className="transition duration-200 ease-in-out hover:text-hoverText"
                          onClick={toggleMenu}
                        >
                          <div className="flex gap-2">
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
                          onClick={toggleMenu}
                        >
                          SignUp
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
