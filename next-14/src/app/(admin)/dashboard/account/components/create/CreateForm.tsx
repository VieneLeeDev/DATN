'use Client'
import { Button, Divider, Checkbox, Table, Modal, Form, Input, Typography, Select, Space, notification, message } from "antd";
import type { FormProps } from 'antd';
import { Option } from 'antd/es/mentions'
import React, { useTransition } from 'react'
import { Account, createMember } from "../../actions";

const CreateForm = () => {
	const [isPending, startTransition] = useTransition()
	const onFinish = async (datauser: Account) => {
		startTransition(async () => {
			const result = await createMember(datauser)
			if (result) {
				const { error } = JSON.parse(result)
				if (error?.message) {
					notification.error({ message: "fail" })
				}
				else {
					notification.success({ message: "succesfull" })
				}
			}
		})
	};

	const role = [{ value: 'admin', label: <span>Admin</span> }, { value: 'user', label: <span>User</span> }]
	const status = [{ value: 'active', label: <span>Active</span> }, { value: 'resigned', label: <span>Resigned</span> }]
	return (
		<Form onFinish={onFinish} layout="vertical" style={{ width: "100%", maxWidth: "500px",margin:"0 auto" }}>
			<Form.Item name="email" label='Email:' rules={[{ required: true, message: 'Enail is Required!' }]}>
				<Input type="email"></Input>
			</Form.Item>
			<Form.Item
				name="password"
				label="Password"
				rules={[
					{
						required: true,
						message: 'Please input your password!',
					},
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
				<Select options={role} defaultValue={role[1]}>
				</Select>
			</Form.Item>
			<Form.Item name={'status'} label='Status:'>
				<Select options={status} defaultValue={status[0]}>
				</Select>
			</Form.Item>
			<Space className="w-full flex justify-center" >
				<Button className="text-white bg-blue-600 hover:none" type="primary" htmlType="submit">
					Submit
				</Button>
			</Space>
		</Form>
	)
}

export default CreateForm