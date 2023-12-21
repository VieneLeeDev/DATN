"use client";
import { AuthStore } from "@/stores/auth.store";
const authStore = AuthStore.create({
  auth: {},
  user_id: "",
});
const login = () => {
  return (
    <div className="flex justify-center items-center bg-gradient-to-r from-orange-300 via-slate-300 to-orange-300 h-screen">
      <div className="flex flex-col items-center w-full sm:max-w-sm md:max-w-[500px] xl:max-w-xl h-[50%] md:h-[70%] bg-white rounded-xl overflow-hidden p-2">
        {/* logo */}
        <h2>
          <span className="text-center">
            <strong>Logo</strong>
          </span>
        </h2>
        <div className="flex flex-col justify-center items-center space-y-10 w-[80%] h-full pb-2">
          <button
            onClick={() => authStore.signIn()}
            className="w-full h-[50px] bg-slate-200"
          >
            Sign In
          </button>
          <button
            onClick={() => authStore.signUp()}
            className="w-full h-[50px] bg-slate-200"
          >
            Sign Up
          </button>
          <button
            onClick={() => authStore.signOut()}
            className="w-full h-[50px] bg-slate-200"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};
export default login;