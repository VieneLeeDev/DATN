'use client'
import React, { useEffect, useState } from 'react'
import { Button, Divider, Checkbox, Table, Modal, notification, Spin } from "antd";
import { EditOutlined, DeleteOutlined} from '@ant-design/icons';
import type { CheckboxProps, GetProp } from 'antd';
import CreateForm from './components/create/CreateForm';
import {  deleteMemberById, readMembers } from './actions';
import dayjs from "dayjs";
import { ICounterRole } from '@/common/types';
import EditForm from './components/Edit/EditForm';

type CheckboxValueType = GetProp<typeof Checkbox.Group, 'value'>[number];
const AccountPage = () => {
	const [isShowModalAddNew, setIsShowModalAddNew] = useState(false)
	const [isShowModalEdit, setIsShowModalEdit] = useState(false)
	const [dataSource, setDataSource] = useState<any[]>([])
	const [dataTable, setDataTable] = useState<any[]>(dataSource)
	const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false)
	const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false)
	const [accountDelete, setAccountDelete] = useState<string>(``)
	const [accountEdit, setAccountEdit] = useState<string>(``)
	const [counterRole, setCounterRole] = useState<ICounterRole>({ admin: 0, user: 0 })
	const [isShowModalChangeRoleAndStatus, setIsShowModalChangeRoleAndStatus] = useState(false)
	const [isShowModalChangePassword, setIsShowModalChangePassword] = useState(false)
	const defaultCheckedList = ['Admin', 'User'];
	const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList);
	const [isLoading, setIsLoading] = useState(true)
	const fetchApi = async () => {
		const { data: members } = await readMembers()
		if (members) {
			const data = members.map((account, index) => account = { key: index, ...account })
			const numberAdmin = members.filter((account) => account.role === 'admin')
			const numberUser = members.filter((account) => account.role === 'user')
			setDataSource(data)
			setDataTable(data)
			setCounterRole({ admin: numberAdmin.length, user: numberUser.length })
		}
		setIsLoading(false)
	}

	useEffect(() => {
		fetchApi()
	}, [])

	const handleConfirmDeleteUser = (data: any) => {
		setIsOpenDelete(true)
		setAccountDelete(data)
	}

	const handleDeleteUser = async () => {
		setIsLoading(true)
		try {
			await deleteMemberById(accountDelete)
			notification.success({ message: "Deleted successful!" })
		} catch (error) {
			await fetchApi()
			notification.error({ message: `${error}` })
		}
		await fetchApi()
		setIsOpenDelete(false)
		setIsLoading(false)
	}

	const columns = [
		{
			title: 'User',
			render: (_: any, record: any) => {
				return <span>{record.member.name}</span>
			}
		},
		{
			title: 'Email',
			render: (_: any, record: any) => {
				return <span>{record.member.email}</span>
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
					<Button onClick={() => handleEdit(record)}><EditOutlined /></Button>
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

	const handleAddUser = async () => {
		setIsShowModalAddNew(false)
		setIsLoading(true)
		await fetchApi()
		setIsLoading(false)
	}
	const handleEdit = (account: any) => {
		setAccountEdit(account)
		setIsOpenEdit(true)
	}
	const CheckboxGroup = Checkbox.Group;

	const handleCloseEdit = async () => {
		await fetchApi()
		setIsOpenEdit(false)
		setAccountDelete(``)
	}

	useEffect(() => {
		const dataAdmin = dataSource.filter((account) => account.role === 'admin')
		const dataUser = dataSource.filter((account) => account.role === 'user')
		const isAdmin = checkedList.find((role) => role === 'Admin')
		const isUser = checkedList.find((role) => role === 'User')
		if (checkedList.length === 2) {
			setDataTable(dataSource)
		}
		else {
			if (isAdmin && !isUser) {
				setDataTable(dataAdmin)
			}
			else if (!isAdmin && isUser) {
				setDataTable(dataUser)
			}
			else if (!isAdmin && !isUser) {
				setDataTable([])
			}
		}
	}, [checkedList])
	return (
		<Spin spinning={isLoading}>
			<section className="w-full h-full">
				<div className="flex h-12 items-center px-2 justify-between">
					<h3 className="text-3xl font-bold">Account management</h3>
				</div>
				<Divider></Divider>
				<div className='flex flex-col md:flex-row gap-2 rounded-xl overflow-hidden items-center justify-between min-h-[70px] '>
					<div className='flex items-center justify-center w-full lg:w-1/3 h-full bg-[#727CB6] text-white rounded-xl p-2 text-center'>
						<span className='text-3xl font-bold mr-5'>Total:</span>
						<span className='text-3xl font-bold'>{dataSource.length}</span>
					</div>
					<div className='flex items-center justify-center w-full  lg:w-1/3 h-full bg-[#348FE2] text-white rounded-xl p-2 text-center'>
						<span className='text-3xl font-bold mr-5'>Admin:</span>
						<span className='text-3xl font-bold'>{counterRole.admin}</span>
					</div>
					<div className='flex items-center justify-center w-full  lg:w-1/3 h-full bg-[#01ACAC] text-white rounded-xl p-2 text-center'>
						<span className='text-3xl font-bold  mr-5'>User:</span>
						<span className='text-3xl font-bold'>{counterRole.user}</span>
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
				<Table scroll={{ x: 1300 }} className='border-[1px] my-5' dataSource={dataTable} columns={columns} />
				<Modal
					title={"Create New User"}
					width={760}
					open={isShowModalAddNew}
					maskClosable={false}
					onCancel={() => setIsShowModalAddNew(false)}
					footer={false}
				>
					<CreateForm reloadFunction={handleAddUser}></CreateForm>
				</Modal>
				{/* delete */}
				<Modal open={isOpenDelete} onCancel={() => setIsOpenDelete(false)} footer={<Button danger onClick={handleDeleteUser} >Delete</Button>}>
					Are you sure want to delete this account?
				</Modal>
				{/* Edit user */}
				{isOpenEdit && <EditForm open={isOpenEdit} data={accountEdit} onCancel={handleCloseEdit}></EditForm>}
			</section>
		</Spin>
	)
}

export default function Page() {
	return <AccountPage />
}