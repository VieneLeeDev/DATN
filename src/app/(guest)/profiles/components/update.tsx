import { Button, Form, Input, Modal, Spin, notification } from 'antd'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
const UpdateProfile = (props: any) => {

	const [userId, setUserId] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const initform = async () => {
		
	}

	useEffect(() => {
		initform()
	}, [])

	const { data } = props
	const onFinish = async (value: any) => {
		setIsLoading(true)
		props.close()
		setIsLoading(false)
	}
	const [form] = Form.useForm()

	const validateBirthday = (_: any, value: any) => {
		if (!value) {
			return Promise.reject(new Error('Please enter your birthday'));
		}
		const birthDate = dayjs(value, 'DD-MM-YYYY');
		if (!birthDate.isValid()) {
			return Promise.reject(new Error('Invalid date format. Use DD-MM-YYYY'));
		}
		if (dayjs().diff(birthDate, 'year') < 18) {
			return Promise.reject(new Error('You must be at least 18 years old'));
		}
		return Promise.resolve();
	};
	const validatePhoneNumber = (_: any, value: any) => {
		if (!value) {
			return Promise.resolve();
		}
		const regex = /^[0-9]{10}$/;
		if (!regex.test(value)) {
			return Promise.reject(new Error('Phone number must be exactly 10 digits'));
		}
		return Promise.resolve();
	};
	return (
		<Modal onCancel={props.close} destroyOnClose={props.close} open={props.open} title="Update Information" footer={false}>
			<Spin spinning={isLoading}>
				<Form initialValues={{ ...props.data }} form={form} onFinish={onFinish}>
					<Form.Item name={'nick_name'} label="Nick name" labelCol={{ span: 5 }} labelAlign='left'>
						<Input ></Input>
					</Form.Item>
					<Form.Item name={'full_name'} label="Full name" labelCol={{ span: 5 }} labelAlign='left'>
						<Input></Input>
					</Form.Item>
					<Form.Item required rules={[{ validator: validateBirthday }]} name={'birthday'} label="birthday" labelCol={{ span: 5 }} labelAlign='left'>
						<Input></Input>
					</Form.Item>
					<Form.Item name={'citizenIdCard'} label="Citizen No" labelCol={{ span: 5 }} labelAlign='left'>
						<Input></Input>
					</Form.Item>
					<Form.Item name={'gender'} label="gender" labelCol={{ span: 5 }} labelAlign='left'>
						<Input></Input>
					</Form.Item>
					<Form.Item hasFeedback rules={[{ validator: validatePhoneNumber }]} name={'phone_number'} label="Phone" labelCol={{ span: 5 }} labelAlign='left'>
						<Input></Input>
					</Form.Item>
				</Form>
				<Button onClick={form.submit} className='w-full bg-blue-500 text-white'>Update</Button>
			</Spin>
		</Modal>
	)
}

export default UpdateProfile