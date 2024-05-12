'use client'
import React, { useEffect, useState } from 'react'
import { Button, Divider, Checkbox, Table, Modal, Form, Input, Typography, Select } from "antd";
import { SearchProps } from "antd/es/input";
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { CheckboxProps, GetProp } from 'antd';
import { Option } from 'antd/es/mentions';
import CreateForm from './components/create/CreateForm';
import { Account, createMember, deleteMemberById, readMembers } from './actions';
import dayjs from "dayjs";

type CheckboxValueType = GetProp<typeof Checkbox.Group, 'value'>[number];
const AccountPage = async () => {
	const [isShowModalAddNew, setIsShowModalAddNew] = useState(false)
	const [isShowModalEdit, setIsShowModalEdit] = useState(false)
	const [dataSource, setDataSource] = useState<any[]>([])
	const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false)
	const [accountDelete, setAccountDelete] = useState<string>(``)
	const [isShowModalChangeRoleAndStatus, setIsShowModalChangeRoleAndStatus] = useState(false)
	const [isShowModalChangePassword, setIsShowModalChangePassword] = useState(false)
	const defaultCheckedList = ['Admin', 'User'];
	const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList);


	useEffect(() => {
		const fetchApi = async () => {
			const { data: members } = await readMembers()
			if (members) {
				const data = members.map((account, index) => account = { key: index, ...account })
				setDataSource(data)
			}
		}
		fetchApi()
	}, [])

	const handleConfirmDeleteUser = (data: any) => {
		setIsOpenDelete(true)
		setAccountDelete(data)
	}

	const handleDeleteUser = async () => {
		const result = await deleteMemberById(accountDelete)
		console.log(result)
		setIsOpenDelete(false)
	}

	const columns = [
		{
			title: 'User',
			className: "w-[24%]",
			render: (_: any, record: any) => {
				return <span>{record.member.name}</span>
			}
		},
		{
			title: 'Created At',
			dataIndex: 'created_at',
			key: 'created_at',
			render: (text: string) => { // Modified render function
				const formattedDate = dayjs(text).format('YYYY-MM-DD');
				return <span>{formattedDate}</span>;
			}
		},
		{
			title: 'Role',
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
					<Button onClick={() => handleConfirmDeleteUser(record.member_id)}><DeleteOutlined /></Button>
				</div>;
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
			<div className='flex flex-col md:flex-row gap-2 rounded-xl overflow-hidden items-center justify-between min-h-[70px] '>
				<div className='flex items-center justify-center w-full lg:w-1/3 h-full bg-[#727CB6] text-white rounded-xl p-2 text-center'>
					<span className='text-3xl font-bold mr-5'>Total:</span>
					<span className='text-3xl font-bold'>36</span>
				</div>
				<div className='flex items-center justify-center w-full  lg:w-1/3 h-full bg-[#348FE2] text-white rounded-xl p-2 text-center'>
					<span className='text-3xl font-bold mr-5'>Admin:</span>
					<span className='text-3xl font-bold'>5</span>
				</div>
				<div className='flex items-center justify-center w-full  lg:w-1/3 h-full bg-[#01ACAC] text-white rounded-xl p-2 text-center'>
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
			<Table scroll={{ x: 1300 }} className='border-[1px] my-5' dataSource={dataSource} columns={columns} />
			<Modal
				title={"Create New User"}
				width={760}
				open={isShowModalAddNew}
				maskClosable={false}
				onCancel={() => setIsShowModalAddNew(false)}
				footer={false}
			>
				<CreateForm></CreateForm>
			</Modal>

			{/* delete */}
			<Modal open={isOpenDelete} onCancel={() => setIsOpenDelete(false)} footer={<Button danger onClick={handleDeleteUser} >Delete</Button>}>
				Are you sure want to delete this account?
			</Modal>
		</section>
	)
}

export default function Page() {
	return <AccountPage />
}