import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import React from "react";
import { BsDatabaseFill } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [open, setOpen] = useState(true);

  const menuItems = [
    {
      href: "/",
      icon: <MdDashboard />,
      title: "Dashboard",
    },
    {
      href: "/database",
      icon: <BsDatabaseFill />,
      title: "Database",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className=" bg-menu-admin text-black sticky top-0 h-20 flex p-3 font-semibold">
        <ul>
          <li>
            <Image
              src="/disco_logo.svg"
              alt="discompose-logo"
              width={100}
              height={100}
            />
          </li>
        </ul>
      </header>
      <div className="flex flex-col md:flex-row flex-1">
        <aside
          className={` bg-primary-admin w-full ${
            open ? "md:w-60" : "md:w-12"
          } duration-300`}
        >
          <nav>
            <div className=" text-menu-admin flex justify-end m-2 pb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8  cursor-pointer"
                onClick={() => setOpen(!open)}
                onKeyUp={() => setOpen(!open)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
              </svg>
            </div>
            <ul>
              {menuItems.map((menu, index) => (
                <li className="mb-2" key={menu.title}>
                  <Link
                    href={menu.href}
                    className={`group flex p-1 cursor-pointer hover:bg-menu-admin ${
                      router.asPath === menu.href &&
                      " bg-menu-admin text-primary-admin"
                    }`}
                  >
                    <span
                      className={`p-1 text-3xl text-menu-admin group-hover:text-primary-admin flex justify-center items-center ${
                        router.asPath === menu.href && "text-primary-admin"
                      }`}
                    >
                      {menu.icon ? menu.icon : <MdDashboard />}
                    </span>
                    <span
                      className={`pl-2 origin-left text-menu-admin group-hover:text-primary-admin flex justify-center items-center duration-300 ${
                        router.asPath === menu.href && "text-primary-admin"
                      } ${!open && "scale-0"}`}
                    >
                      {menu.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
