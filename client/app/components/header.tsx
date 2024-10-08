"use client";

import { FC, useState, useEffect } from "react";
import Link from "next/link";
import NavItems from "../utils/navItems";
import { ThemeSwitcher } from "../utils/themeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/customModal";
import Login from "./auth/login";
import SignUp from "./auth/signup";
import Verification from "./auth/verification";
import { useSelector } from "react-redux";
import avatar from "../../public/assets/avatar.png";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useSocialAuthMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ open, setOpen, activeItem, route, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const user = useSelector((state: any) => state.auth.user);
  const { data: sessionData } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();

  // Handle user login via social authentication
  useEffect(() => {
    if (!user && sessionData) {
      socialAuth({
        email: sessionData.user?.email,
        name: sessionData.user?.name,
        avatar: sessionData.user?.image,
      });
    }
  }, [sessionData, user, socialAuth]); // Removed isSuccess and error to prevent unnecessary re-renders

  // Display toast notifications based on login state
  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successfully!");
    }
    if (error) {
      toast.error("An error occurred");
    }
  }, [isSuccess, error]); // Keep this separate to ensure toasts are handled independently

  // Handle scroll event listeners for header styling
  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 85);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
            : "w-full border-b dark:border-[#ffffff1c] h-[80px] dark:shadow"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                href="/"
                className="text-[25px] font-Poppins font-[500] text-black dark:text-white"
              >
                EduConnectX
              </Link>
            </div>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              {/* Mobile Menu Icon */}
              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  className="cursor-pointer dark:text-white text-black"
                  size={25}
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              {user ? (
                <Link href="/profile">
                  <Image
                    src={user.avatar || avatar}
                    alt="User Avatar"
                    className="w-[30px] h-[30px] rounded-full cursor-pointer"
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  className="hidden 800px:block cursor-pointer dark:text-white text-black"
                  size={25}
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          </div>
        </div>

        {/* Mobile Sidebar with Animation */}
        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[999999] bg-[#00000024] dark:bg-[unset] transition-opacity duration-500 ease-in-out opacity-100"
            onClick={handleClose}
            id="screen"
          >
            <div
              className={`w-[70%] fixed z-[999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0 transform transition-transform duration-500 ease-in-out ${
                openSidebar ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <NavItems activeItem={activeItem} isMobile={true} />
              <HiOutlineUserCircle
                className="cursor-pointer ml-5 my-2 text-black dark:text-white"
                size={25}
                onClick={() => setOpen(true)}
              />
              <br />
              <br />
              <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                © 2024 EduConnectX. All rights reserved.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Modal Handling */}
      {open && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={
            route === "Login"
              ? Login
              : route === "Sign-Up"
              ? SignUp
              : Verification
          }
        />
      )}
    </div>
  );
};

export default Header;
