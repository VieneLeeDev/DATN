import { Button, Checkbox, Form, Input, Modal, Select, Space, Spin, Tabs, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { updateMemberById } from '../../actions';


const EditForm = (props: any) => {
	const { open, onCancel, data } = props;
	const [form] = Form.useForm();
	const [newRole, setNewRole] = useState()
	const [newStatus, setNewStatus] = useState()
	const [passWordDisable, setPassWordDisable] = useState(false)
	const [dataForm, setDataForm] = useState(data)
	const [isLoading, setIsLoading] = useState(false)
	const handleSubmitEditUser = async (values: any) => {
		setIsLoading(true)
		const resultUpdate = await updateMemberById(data.member.id, values)
		// if (resultUpdate.error?.mesage) {
		// 	notification.error({ message: resultUpdate.error?.mesage })
		// }
		// else {
		// 	notification.success({ message: resultUpdate.data?.mesage })
		// }
		await onCancel(); 
		form.resetFields()
		setIsLoading(false)
	};

	const roleList = [{ value: 'admin', label: <span>Admin</span> }, { value: 'user', label: <span>User</span> }]
	const statusList = [{ value: 'active', label: <span>Active</span> }, { value: 'resigned', label: <span>Resigned</span> }]

	const initValueForm = {
		role: data.role,
		status: data.status,
		name: data.member?.name,
		email: data.member?.email
	}
	const closeButton = () => {
		form.resetFields()
		onCancel()
	}
	return (
		<Modal title="Edit member" open={open} onCancel={closeButton} footer={null}>
			<span className='text-[#787a7b]'>{`Make changes and Click "update" to save it!`}</span>
			<Spin spinning={isLoading}>
				<Form
					form={form}
					initialValues={initValueForm}
					onFinish={handleSubmitEditUser} layout="vertical" style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}>
					<Form.Item name={'email'} label='Email:' >
						<Input ></Input>
					</Form.Item>
					<Form.Item name={'name'} label='Username:' >
						<Input ></Input>
					</Form.Item>
					<Form.Item name={'role'} label='Roles:' >
						<Select options={roleList} >
						</Select>
					</Form.Item>
					<Form.Item name={'status'} label='Status:'>
						<Select options={statusList} >
						</Select>
					</Form.Item>
					<Checkbox
						checked={passWordDisable}
						onChange={(e) => setPassWordDisable(e.target.checked)}
					>
						Reset Password
					</Checkbox>
					<Form.Item
						name="password_reset"
						label="Password"
						required={passWordDisable}
						rules={[
							{
								required: passWordDisable,
								message: 'Please input your password!',
							}, {
								min: 6,
								message: 'Password must be at least 6 characters long!'
							}
						]}
					>
						<Input.Password disabled={!passWordDisable} />
					</Form.Item>
					<Form.Item
						name="confirm"
						label="Confirm Password"
						dependencies={['password_reset']}
						required={passWordDisable}
						rules={[
							{
								required: passWordDisable,
								message: 'Please confirm your password!',
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue('password_reset') === value) {
										return Promise.resolve();
									}
									return Promise.reject(new Error('The new password that you entered do not match!'));
								},
							}),
						]}
					>
						<Input.Password disabled={!passWordDisable} />
					</Form.Item>
					<Space className="w-full flex justify-center" >
						<Button className="text-white bg-blue-600 hover:none" type="primary" htmlType="submit">
							Update
						</Button>
					</Space>
				</Form>
			</Spin>
		</Modal>
	);
};

export default EditForm;
