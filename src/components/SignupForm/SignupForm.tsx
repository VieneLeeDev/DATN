"use client";
import { Button, Form, Input, notification, Space, Spin } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./SignupForm.module.css"
import { useForm } from "antd/es/form/Form";
import { supabaseClient } from "@/utils/supabase/client";
export default function SignupForm() {
	const [loading, setLoading] = useState<boolean>(false)
	const [form] = useForm()
	const handleSubmit = async (values: any) => {
			try {
				setLoading(true)
				await supabaseClient.auth.signUp({
					email: values?.email,
					password: values?.password,
					options:{
						data:{
							user_name: values?.user_name,
							gender: values?.gender
						}
					}
				})
			} catch (error) {
				console.log(error)
			}
			finally {
				setLoading(false)
		}
	}
	return (
		<Spin spinning={loading}>
			<div className="flex justify-center items-center w-full max-h-full h-full p-5">
				<div className="w-full h-full max-w-[500px] max-h-[550px]">
					<span className="block text-[45px] mb-[15px] font-cormorant font-[500]">Register</span>
					<span className="block mb-[30px] text-[#777777] text-[18px]">Register for a hotel account to enjoy exclusive privileges</span>
					<div className="w-full h-fit">
						<Form form={form} onFinish={handleSubmit} layout="vertical" className={`${styles.Loginform} w-full`}>
							<Form.Item
								labelCol={{ span: 5 }}
							>	<span className={styles["style-label"]}>User Name</span>
								<Form.Item name={"user_name"} rules={[
									{
										required: true,
										message: "User name can not be empty!"
									}
								]}>
									<Input className="h-[50px]" />
								</Form.Item>
							</Form.Item>
							<Form.Item
								labelCol={{ span: 5 }}
							>	<span className={styles["style-label"]}>Gender</span>
								<Form.Item name={"gender"} >
									<Input className="h-[50px]" />
								</Form.Item>
							</Form.Item>
							<Form.Item labelCol={{ span: 5 }}>
								<span className={styles["style-label"]}>Email</span>
								<Form.Item name={"email"} rules={[
									{
										required: true,
										message: "Email can not be empty!"
									}
								]}>
									<Input className="h-[50px]" type="email" />
								</Form.Item>
							</Form.Item>
							<Form.Item labelCol={{ span: 5 }}>
								<span className={styles["style-label"]}>Password</span>
								<Form.Item name={"password"} rules={[
									{
										required: true,
										message: "Password can not be empty!"
									}
								]}>
									<Input.Password className="h-[50px]" />
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
								<span className={styles["style-label"]}>Repeat Password</span>
								<Form.Item
									name={"repeat_password"}
									rules={[
										{
											required: true,
											message: 'Please confirm your password!',
										},
										({ getFieldValue }) => ({
											validator(_, value) {
												if (!value || getFieldValue('password') === value) {
													return Promise.resolve();
												}
												return Promise.reject(new Error('The new password that you entered do not match!'));
											},
										}),
									]}
								>
									<Input.Password className="h-[50px]" />
								</Form.Item>
							</Form.Item>
							<Button onClick={form.submit} className={`${styles["submit-btn"]} w-full h-[50px] mt-[10px] text-[13px] font-serif uppercase bg-[#1C2C34] text-white font-[600]`}>Register Account</Button>
						</Form>
						<Space className="flex mt-[20px]">
							<span>Do you already have an account?</span>
							<Link className="text-hoverbtn underline-offset-1" href={{ pathname: "/login", query: { typeForm: "login" } }} >login</Link>
							<Link className="text-hoverbtn underline-offset-1 ml-5" href={{ pathname: './', }} >Home page</Link>
						</Space>
					</div>
				</div>
			</div>
		</Spin >
	);
}
