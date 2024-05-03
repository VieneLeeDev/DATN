'use Client'
import { Button, Divider, Checkbox, Table, Modal, Form, Input, Typography, Select, Space, notification } from "antd";
import type { FormProps } from 'antd';
import { Option } from 'antd/es/mentions'
import React, { useTransition } from 'react'
import { Account, createMember } from "../../actions";

const CreateForm = () => {
	const [isPending, startTransition] = useTransition()
	const onFinish = (data: Account) => {
		startTransition(async () => {
			const result = await createMember(data)
			const { error } = result && JSON.parse(result)
			if (error.message) {
				notification.error({ message: 'Fail!' })
			}
			else {
				notification.success({ message: 'Succesfull!' })
			}

		})
	};

	const role = [{ value: 'admin', label: <span>Admin</span> }, { value: 'user', label: <span>User</span> }]
	const status = [{ value: 'active', label: <span>Active</span> }, { value: 'resigned', label: <span>Resigned</span> }]
	return (
		<Form onFinish={onFinish} layout="vertical">
			<Form.Item name="email" label='Email:'>
				<Input ></Input>
			</Form.Item>
			<Form.Item name={'password'} label='Password:'>
				<Input type='password' ></Input>
			</Form.Item>
			<Form.Item label='Confirm password:'>
				<Input type='password' ></Input>
			</Form.Item>
			<Form.Item name={'name'} label='Username:'>
				<Input ></Input>
			</Form.Item>
			<Form.Item name={'role'} label='Roles:'>
				<Select options={role}>
					<Option>Admin</Option>
					<Option>User</Option>
				</Select>
			</Form.Item>
			<Form.Item name={'status'} label='Status:'>
				<Select options={status}>
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