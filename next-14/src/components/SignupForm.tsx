"use client";
import { supabase } from "@/utils/supabaseClient";
import { notification } from "antd";
import Link from "next/link";
import React, { useState } from "react";

export default function SignupForm() {
  const [userInfomation, setUserInfomation] = useState({
    email: "",
    password: "",
  });
  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: userInfomation.email,
      password: userInfomation.password,
    });

    notification.warning({ message: "Check your email to sign up!" });
  };
  return (
    <>
      {/* form */}
      <div className="flex-1 w-full space-y-5 my-10">
        <div className="flex flex-col h-[100px]">
          <label htmlFor="email" className="text-2xl my-2">
            Email
          </label>
          <input
            id="email"
            onChange={(e) =>
              setUserInfomation({ ...userInfomation, email: e.target.value })
            }
            className="h-[50px] outline-none border-[1px] rounded-xl border-[#787D86] border-solid p-2"
          ></input>
        </div>
        <div className="flex flex-col h-[100px]">
          <label htmlFor="password" className="text-2xl my-2">
            Password
          </label>
          <input
            id="password"
            onChange={(e) =>
              setUserInfomation({ ...userInfomation, password: e.target.value })
            }
            type="password"
            className="h-[50px] outline-none border-[1px] rounded-xl border-[#787D86] border-solid p-2"
          ></input>
        </div>
        <div className="flex flex-col h-[100px]">
          <label htmlFor="confirmPassword" className="text-2xl my-2">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="h-[50px] outline-none border-[1px] rounded-xl border-[#787D86] border-solid p-2"
          ></input>
        </div>
      </div>
      {/* actions */}
      <div className=" flex flex-col w-full space-y-5 my-10 align-bottom">
        {/* action button */}
        <div className="flex justify-center items-center w-full h-[50px] bg-black rounded-lg text-white">
          <button onClick={handleSignUp} className="text-xl w-full h-full">
            Send Link To Email
          </button>
        </div>
      </div>
    </>
  );
}
