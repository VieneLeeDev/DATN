"use client";
import { Button, Form, Input, notification, Space } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./SignupForm.module.css"
export default function SignupForm() {
	return (
		<div className="flex justify-center items-center w-full h-full px-5">
			<div className="w-full h-full max-w-[500px] max-h-[550px]">
				<span className="block text-[45px] mb-[15px] font-cormorant font-[500]">Register</span>
				<span className="block mb-[30px] text-[#777777] text-[18px]">Register for a hotel account to enjoy exclusive privileges</span>
				<div className="w-full h-auto">
					<Form layout="vertical" className={`${styles.Loginform} w-full h-full`}>
					<Form.Item
							name={"user_name"}
							labelCol={{ span: 5 }}
							rules={[
								{
									required: true,
									message: "User name can not be empty!"
								}
							]}
						>	<span className={styles["style-label"]}>User Name</span>
							<Input className="h-[50px]"></Input>
						</Form.Item>
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
						<Form.Item
							name={"repeat_password"}
							labelCol={{ span: 5 }}
							rules={[
								{
									required: true,
									message: "Password can not be empty!"
								}
							]}
						>
							<span className={styles["style-label"]}>Repeat Password</span>
							<Input className="h-[50px]" type="password"></Input>
						</Form.Item>
						<Button className={`${styles["submit-btn"]} w-full h-[50px] mt-[20px] text-[13px] font-serif uppercase bg-[#1C2C34] text-white font-[600]`}>Register Account</Button>
					</Form> 
					<Space className="flex mt-[50px]">
						<span>Do you already have an account?</span>
						<Link className="text-hoverbtn underline-offset-1" href={{pathname:"/login", query:{typeForm:"login"}}} >login</Link>
						<Link className="text-hoverbtn underline-offset-1 ml-5" href={{pathname:'./',}} >Home page</Link>
					</Space>
				</div>
			</div>
		</div>
	);
}
