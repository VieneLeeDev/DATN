'use client'
import React from 'react'
import { Button, Col, Drawer, Form, Input, Row, Space, UploadFile, GetProp, UploadProps, Spin, notification, InputNumber } from "antd";
import { SearchProps } from "antd/es/input";
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from "react";
import { createRoom, updateRoom } from './actions';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const getBase64 = (file: FileType): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});

const DrawerRoom = (props: any) => {
	const { title, onClose, open, dataEdit } = props
	const [isLoading, setIsLoading] = useState(false)
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const { TextArea } = Input;
	const [form] = Form.useForm()

	const handleAddRoom = async (value: any) => {
		setIsLoading(true)
		// const result = await createRoom(value)
		// if (result.error?.message) {
		// 	notification.error({ message: result.error?.message })
		// }
		// else {
		// 	notification.success({ message: "Created succesfull!" })
		// }
		setIsLoading(false)
		form.resetFields()
		onClose()
	}

	const handleUpdateRoom = async (value: any) => {
		setIsLoading(true)
		// const resultUpdateRoom = await updateRoom(value)
		// if (resultUpdateRoom?.error?.message) {
		// 	notification.error({ message: 'This Room Id is already exist!' })
		// }
		// else {
		// 	notification.success({ message: 'Update Successful!' })
		// }
		setIsLoading(false)
		form.resetFields()
		onClose()
	}

	return (
		<Drawer
			title={title}
			width={720}
			open={open}
			onClose={onClose}
			styles={{
				body: {
					paddingBottom: 80,
				},
			}}
		>
			{title === "Edit Room" ? <Spin spinning={isLoading}>
				<Form form={form} initialValues={dataEdit} layout="vertical" onFinish={handleUpdateRoom}>
					<Row gutter={16}>
						<Col span={24}>
							<Form.Item
								name="id"
								label="Room No.: "
							>
								<Input disabled />
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
								rules={[{ required: true, message: 'Please enter number of Guest' }, {
									type: 'number',
									min: 1,
									message: 'Please enter a number greater than or equal to 1',
									transform: (value) => {
										if (value === '') return undefined; // Bỏ qua giá trị rỗng
										const intValue = parseInt(value, 10); // Chuyển đổi thành số nguyên
										if (isNaN(intValue)) return undefined; // Bỏ qua nếu không phải là số
										return intValue;
									},
								},]}

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
					<Form.Item
						name="image_url"
						label="Image: "
						required
					>
						<TextArea rows={2} />
					</Form.Item>
					<Form.Item
						name="description"
						label="Description: "
						required
					>
						<TextArea rows={5} />
					</Form.Item>
					<Form.Item>
						<Button htmlType='submit'>Submit</Button>
					</Form.Item>
				</Form>
			</Spin> : <Spin spinning={isLoading}>
				<Form form={form} layout="vertical" onFinish={handleAddRoom}>
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
								rules={[{ required: true, message: 'Please enter number of Guest' }, {
									type: 'number',
									min: 1,
									message: 'Please enter a number greater than or equal to 1',
									transform: (value) => {
										if (value === '') return undefined; // Bỏ qua giá trị rỗng
										const intValue = parseInt(value, 10); // Chuyển đổi thành số nguyên
										if (isNaN(intValue)) return undefined; // Bỏ qua nếu không phải là số
										return intValue;
									},
								},]}

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
					<Form.Item
						name="image_url"
						label="Image: "
						required
					>
						<TextArea rows={2} />
					</Form.Item>
					<Form.Item
						name="description"
						label="Description: "
						required
					>
						<TextArea rows={5} />
					</Form.Item>
					<Form.Item>
						<Button htmlType='submit'>Submit</Button>
					</Form.Item>
				</Form>
			</Spin>}
		</Drawer>
	)
}

export default DrawerRoom