"use client";
import { Button, Form, Input, notification, Space } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authStore } from "@/stores/auth.store";
import { appStore } from "@/stores";
import styles from "./SigninForm.module.css"
import { supabaseClient } from "@/utils/supabase/client";
export default function SigninForm() {
	const [form] = Form.useForm()
	const handleLogin = async (values: any) => {
		try {
			const { data, error } = await supabaseClient.auth.signInWithPassword({
				email: values?.email,
				password: values?.password,
			  })
			if (error) {
				notification.error({ message: error?.message })
			}
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div className="flex justify-center items-center w-full h-full px-5 max-h-full">
			<div className="w-full h-full max-w-[500px] max-h-[550px]">
				<span className="block text-[45px] mb-[15px] font-cormorant font-[500]">Login</span>
				<span className="block mb-[30px] text-[#777777] text-[18px]">Sign in to your account!</span>
				<div className="w-full h-auto">
					<Form onFinish={handleLogin} form={form} layout="vertical" className={`${styles.Loginform} w-full h-full`}>
						<Form.Item
							labelCol={{ span: 5 }}
							rules={[
								{
									required: true,
									message: "Email can not be empty!"
								}
							]}
						>	<span className={styles["style-label"]}>Email</span>
							<Form.Item name="email">
								<Input className="h-[50px]" type="email"></Input>
							</Form.Item>
						</Form.Item>
						<Form.Item
							labelCol={{ span: 5 }}
							rules={[
								{
									required: true,
									message: "Password can not be empty!"
								}
							]}
						>
							<span className={styles["style-label"]}>Password</span>
							<Form.Item name={"password"}>
								<Input className="h-[50px]" type="password"></Input>
							</Form.Item>
						</Form.Item>
						<Space className="flex justify-between">
							<div>
								<input id="rememberme" type="checkbox"></input>
								<label htmlFor="rememberme" className="ml-[8px]">Remember me</label>
							</div>
							<Link href={"#"} className="hover:text-hoverbtn">Forgot password?</Link>
						</Space>
						<Button onClick={form.submit} className={`${styles["submit-btn"]} w-full h-[50px] mt-[20px] text-[13px] font-serif uppercase bg-[#1C2C34] text-white font-[600]`}>Login</Button>
					</Form>
					<Space className="flex mt-[50px]">
						<span>You not registed?</span>
						<Link className="text-hoverbtn underline-offset-1" href={{
							pathname: 'login',
							query: {
								typeForm: "register"
							}
						}} >Create an account</Link>
						<Link className="text-hoverbtn underline-offset-1 ml-5" href={{
							pathname: './',
						}} >Home page</Link>
					</Space>
				</div>
			</div>
		</div>
	);
}
