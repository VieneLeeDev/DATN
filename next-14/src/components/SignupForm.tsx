"use client";
import { supabase } from "@/utils/supabaseClient";
import { Form, Input, notification } from "antd";
import React, { useState } from "react";

export default function SignupForm() {
  const [form] = Form.useForm();

  const handleSignUp = async (values: any) => {
    // Uncomment the following lines to use supabase for actual sign-up
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });
    if (error) {
      notification.error({ message: error.message });
    } else {
      notification.warning({ message: "Check your email to sign up!" });
    }
  };

  return (
    <Form form={form} onFinish={handleSignUp}>
      <div className="flex-1 w-full space-y-5 my-10">
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
          hasFeedback
        >
          <div className="flex flex-col h-[100px]">
            <label htmlFor="email" className="text-2xl my-2">
              Email
            </label>
            <Input className="h-[40px]" />
          </div>
        </Form.Item>

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
            Send Link To Email
          </button>
        </div>
      </div>
    </Form>
  );
}
