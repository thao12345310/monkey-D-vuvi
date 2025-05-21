"use client";

import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/logo.jpg";
import UserMenu from "./UserMenu";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

<<<<<<< HEAD
  const menuItems = [
    { text: "Tìm du thuyền", path: "/tim-du-thuyen" },
    // { text: "Tìm vé máy bay", path: "/tim-ve-may-bay" },
    { text: "Tìm khách sạn", path: "/tim-khach-san" },
    { text: "Doanh nghiệp", path: "/doanh-nghiep" },
    // { text: "Blog", path: "/blog" },
  ];

  return (
    <header className=" bg-[#FFECEC] sticky top-0 z-50 shadow-md">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 "
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <img className="h-14 w-auto" src={logo}></img>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Mở menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-[#FFB8E5] aria-[current=page]:text-[#FFB8E5] transition-colors duration-200"
            >
              {item.text}
            </NavLink>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <UserMenu />
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span>🐒ĐI Luffy</span>
              <img
                className="h-8 w-auto"
                src="/images/logo.png"
                alt="Mixivivu"
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Đóng menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.text}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <UserMenu />
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
=======
    const menuItems = [
        { text: "Tìm du thuyền", path: "/tim-du-thuyen" },
        { text: "Tìm khách sạn", path: "/tim-khach-san" },
        { text: "Doanh nghiệp", path: "/doanh-nghiep" },
    ];

    return (
        <header className="bg-white sticky top-0 z-50 shadow-sm">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-3 group">
                        <img className="h-14 w-auto transition-transform duration-300 group-hover:scale-105" src={logo} alt="Monkey D Vuvi" />
                        <span className="text-2xl font-bold text-pink-500 hidden sm:block">Monkey D Vuvi</span>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-lg p-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Mở menu</span>
                        <Bars3Icon className="h-7 w-7" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-11">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `
                                relative px-3 py-2 text-base font-semibold transition-all duration-200
                                ${isActive ? "text-pink-600" : "text-black-600 hover:text-pink-500"}
                                after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full 
                                after:origin-center after:scale-x-0 after:bg-pink-500 
                                after:transition-transform after:duration-300
                                hover:after:scale-x-100
                                ${isActive ? "after:scale-x-100" : ""}
                            `}
                        >
                            {item.text}
                        </NavLink>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <UserMenu />
                </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10 bg-gray-900/20 backdrop-blur-sm" />
                <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="-m-1.5 p-1.5 flex items-center gap-3">
                            <img className="h-12 w-auto" src={logo} alt="Monkey D Vuvi" />
                            <span className="text-2xl font-bold text-gray-800">Monkey D Vuvi</span>
                        </Link>
                        <button
                            type="button"
                            className="rounded-lg p-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Đóng menu</span>
                            <XMarkIcon className="h-7 w-7" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className="block rounded-lg px-3 py-3 text-lg font-medium text-gray-900 hover:bg-gray-50 hover:text-pink-600 transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.text}
                                    </Link>
                                ))}
                            </div>
                            <div className="py-6">
                                <UserMenu />
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    );
>>>>>>> 6224c46bae8ee5448cbd9af04ef79a3bdff85efb
};

export default NavBar;
