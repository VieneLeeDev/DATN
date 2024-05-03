'use client'
import React, { useState } from 'react'
import { Button, Divider, Checkbox, Table, Modal, Form, Input, Typography, Select } from "antd";
import { SearchProps } from "antd/es/input";
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { CheckboxProps, GetProp } from 'antd';
import { Option } from 'antd/es/mentions';
import CreateForm from './components/create/CreateForm';
type CheckboxValueType = GetProp<typeof Checkbox.Group, 'value'>[number];
const AccountPage = () => {
	const [isShowModalAddNew, setIsShowModalAddNew] = useState(false)
	const [isShowModalEdit, setIsShowModalEdit] = useState(false)
	const [isShowModalChangeRoleAndStatus, setIsShowModalChangeRoleAndStatus] = useState(false)
	const [isShowModalChangePassword, setIsShowModalChangePassword] = useState(false)
	const defaultCheckedList = ['Admin', 'User'];
	const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList);
	const dataSource: any[] = [
		{
			key: '1',
			id: 'user1',
			email: 'user@gmail.com',
			passWord: '123123',
			status: 'Active',
			role: 'user',
		},
		{
			key: '2',
			id: 'user2',
			email: 'admin@gmail.com',
			passWord: '123123',
			status: 'Active',
			role: 'admin',
		},
	];

	const columns = [
		{
			title: 'User',
			dataIndex: 'email',
			key: 'email',
			className: "w-[24%]"
		},
		{
			title: 'PassWord',
			dataIndex: 'passWord',
			key: 'passWord',
		},
		{
			title: 'role',
			dataIndex: 'role',
			key: 'role',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
		},
		{
			title: 'Action',
			render: (_: any, record: any) => {
				return <div className="flex gap-3 w-[40px]">
					<Button onClick={() => setIsShowModalEdit(true)}><EditOutlined /></Button>
					<Button><DeleteOutlined /></Button>
				</div>
			}
		},
	];

	const rolesOptions = ['Admin', 'User'];

	const checkAll = rolesOptions.length === checkedList.length;

	const indeterminate = checkedList.length > 0 && checkedList.length < rolesOptions.length;

	const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
		setCheckedList(e.target.checked ? rolesOptions : []);
	};
	const handleCheckBox = (list: CheckboxValueType[]) => {
		setCheckedList(list);
	};
	const CheckboxGroup = Checkbox.Group;
	return (
		<section className="w-full h-full">
			<div className="flex h-12 items-center px-2 justify-between">
				<h3 className="text-3xl font-bold">Account management</h3>
			</div>
			<Divider></Divider>
			<div className='flex gap-2 rounded-xl overflow-hidden items-center justify-between h-[70px] '>
				<div className='flex items-center justify-center w-1/3 h-full bg-[#727CB6] text-white rounded-xl p-2 text-center'>
					<span className='text-3xl font-bold mr-5'>Total:</span>
					<span className='text-3xl font-bold'>36</span>
				</div>
				<div className='flex items-center justify-center w-1/3 h-full bg-[#348FE2] text-white rounded-xl p-2 text-center'>
					<span className='text-3xl font-bold  mr-5'>Admin:</span>
					<span className='text-3xl font-bold'>5</span>
				</div>
				<div className='flex items-center justify-center w-1/3 h-full bg-[#01ACAC] text-white rounded-xl p-2 text-center'>
					<span className='text-3xl font-bold  mr-5'>User:</span>
					<span className='text-3xl font-bold'>31</span>
				</div>
			</div>
			<div className='h-[50px] my-[20px] px-2 flex gap-5 items-center justify-between'>
				<div className='flex gap-5 items-center'>
					<Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
						Check all
					</Checkbox>
					<CheckboxGroup options={rolesOptions} value={checkedList} onChange={handleCheckBox} />
				</div>
				<Button onClick={() => setIsShowModalAddNew(true)}>Create User</Button>
			</div>
			<Table className='border-[1px] my-5' dataSource={dataSource} columns={columns} />

			<Modal
				title={"Create New User"}
				width={760}
				open={isShowModalAddNew}
				maskClosable={false}
				onCancel={() => setIsShowModalAddNew(false)}
				// footer={<div>
				// 	<Button style={{ background: '#348FE2', color: 'white' }}>Submit</Button>
				// </div>}
				footer={false}
			>
				<CreateForm></CreateForm>
			</Modal>

			{/* <Modal
				title={"Change Information Of User"}
				width={760}
				open={isShowModalEdit}
				maskClosable={false}
				onCancel={() => setIsShowModalEdit(false)}
				footer={<div>
					<Button style={{ background: '#348FE2', color: 'white' }}>Submit</Button>
				</div>}
			>
				<div className='flex h-[50px] items-center justify-between gap-2'>
					<Button onClick={() => setIsShowModalChangePassword(true)} className='w-1/2'>Password</Button>
					<Button onClick={() => setIsShowModalChangeRoleAndStatus(true)} className='w-1/2'>Role</Button>
				</div>
				<Modal title={<span className='text-2xl'>Change Password</span>}
					width={760}
					open={isShowModalChangePassword}
					maskClosable={false}
					onCancel={() => setIsShowModalChangePassword(false)}
					footer={<div>
						<Button style={{ background: '#348FE2', color: 'white' }}>Confirm</Button>
					</div>}>
					<Form>
						<Form.Item>
							<Typography.Title level={5}>Current Password</Typography.Title>
							<Input ></Input>
						</Form.Item>
						<Form.Item>
							<Typography.Title level={5}>New Password</Typography.Title>
							<Input type='password' ></Input>
							<Typography.Title className='my-5' level={5}>Confirm New Password</Typography.Title>
							<Input type='password' ></Input>
						</Form.Item>
					</Form>
				</Modal>
				<Modal title={<span className='text-2xl'>Change Role and Status</span>}
					width={760}
					open={isShowModalChangeRoleAndStatus}
					maskClosable={false}
					onCancel={() => setIsShowModalChangeRoleAndStatus(false)}
					footer={<div>
						<Button style={{ background: '#348FE2', color: 'white' }}>Confirm</Button>
					</div>}>
					<Form >
						<Form.Item>
							<Typography.Title level={5}>Roles</Typography.Title>
							<Select>
								<Option>Admin</Option>
								<Option>User</Option>
							</Select>
						</Form.Item>
						<Form.Item>
							<Typography.Title level={5}>Status</Typography.Title>
							<Select>
								<Option>Pending</Option>
								<Option>Active</Option>
								<Option>InActive</Option>
							</Select>
						</Form.Item>
					</Form>
				</Modal>
			</Modal> */}
		</section>
	)
}

export default function Page() {
	return <AccountPage />
}