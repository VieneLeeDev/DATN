import { Button, Form, Modal, Tabs } from 'antd';
import React from 'react';
import NameUser from './NameUser';
import PassWorkEdit from './PassWorkEdit';
import Advance from './Advance';

const EditForm = (props: any) => {
	const { open, onCancel, data } = props;
	const [form] = Form.useForm();
	const handleEditUser = (values: any) => {
		console.log('Form values:', values);
		onCancel(); // Close the modal after form submission
		form.resetFields()
	};

	const items = [
		{
			key: '1',
			label: 'Display Name',
			children: <NameUser form={form} oldName={data.member?.name || ''} />,
		},
		{
			key: '2',
			label: 'Password',
			children: <PassWorkEdit form={form} />,
		},
		{
			key: '3',
			label: 'Advance',
			children: <Advance form={form} role={data.role} status={data.status} />,
		},
	];

	return (
		<Modal title="Edit member" open={open} onCancel={onCancel} footer={null}>
			<span className='text-[#787a7b]'>{`Make changes and Click "update" to save it!`}</span>
			<Form form={form} onFinish={handleEditUser} initialValues={{ role: data.role, status: data.status }} >
				<Tabs defaultActiveKey="1" items={items} />
				<Button style={{ backgroundColor: "#1677ff", color: 'white' }} htmlType='submit' className='w-full my-3'>Update</Button>
			</Form>
		</Modal>
	);
};

export default EditForm;
