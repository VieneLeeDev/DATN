'use Client'
import { Button, Divider, Checkbox, Table, Modal, Form, Input, Typography, Select, Space, notification, message, Spin } from "antd";
import type { FormProps } from 'antd';
import { Option } from 'antd/es/mentions'
import React, { useState, useTransition } from 'react'
import { Account, createMember } from "../../actions";

const CreateForm = (props: any) => {
	const [isPending, startTransition] = useTransition()
	const { reloadFunction } = props
	const [isLoading, setIsLoading] = useState(false)

	const [form] = Form.useForm();
	const onFinish = async (datauser: Account) => {
		setIsLoading(true)
		startTransition(async () => {
			const result = await createMember(datauser)
			// if (result) {
			// 	const { error } = JSON.parse(result)
			// 	if (error?.message) {
			// 		notification.error({ message: error?.message })
			// 	}
			// 	else {
			// 		notification.success({ message: "succesfull" })
			// 	}
			// }
			await reloadFunction()
			setIsLoading(false)
			form.resetFields()
		})
	};

	const role = [{ value: 'admin', label: <span>Admin</span> }, { value: 'user', label: <span>User</span> }]
	const status = [{ value: 'active', label: <span>Active</span> }, { value: 'resigned', label: <span>Resigned</span> }]
	return (
		<Spin spinning={isLoading}>
			<Form
				form={form}
				initialValues={{
					role: role[1].value,
					status: status[0].value,
				}}
				onFinish={onFinish} layout="vertical" style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}>
				<Form.Item name="email" label='Email:' rules={[{ required: true, message: 'Email is Required!' }]}>
					<Input type="email"></Input>
				</Form.Item>
				<Form.Item
					name="password"
					label="Password"
					rules={[
						{
							required: true,
							message: 'Please input your password!',
						},{
							min:6,
							message:'Password must be at least 6 characters long!'
						}
					]}
					hasFeedback
				>
					<Input.Password />
				</Form.Item>
				<Form.Item
					name="confirm"
					label="Confirm Password"
					dependencies={['password']}
					hasFeedback
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
					<Input.Password />
				</Form.Item>
				<Form.Item name={'name'} label='Username:' rules={[{ required: true, message: 'Username is Required!' }]}>
					<Input ></Input>
				</Form.Item>

				<Form.Item name={'role'} label='Roles:' >
					<Select options={role} >
					</Select>
				</Form.Item>
				<Form.Item name={'status'} label='Status:'>
					<Select options={status} >
					</Select>
				</Form.Item>
				<Space className="w-full flex justify-center" >
					<Button className="text-white bg-blue-600 hover:none" type="primary" htmlType="submit">
						Submit
					</Button>
				</Space>
			</Form>
		</Spin>

	)
}

export default CreateForm