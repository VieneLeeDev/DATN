'use client';
import SigninForm from "@/components/SigninForm/SigninForm";
import SignupForm from "@/components/SignupForm";
import { observer } from "mobx-react-lite";
import { inject } from "mobx-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authStore } from "@/stores/auth.store";
import { appStore } from "@/stores";
import { Button, Form, Input, Segmented, TabsProps } from "antd";
import { supabase } from "@/utils/supabaseClient";
import bg_img from "@/assets/login-bg1.jpg"
import Image from "next/image";

const Login = inject("appStore")(
	observer(() => {
		const router = useRouter();

		useEffect(() => {
			if (authStore.isLoggin) {
				router.push('/')
			}
		}, [authStore.isLoggin])

		return (
			<div className="flex h-screen">
				<div className="flex justify-center align-center w-full lg:w-1/2 h-full">
					<SigninForm/>
				</div>
				<div className="w-full lg:w-1/2">
					<Image src={bg_img} alt="Background login" className="object-cover object-center h-full"  />
				</div>
			</div>
		);
	})
);
export default Login;
