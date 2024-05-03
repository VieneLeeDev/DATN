'use client';
import SigninForm from "@/components/SigninForm";
import SignupForm from "@/components/SignupForm";
import { observer } from "mobx-react-lite";
import { inject } from "mobx-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authStore } from "@/stores/auth.store";
import { appStore } from "@/stores";

const Login = inject("appStore")(
	observer(() => {
		const [typeForm, setTypeForm] = useState("login");

		const router = useRouter();

		useEffect(() => {
			if (authStore.isLoggin) {
				router.push('/')
			}
		}, [authStore.isLoggin])
		 
		return (
			<div className="flex justify-center items-center bg-gradient-to-tr from-[#121212] via-[#424040] to-[#B2B5AA] h-screen p-2">
				<div className="flex flex-col items-center justify-between w-full h-auto md:min-h-[50%] lg:min-h-[55%] xl:min-h-xl md:max-w-[500px] xl:max-w-xl bg-white rounded-xl overflow-hidden p-5">
					<div className="flex w-full h-[50px] bg-slate-200 rounded-xl overflow-hidden p-1 space-x-2">
						<div className={`${typeForm === "login" ? "bg-white" : "text-[#787D86]"} duration-500 flex-1 h-full rounded-xl p-2 text-center`}>
							<button
								onClick={() => setTypeForm("login")}
								className="w-full h-full"
							>
								Sign in
							</button>
						</div>
						<div
							className={`${typeForm === "register" ? "bg-white" : "text-[#787D86]"
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
						<div className={`${typeForm !== "login" ? "opacity-0 hidden" : "opacity-100"} w-full duration-300 flex-1`}>
							<SigninForm />
						</div>
						<div className={`${typeForm !== "register" ? "opacity-0 hidden" : "opacity-100"} w-full flex-1 duration-300`}>
							<SignupForm />
						</div>
					</div>
				</div>
			</div>
		);
	})
);
export default Login;
