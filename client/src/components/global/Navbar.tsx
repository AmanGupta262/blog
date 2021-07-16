import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { RootStore } from "../../utils/TypeScript";
import Search from "./Search";
import { logout } from "../../redux/actions/auth";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  
  const dispatch = useDispatch()
  const { auth } = useSelector((state: RootStore) => state);

  const bfLoginLinks = [
    { label: "Home", path: "/" },
    { label: "Login", path: "/login" },
    { label: "Register", path: "/register" },
  ];
  const afLoginLinks = [
    { label: "Home", path: "/" },
    { label: "Create", path: "/create" },
  ];
  const userNavigation = [
    { label: "Profile", path: `/profile/${auth.user?._id}` },
    { label: "Settings", path: "/settings" },
    { label: "Logout", path: "/logout" },
  ];
  const links = auth.access_token ? afLoginLinks : bfLoginLinks;
  const { pathname } = useLocation();

  const isActive = (pn: string) => {
    if (pn === pathname) return "bg-gray-700 text-white";

    return "text-gray-300";
  };
  return (
    <>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setMenu((prevState) => !prevState)}
              >
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <Link
                to="/"
                className="flex-shrink-0 flex items-center text-2xl text-white tracking-widest"
              >
                BLOG
              </Link>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  {links.map((link, index) => (
                    <Link
                      key={index}
                      to={link.path}
                      className={`${isActive(
                        link.path
                      )} hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Search />
                </div>
              </div>
            </div>
            {auth.user && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">View notifications</span>

                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>

                <div className="ml-3 relative " id="profile-menu">
                  <div>
                    <button
                      type="button"
                      className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open user menu</span>
                      {/* <span className="text-white mx-2 mt-1">
                        {auth.user.name.split(" ")[0]}
                      </span> */}
                      <img
                        className="h-8 w-8 rounded-full"
                        src={auth.user.avatar}
                        alt=""
                      />
                    </button>
                  </div>

                  <div
                    className="origin-top-right absolute right-0 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
                    role="menu"
                    id="profile-menu-item"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex={-1}
                  >
                    {userNavigation.map((link, index) =>
                      link.label === "Logout" ? (
                        <Link
                          key={index}
                          to={link.path}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:bg-gray-50"
                          role="menuitem"
                          tabIndex={-1}
                          id={`user-menu-item-${index}`}
                          onClick={() => dispatch(logout())}
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <Link
                          key={index}
                          to={link.path}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:bg-gray-50"
                          role="menuitem"
                          tabIndex={-1}
                          id={`user-menu-item-${index}`}
                        >
                          {link.label}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {menu && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {links.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className={`${isActive(
                    link.path
                  )} hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
