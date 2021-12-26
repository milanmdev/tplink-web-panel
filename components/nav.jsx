import * as React from "react";
import Link from "next/link";
import Image from "next/image";

export function NavModule() {
  return (
    <>
      <nav className="flex items-center w-full h-24 select-none mx-auto p-5">
        <div className="relative flex flex-wrap items-center justify-between w-full h-24 mx-auto font-medium md:justify-center">
          <Link href="/" passHref>
            <a className="w-1/4 py-4 pl-6 pr-4 md:pl-4 md:py-0">
              <span className="p-1 text-xl font-black leading-none text-white select-none">
                <Image
                  src="/favicon.png"
                  alt="TP-Link Logo"
                  width={40}
                  height={40}
                  layout="intrinsic"
                />
              </span>
            </a>
          </Link>
          <div className="fixed top-0 left-0 items-center hidden w-full h-full p-3 text-xl bg-gray-900 bg-opacity-50 md:text-sm lg:text-base md:w-3/4 md:bg-transparent md:p-0 md:relative md:flex">
            <div className="flex-col w-full h-auto overflow-hidden rounded-lg select-none md:bg-transparent md:rounded-none md:relative md:flex md:flex-row md:overflow-auto">
              <div className="flex flex-col items-center justify-center w-full h-full mt-12 text-center text-indigo-700 md:text-indigo-200 md:w-2/3 md:mt-0 md:flex-row md:items-center"></div>
              <div className="flex flex-col items-center justify-end w-full h-full pt-4 md:w-1/3 md:flex-row md:py-0">
                <div className="flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"></div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
