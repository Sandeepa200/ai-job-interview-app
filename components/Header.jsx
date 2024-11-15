"use client";
import {
  DASHBOARD_ROUTE,
  DOCS_ROUTE,
  QUESTION_ROUTE,
  UPGRADE_ROUTE,
} from "@/constants/routes";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import ThemeToggler from "./ThemeToggler";
import Link from "next/link";

const Header = () => {
  const path = usePathname();

  return (
    <header className="flex flex-row p-4 items-center justify-between bg-secondary shadow-md md:px-8">
      <div className="flex items-center">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={200} height={80} />
        </Link>
      </div>

      <nav className="w-full md:w-auto mt-4 md:mt-0">
        <ul className="hidden md:flex md:flex-row gap-4 md:gap-8 items-center justify-center">
          <li
            className={`text-gray-700 hover:text-primary hover:font-bold transition-all  cursor-pointer
                    ${
                      path === DASHBOARD_ROUTE ? "text-primary font-bold" : ""
                    }`}
          >
            <Link href={DASHBOARD_ROUTE}>Dashboard</Link>
          </li>

          <li
            className={`text-gray-700 hover:text-primary  hover:font-semibold transition-all cursor-pointer
                    ${path === QUESTION_ROUTE ? "text-primary font-bold" : ""}`}
          >
            Question
          </li>
          <li
            className={`text-gray-700 hover:text-primary  hover:font-semibold transition-all cursor-pointer
                    ${path === UPGRADE_ROUTE ? "text-primary font-bold" : ""}`}
          >
            Upgrade
          </li>
          <li
            className={`text-gray-700 hover:text-primary  hover:font-semibold transition-all cursor-pointer
                    ${path === DOCS_ROUTE ? "text-primary font-bold" : ""}`}
          >
            How it works
          </li>
        </ul>
      </nav>

      <div className="flex flex-row gap-4">
        <ThemeToggler />
        <UserButton className="flex items-center" />
      </div>
    </header>
  );
};

export default Header;
