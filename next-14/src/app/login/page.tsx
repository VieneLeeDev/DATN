"use client";
import { authStore } from "@/stores/auth.store";
import facebook from "../../../facebook.svg"
const login = () => {
  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-orange-300 via-slate-300 to-orange-300 h-screen p-2">
      <div className="flex flex-col items-center justify-between w-full h-auto md:max-w-[500px] xl:max-w-xl bg-white rounded-xl overflow-hidden p-5">
        <div className="flex w-full h-[50px] bg-slate-200 rounded-xl overflow-hidden p-1 space-x-2">
          <div className="flex-1 h-full bg-white rounded-xl p-2 text-center">
            <h2>Sign in</h2>
          </div>
          <div className="flex-1 h-full rounded-xl p-2 text-center text-[#787D86]">
            <h2>Register</h2>
          </div>
        </div>
        {/* form */}
        <div className="flex-1 w-full space-y-5 my-10">
          <div className="flex flex-col h-[100px]">
            <label htmlFor="email" className="text-2xl my-2">
              Email
            </label>
            <input
              id="email"
              className="h-[50px] outline-none border-[1px] rounded-xl border-[#787D86] border-solid p-2"
            ></input>
          </div>
          <div className="flex flex-col h-[100px]">
            <label htmlFor="password" className="text-2xl my-2">
              Password
            </label>
            <input
              id="password"
              className="h-[50px] outline-none border-[1px] rounded-xl border-[#787D86] border-solid p-2"
            ></input>
          </div>
        </div>
        {/* actions */}
        <div className=" flex flex-col w-full space-y-5 my-10 align-bottom">
          {/* action button */}
          <div className="flex justify-center items-center w-full h-[50px] bg-black rounded-lg text-white">
            <p className="text-xl">Login</p>
          </div>
          <div className="flex justify-center items-center w-full h-[50px] bg-black rounded-lg text-white">
            <p className="text-xl">Forgot password</p>
          </div>
          {/* social button*/}
          <div className="flex justify-center items-center w-full h-[50px] space-x-5">
            <div className="w-[50px] h-[50px]">
              <img
                src={`../../../github.svg`}
                className="w-full h-full"
                alt="github"
              />
            </div>
            <div className="w-[50px] h-[50px]">
              <img
                src={`../../../facebook.svg`}
                className="w-full h-full"
                alt="facebook"
              />
            </div>
            <div className="w-[50px] h-[50px]">
              <img
                src={`../../../google.svg`}
                className="w-full h-full"
                alt="google"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default login;
