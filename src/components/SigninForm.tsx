"use client";
import { supabase } from "@/utils/supabaseClient";
import { notification } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authStore } from "@/stores/auth.store";
import { appStore } from "@/stores";
export default function SigninForm() {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});
	const router = useRouter();

	const handleSignIn = async () => {
		try {
			await authStore.signIn({
				email: user.email,
				password: user.password,
			});
		} catch (error) {
			notification.error({ message: "Đăng nhập thất bại!" });
		}
	};

	const handleSignInWithGoogle = async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "google",
		});
	};

	const handleSignInWithGithub = async () => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "github",
		});
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
						onChange={(e) => setUser({ ...user, email: e.target.value })}
						className="h-[50px] outline-none border-[1px] rounded-xl border-[#787D86] border-solid p-2"
					></input>
				</div>
				<div className="flex flex-col h-[100px]">
					<label htmlFor="password" className="text-2xl my-2">
						Password
					</label>
					<input
						id="password"
						onChange={(e) => setUser({ ...user, password: e.target.value })}
						type="password"
						className="h-[50px] outline-none border-[1px] rounded-xl border-[#787D86] border-solid p-2"
					></input>
				</div>
			</div>
			{/* actions */}
			<div className=" flex flex-col w-full space-y-5 my-10 align-bottom">
				{/* action button */}
				<div className="flex justify-center items-center w-full h-[50px] bg-black rounded-lg text-white">
					<button
						onClick={handleSignIn}
						className="w-full h-full flex justify-center items-center"
					>
						<p className="text-xl">Login</p>
					</button>
				</div>
				{/* social button*/}
				<div className="flex justify-center items-center w-full h-[50px] space-x-5">
					<button
						onClick={handleSignInWithGithub}
						className="w-[50px] h-[50px]"
					>
						<img
							src={`../../../github.svg`}
							className="w-full h-full"
							alt="github"
						/>
					</button>
					<button
						onClick={handleSignInWithGoogle}
						className="w-[50px] h-[50px] bg-slate-200 rounded-md"
					>
						<img
							src={`../../../google.svg`}
							className="w-full h-full"
							alt="google"
						/>
					</button>
				</div>
			</div>
		</>
	);
}
