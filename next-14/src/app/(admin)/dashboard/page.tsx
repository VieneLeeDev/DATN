'use client';

import { Button, Col, DatePicker, Divider, Drawer, Form, Input, Modal, Row, Select, Space, Table, Upload, UploadFile, GetProp, UploadProps } from "antd";
import { SearchProps } from "antd/es/input";
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from "react";
import { Option } from "antd/es/mentions";
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
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const { Search } = Input;
	const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
	const [fileList, setFileList] = useState<UploadFile[]>([
	]);

	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as FileType);
		}

		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
	};

	const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
		setFileList(newFileList);

	const uploadButton = (
		<button style={{ border: 0, background: 'none' }} type="button">
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Upload</div>
		</button>
	);

	const showDrawerCreate = () => {
		setTypeDrawer('Create')
		setOpen(true);
	};
	const showDrawerEdit = () => {
		setTypeDrawer('Edit')
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};

	const dataSource: IRoom[] = [
		{
			key: '1',
			id: 'room',
			price: 32,
			size: '10 m^2',
			guest: 1,
			image_url: '',
		}, {
			key: '2',
			id: 'room_2',
			price: 32,
			size: '10 m^2',
			guest: 1,
			image_url: '',
		},
	];

	const columns = [
		{
			title: 'image_url',
			dataIndex: 'image_url',
			key: 'image_url',
			className: "w-[24%]"
		},
		{
			title: 'Room No',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Price/Day ($)',
			dataIndex: 'price',
			key: 'price',
			className: "w-[14%]"
		},
		{
			title: 'size',
			dataIndex: 'size',
			key: 'size',
			className: "w-[14%]"
		},
		{
			title: 'guest',
			dataIndex: 'guest',
			key: 'guest',
			className: "w-[14%]"
		},
		{
			title: 'Action',
			render: (_: any, record: any) => {
				return <div className="flex gap-3 w-[40px]">
					<Button onClick={showDrawerEdit}><EditOutlined /></Button>
					<Button><DeleteOutlined /></Button>
				</div>
			}
		},
	];
	return (<section className="w-full h-full">
		<div className="flex h-12 items-center px-2 justify-between">
			<h3 className="text-xl font-bold">Room management</h3>
			<Search placeholder="Search by room number" onSearch={onSearch} style={{ width: 250 }} />
		</div>
		<Divider></Divider>
		<div className="flex text-md font-bold my-5">
			<Button onClick={showDrawerCreate}>Add New Room</Button>
		</div>
		<Table dataSource={dataSource} columns={columns} />
		<Drawer
			title={typeDrawer === 'Create' ? "Create New Room" : "Edit Room"}
			width={720}
			onClose={onClose}
			open={open}
			styles={{
				body: {
					paddingBottom: 80,
				},
			}}
			extra={
				<Space>
					<Button onClick={onClose}>Cancel</Button>
					<Button onClick={onClose}>
						Submit
					</Button>
				</Space>
			}
		>
			<Form layout="vertical" >
				<Row gutter={16}>
					<Col span={24}>
						<Form.Item
							name="id"
							label="Room No.: "
							rules={[{ required: true, message: 'Please enter Room No.' }]}
						>
							<Input placeholder="Please enter Room No." />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={24}>
						<Form.Item
							name="price"
							label="Price/day ($): "
							rules={[{ required: true, message: 'Please enter Price/day ($)' }]}
						>
							<Input type='number' placeholder="Please enter Price/day ($)" />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={24}>
						<Form.Item
							name="guest"
							label="Guest: "
							rules={[{ required: true, message: 'Please enter number of Guest' }]}
						>
							<Input type='number' placeholder="Please enter number of Guest" />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={24}>
						<Form.Item
							name="size"
							label="Size: "
							rules={[{ required: true, message: 'Please enter Size' }]}
						>
							<Input type='number' placeholder="Please enter Size" />
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={25}>
						<Form.Item
							name="img_url"
							label="Image: "
						>
							<Upload
								action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
								listType="picture-card"
								fileList={fileList}
							// onPreview={handlePreview}
							// onChange={handleChange}
							>
								{fileList.length >= 8 ? null : uploadButton}
							</Upload>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Drawer>
	</section>
	)
}

export default HomeDashboard