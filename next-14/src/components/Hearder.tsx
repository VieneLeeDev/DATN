"use client";
import Link from "next/link";
import React, { useState } from "react";
import MenuHeader from "./MobileHeader";
import { FiAlignJustify } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import { notification } from "antd";
export const Header = () => {
  const [isShowDrawer, setIsShowDrawer] = useState(false);
  const handleClickDrawer = () => {
    setIsShowDrawer(true);
  };

  const router = useRouter();

  //sign out and navigate to login page
  const handleSignOUt = async () => {
    try {
      await supabase.auth.signOut();
      notification.success({ message: "Sign out successfull!" });
      router.push("/login");
    } catch (error) {
      console.log(error);
      notification.error({ message: `${error}` });
    }
  };

  return (
    <>
      <div className="flex flex-col shadow-lg max-w-screen h-[70px] justify-center px-5 bg-[#333333]">
        <div className="hidden md:flex md:w-full h-full items-center justify-between">
          {/**navigation desktop*/}
          <Link
            href={"/"}
            className={`text-xl flex justify-center items-center p-2 w-[150px] hover:opacity-50 bg-orange-600 rounded-xl text-white`}
          >
            Home
          </Link>

          <div className="hidden md:flex space-x-3">
            <Link
              href={"/login"}
              className="p-2 bg-orange-600 rounded-xl w-[150px] text-center text-white font-semibold hover:opacity-50"
            >
              Sign in
            </Link>
            <button
              className="p-2 bg-orange-600 rounded-xl w-[150px] text-center text-white font-semibold hover:opacity-50"
              onClick={handleSignOUt}
            >
              Sign out
            </button>
          </div>
        </div>
        <button
          onClick={handleClickDrawer}
          className="md:hidden w-[30px] h-[30px]"
        >
          <FiAlignJustify className="w-full h-full" />
        </button>
      </div>
      <MenuHeader open={isShowDrawer} close={() => setIsShowDrawer(false)} />
    </>
  );
};
