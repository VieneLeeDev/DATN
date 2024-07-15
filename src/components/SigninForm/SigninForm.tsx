"use client";
import { supabase } from "@/utils/supabaseClient";
import { Button, Form, Input, notification, Space } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authStore } from "@/stores/auth.store";
import { appStore } from "@/stores";
import styles from "./SigninForm.module.css"
export default function SigninForm() {

	return (
		<div className="flex justify-center items-center w-full h-full px-5">
			<div className="w-full h-full max-w-[500px] max-h-[550px]">
				<span className="block text-[45px] mb-[15px] font-cormorant font-[500]">Login</span>
				<span className="block mb-[30px] text-[#777777] text-[18px]">Sign in to your account!</span>
				<div className="w-full h-auto">
					<Form layout="vertical" className={`${styles.Loginform} w-full h-full`}>
						<Form.Item
							name={"email"}
							labelCol={{ span: 5 }}
							rules={[
								{
									required: true,
									message: "Email can not be empty!"
								}
							]}
						>	<span className={styles["style-label"]}>Email</span>
							<Input className="h-[50px]" type="email"></Input>
						</Form.Item>
						<Form.Item
							name={"password"}
							labelCol={{ span: 5 }}
							rules={[
								{
									required: true,
									message: "Password can not be empty!"
								}
							]}
						>
							<span className={styles["style-label"]}>Password</span>
							<Input className="h-[50px]" type="password"></Input>
						</Form.Item>
						<Space className="flex justify-between">
							<div>
								<input id="rememberme" type="checkbox"></input>
								<label htmlFor="rememberme" className="ml-[8px]">Remember me</label>
							</div>
							<Link href={"#"} className="hover:text-hoverbtn">Forgot password?</Link>
						</Space>
						<Button className={`${styles["submit-btn"]} w-full h-[50px] mt-[20px] text-[13px] font-serif uppercase bg-[#1C2C34] text-white font-[600]`}>Login</Button>
					</Form> 
					<Space className="flex mt-[50px]">
						<span>You not registed?</span>
						<Link className="text-hoverbtn underline-offset-1" href={"#"}>Create an account</Link>
					</Space>
				</div>
			</div>
		</div>
	);
}
