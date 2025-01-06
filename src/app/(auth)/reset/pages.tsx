"use client";
import { Form, Input, notification } from "antd";
import React, { useState } from "react";

export default function ResetPage() {
	const [form] = Form.useForm();

	const handleSignUp = async (values: any) => {
		console.log()
	};

	return (
		<Form form={form}>
			<div className="flex-1 w-full space-y-5 my-10">

				<Form.Item
					name="password"
					rules={[
						{
							required: true,
							message: "Please input your password!",
						},
						{
							min: 6,
							message: "Password must be at least 6 characters long!",
						},
					]}
					hasFeedback
				>
					<div className="flex flex-col h-[100px]">
						<label htmlFor="password" className="text-2xl my-2">
							Password
						</label>
						<Input.Password className="h-[40px]" />
					</div>
				</Form.Item>
				<Form.Item
					name="confirmPassword"
					dependencies={["password"]}
					hasFeedback
					rules={[
						{
							required: true,
							message: "Please confirm your password!",
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue("password") === value) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error("The passwords do not match!")
								);
							},
						}),
					]}
				>
					<div className="flex flex-col h-[100px]">
						<label htmlFor="confirmPassword" className="text-2xl my-2">
							Confirm Password
						</label>
						<Input.Password className="h-[40px]" />
					</div>
				</Form.Item>
			</div>

			<div className="flex flex-col w-full space-y-5 my-10">
				<div className="flex justify-center items-center w-full h-[50px] bg-black rounded-lg text-white">
					<button
						onClick={form.submit}
						className="text-xl w-full h-full"
					>
						Reset Password
					</button>
				</div>
			</div>
		</Form>
	);
}
