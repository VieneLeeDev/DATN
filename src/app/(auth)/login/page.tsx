'use client';
import SigninForm from "@/components/SigninForm";
import SignupForm from "@/components/SignupForm";
import { observer } from "mobx-react-lite";
import { inject } from "mobx-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authStore } from "@/stores/auth.store";
import { appStore } from "@/stores";
import { Button, Form, Input, Segmented, TabsProps } from "antd";
import { supabase } from "@/utils/supabaseClient";

const Login = inject("appStore")(
	observer(() => {
		const [typeForm, setTypeForm] = useState("Sign In");
		const [linkEmail, setLinkEmail] = useState("")
		const router = useRouter();

		useEffect(() => {
			if (authStore.isLoggin) {
				router.push('/')
			}
		}, [authStore.isLoggin])
		// const handleResetPass = async () => {
		// 	const { data, error } = await supabase.auth.resetPasswordForEmail(linkEmail, { redirectTo: `${serAction}/reset` })
		// 	if (error?.message) {

		// 	}
		// }
		return (
			<div className="flex justify-center items-center bg-gradient-to-tr from-[#121212] via-[#424040] to-[#B2B5AA] h-screen p-2">
				<div className="flex flex-col items-center justify-between w-full h-auto md:min-h-[50%] lg:min-h-[55%] xl:min-h-xl md:max-w-[500px] xl:max-w-xl bg-white rounded-xl overflow-hidden p-5">
					<div className="flex w-full h-[50px]  rounded-xl overflow-hidden p-1 space-x-2">
						<Segmented options={["Sign In", "Sign Up"]} block className="w-full justify-center items-center" onChange={(value) => setTypeForm(value)} />
					</div>

					{/* form */}
					<div className={`flex-1 w-full`}>
						<div className={`${typeForm !== "Sign In" ? "opacity-0 hidden" : "opacity-100"} w-full duration-300 flex-1`}>
							<SigninForm />
						</div>
						<div className={`${typeForm !== "Sign Up" ? "opacity-0 hidden" : "opacity-100"} w-full flex-1 duration-300`}>
							<SignupForm />
						</div>
						{/* <div className={`${typeForm !== "Reset Password" ? "opacity-0 hidden" : "opacity-100"} w-full flex-1 duration-300`}>
							<span className="my-5 block  text-xl">Email:</span>
							<Input className="h-[50px]" onChange={(e) => setLinkEmail(e.target.value)} />
							<div className="flex flex-col w-full space-y-5 my-10">
								<div className="flex justify-center items-center w-full h-[50px] bg-black rounded-lg text-white">
									<button
										className="text-xl w-full h-full"
										onClick={handleResetPass}
									>
										Send Link Reset Password
									</button>
								</div>
							</div>
						</div> */}
					</div>
				</div>
			</div>
		);
	})
);
export default Login;
