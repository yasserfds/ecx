import { FC } from "react";
import { navItemsData } from "../lib/data";
import Link from "next/link";

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden 800px:flex">
        {navItemsData &&
          navItemsData.map((item, index) => (
            <Link href={`${item.url}`} key={index} passHref>
              <span
                className={`${
                  activeItem === index
                    ? "dark:text-blue-400 text-[crimson]" // Active item styling
                    : "dark:text-white text-black"
                } text-[18px] px-6 font-Poppins font-[400] hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300`}
              >
                {item.name}
              </span>
            </Link>
          ))}
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
        <div className="800px:hidden mt-5">
          <div className="w-full text-center py-6">
            <Link href={"/"} passHref>
              <span
                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300`}
              >
                EduConnectX
              </span>
            </Link>
          </div>
          {navItemsData &&
            navItemsData.map((item, index) => (
              <Link href={item.url} key={index} passHref>
                <span
                  className={`${
                    activeItem === index
                      ? "dark:text-black text-[crimson]" // Active item styling
                      : "dark:text-white text-black"
                  } block py-5 text-[18px] px-6 font-Poppins font-[400] hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default NavItems;
