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
    <footer className="bg-lightBlue text-blueText h-auto m-auto flex gap-8 p-10 items-center flex-col md:flex-row font-montserrat md:p-12 justify-between">
      <div className="flex flex-col justify-center items-center md:items-start w-2/3 md:w-1/3">
        <a exact="true" href="/">
          <img
            className="w-40"
            src="/assets/Images/LogoLight.png"
            alt="WindzGaming"
          />
        </a>
        <p className="text-sm pt-4 italic text-center md:text-left">
          Embrace the Ultimate Gaming Odyssey.
        </p>
      </div>
      <div className="w-1/3">
        <ul className="flex py-2 h-full items-center flex-col justify-between">
          <li className="transition py-2 duration-200 ease-in-out hover:scale-110">
            <NavLink
              to="/"
              className="transition duration-200 ease-in-out hover:text-hoverText"
            >
              Homepage
            </NavLink>
          </li>
          <li className="transition py-2 duration-200 ease-in-out hover:scale-110">
            <NavLink
              to="/about"
              className="transition duration-200 ease-in-out hover:text-hoverText"
            >
              About Us
            </NavLink>
          </li>
          <li className="transition py-2 duration-200 ease-in-out hover:scale-110">
            <NavLink
              to="/products"
              className="transition duration-200 ease-in-out hover:text-hoverText"
            >
              Products
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="w-1/3 flex justify-center">
        <ul className="flex py-2 h-full items-center justify-between lg:gap-9 sm:gap-3">
          {socials.map((icon) => (
            <li className="flex items-center justify-center " key={icon.link}>
              <a
                href={icon.link}
                target="_blank"
                rel="noreferrer"
                className="text-3xl transition duration-200 ease-in-out hover:scale-110 hover:text-hoverText "
              >
                <FontAwesomeIcon icon={icon.icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
