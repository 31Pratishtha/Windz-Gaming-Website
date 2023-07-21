import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const socials = [
    {
      icon: faSquareFacebook,
      link: "https://www.facebook.com/",
    },
    {
      icon: faInstagram,
      link: "https://www.instagram.com/",
    },
    {
      icon: faTwitter,
      link: "https://twitter.com/",
    },
    {
      icon: faYoutube,
      link: "https://www.youtube.com/",
    },
    {
      icon: faDiscord,
      link: "https://discord.com/",
    },
  ];
  return (
    <footer className="bg-lightBlue text-blueText h-auto flex font-montserrat p-12 justify-between">
      <div className="flex flex-col justify-center items-start w-1/3">
        <img
          className="w-40"
          src="/src/assets/Images/LogoLight.png"
          alt="WindzGaming"
        />
        <p className="text-sm pt-2 italic">
          Embrace the Ultimate Gaming Odyssey, Where Dreams Take Flight with
          WindzGaming's Limitless Adventure.
        </p>
      </div>
      <div className="w-1/3">
        <ul className="flex py-2 h-full items-center flex-col justify-between">
          <li className="transition duration-200 ease-in-out hover:scale-110">
            <NavLink
              to="/"
              className="transition duration-200 ease-in-out hover:text-hoverText"
            >
              Homepage
            </NavLink>
          </li>
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
              to="/products"
              className="transition duration-200 ease-in-out hover:text-hoverText"
            >
              Products
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
        </ul>
      </div>
      <div className="w-1/3">

        <ul className="flex py-2 h-full items-center justify-between">
          {socials.map((icon) => (
            <li className="flex items-center justify-center">
              <a href={icon.link} target="_blank" rel="noreferrer" className="text-3xl">
                <FontAwesomeIcon icon={icon.icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
