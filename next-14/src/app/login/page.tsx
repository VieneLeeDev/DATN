"use client";
import SigninForm from "@/components/SigninForm";
import SignupForm from "@/components/SignupForm";
import Link from "next/link";
import { useState } from "react";

const Login = () => {
  const [typeForm, setTypeForm] = useState("login");
  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-orange-300 via-slate-300 to-orange-300 h-screen p-2">
      <div className="flex flex-col items-center justify-between w-full h-auto md:min-h-[50%] lg:min-h-[55%] xl:min-h-xl md:max-w-[500px] xl:max-w-xl bg-white rounded-xl overflow-hidden p-5">
        <div className="flex w-full h-[50px] bg-slate-200 rounded-xl overflow-hidden p-1 space-x-2">
          <div
            className={`${
              typeForm === "login" ? "bg-white" : "text-[#787D86]"
            } duration-500 flex-1 h-full rounded-xl p-2 text-center`}
          >
            <button
              onClick={() => setTypeForm("login")}
              className="w-full h-full"
            >
              Sign in
            </button>
          </div>
          <div
            className={`${
              typeForm === "register" ? "bg-white" : "text-[#787D86]"
            } duration-500 flex-1 h-full rounded-xl p-2 text-center`}
          >
            <button
              onClick={() => setTypeForm("register")}
              className="w-full h-full"
            >
              Register
            </button>
          </div>
        </div>
        {/* form */}
        <div className={`flex-1 w-full`}>
          <div className={`${typeForm !== "login" ? "opacity-0 hidden":"opacity-100"} w-full duration-300 flex-1`}>
            <SigninForm />
          </div>
          <div className={`${typeForm !== "register" ? "opacity-0 hidden":"opacity-100"} w-full flex-1 duration-300`}>
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
