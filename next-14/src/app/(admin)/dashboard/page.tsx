'use client';

import { Button, Col, DatePicker, Divider, Drawer, Form, Input, Modal, Row, Select, Space, Table, Upload, UploadFile, GetProp, UploadProps, notification, Spin } from "antd";
import { SearchProps } from "antd/es/input";
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import DrawerRoom from "./room/page";
import { deleteRoom, readRoom } from "./room/actions";
export interface IRoom {
	key: string,
	id: string,
	price: number,
	size: string,
	guest: 1,
	image_url: string,
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const getBase64 = (file: FileType): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});

const HomeDashboard = () => {
	const [open, setOpen] = useState(false);
	const [typeDrawer, setTypeDrawer] = useState<string>('');
	const [dataSource, setDataSource] = useState<any[]>([])
	const [dataList, setDataList] = useState<any[]>([])
	const [isLoading, setIsloading] = useState(false)
	const [roomEdit, setRoomEdit] = useState()
	const [stringSearch, setStringSearch] = useState('')
	const { Search } = Input;
	const onSearch: SearchProps['onSearch'] = (value, _e, info) => setStringSearch(value.trim());

	const resultReadRoom = async () => {
		setIsloading(true)
		const { data, error } = await readRoom()
		const cleanData = data?.map((room) => { return { ...room, key: room.id } })
		cleanData && setDataSource(cleanData)
		cleanData && setDataList(cleanData)
		setIsloading(false)
	}


	useEffect(() => {
		resultReadRoom()
	}, [])

	const showDrawerCreate = async () => {
		setTypeDrawer('Create')
		setOpen(true);
	};
	const showDrawerEdit = async (room: any) => {
		setRoomEdit(room)
		setTypeDrawer('Edit')
		setOpen(true);
	};
	const onClose = async () => {
		setOpen(false);
		await resultReadRoom()
	};

	const handleDeleteRoom = async (id: string) => {
		setIsloading(true)
		const resultDelete = await deleteRoom(id)
		if (resultDelete.error?.message) {
			notification.error({ message: resultDelete.error?.message })
		}
		else {
			notification.success({ message: "Created succesfull!" })
		}
		await resultReadRoom()
	}

	const columns = [
		{
			title: 'Room No',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Image Link',
			dataIndex: 'image_url',
			key: 'image_url',
			className: "max-w-[300px] truncate overflow-hidden"
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
			className: "max-w-[300px] truncate overflow-hidden"
		},
		{
			title: 'Price/Day ($)',
			dataIndex: 'price',
			key: 'price',
		},
		{
			title: 'size',
			dataIndex: 'size',
			key: 'size',
		},
		{
			title: 'guest',
			dataIndex: 'guest',
			key: 'guest',
		},
		{
			title: 'Action',
			render: (_: any, record: any) => {
				return <div className="flex gap-3 w-[40px]">
					<Button onClick={() => showDrawerEdit(record)}><EditOutlined /></Button>
					<Button onClick={() => handleDeleteRoom(record.id)}><DeleteOutlined /></Button>
				</div>
			}
		},
	];

	useEffect(() => {
		if (stringSearch) {
			let filterRoom = dataSource.filter((room) => String(room.id).includes(stringSearch))
			setDataList(filterRoom)
		}
		else if (stringSearch === '' && dataSource.length !== 0) {
			setDataList(dataSource)
		}
	}, [stringSearch])

	return (<Spin spinning={isLoading}>
		<section className="w-full h-full">
			<div className="flex h-12 items-center px-2 justify-between">
				<h3 className="text-xl font-bold">Room management</h3>
				<Search placeholder="Search by room number" onSearch={onSearch} style={{ width: 250 }} allowClear />
			</div>
			<Divider></Divider>
			<div className="flex text-md font-bold my-5">
				<Button onClick={showDrawerCreate}>Add New Room</Button>
			</div>
			<Table dataSource={dataList} columns={columns} />
			{open && <DrawerRoom title={typeDrawer === 'Create' ? "Create New Room" : "Edit Room"} dataEdit={roomEdit} onClose={onClose} open={open} />}
		</section>
	</Spin>
	)
}

export default HomeDashboard