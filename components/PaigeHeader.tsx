import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Logo from "../public/svg/Paige_logo.svg";

// Register font awesome icons
library.add(faBars);
library.add(faX);

export type NavLinkInfo = {
  name: string;
  location: string;
  isExternal?: boolean;
};

function NavLink(props: NavLinkInfo) {
  return (
    <li key={props.name}>
      {props.isExternal ? (
        <a
          href={props.location}
          className="text-sm sm:text-xs block md:py-2 text-primary rounded md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 cursor-pointer font-light"
        >
          {props.name}
        </a>
      ) : (
        <Link
          href={props.location}
          className="text-sm sm:text-xs block md:py-2 text-primary rounded md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 cursor-pointer font-light"
        >
          {props.name}
        </Link>
      )}
    </li>
  );
}

export default function PaigeHeader(props: { links: NavLinkInfo[] }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <section className="bg-white flex justify-top flex-col max-w-5xl mx-auto">
      <nav className="px-4 md:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <Link href="/" className="flex items-center text-primary pr-2">
            <Logo />
          </Link>
          <button
            type="button"
            className="inline-flex items-center ml-3 text-sm text-primary rounded-lg md:hidden hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-100 px-2 py-1"
            aria-controls="paige-navbar"
            aria-expanded={showMenu}
            onClick={() => {
              setShowMenu((m) => !m);
            }}
          >
            <span className="sr-only">
              {showMenu ? "Close main menu" : "Open main menu"}
            </span>
            {showMenu ? (
              <FontAwesomeIcon icon={faX} size="xl" />
            ) : (
              <FontAwesomeIcon icon={faBars} size="xl" />
            )}
          </button>
          <div
            className={`${showMenu ? "" : "hidden"} w-full md:block md:w-auto`}
            id="paige-navbar"
          >
            <ul className="flex flex-col border border-gray-300 p-4 md:p-0 rounded-lg mb-6 md:mb-0 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 bg-gray-50 md:bg-white">
              {props.links.map((l) => {
                return <NavLink {...l} key={l.name} />;
              })}
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
}
