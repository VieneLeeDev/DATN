"use client"
import { Button, Form, Spin, Upload, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import UpdateProfile from './components/update';

const props: UploadProps = {
	name: 'file',
	action: 'https://localhost:3000/',
	headers: {
		authorization: 'authorization-text',
	},
	onChange(info) {
		if (info.file.status !== 'uploading') {
			console.log(info.file, info.fileList);
		}
		if (info.file.status === 'done') {
			message.success(`${info.file.name} file uploaded successfully`);
		} else if (info.file.status === 'error') {
			message.error(`${info.file.name} file upload failed.`);
		}
	},
};

const Profile = () => {
	const [infoUser, setInfoUser] = useState<any>()
	const [openUpdate, setOpenUpdate] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const initPage = async () => {

	}
	useEffect(() => { initPage() }, [])
	const handleOpen = async () => {
		setOpenUpdate(true)
	}
	const handleClose = async () => {
		await initPage()
		setOpenUpdate(false)
	}

	return (
		<Spin spinning={isLoading}>
			<section className='flex flex-col items-center w-screen h-screen p-[50px]'>
				<h2 className='w-full text-center font-bold text-3xl'>{`User Profiles`}</h2>
				<section className='w-2/3 h-full mt-[30px] p-[10px] rounded-[40px] bg-slate-200'>
					<section className='flex w-full h-full p-[50px] rounded-[30px] overflow-hidden bg-white'>
						<div className='w-2/3 h-full'>
							<div className='flex text-xl mb-[40px]'>
								<span className='block w-[200px] font-bold '>User Name:</span>
								<span className='block'>{infoUser?.nick_name}</span>
							</div>
							<div className='flex text-xl mb-[40px] '>
								<span className='block w-[200px] font-bold'>Full Name:</span>
								<span className='block'> {infoUser?.full_name}</span>
							</div>
							<div className='flex text-xl mb-[40px]'>
								<span className='block w-[200px] font-bold '>Email:</span>
								<span className='block'> {infoUser?.email}</span>
							</div>
							<div className='flex text-xl mb-[40px]'>
								<span className='block w-[200px] font-bold '>Birthday:</span>
								<span className='block'> {infoUser?.birthday}</span>
							</div>
							<div className='flex text-xl mb-[40px]'>
								<span className='block w-[200px] font-bold '>Citizen ID card:</span>
								<span className='block'> {infoUser?.citizenIdCard}</span>
							</div>
							<div className='flex text-xl mb-[40px]'>
								<span className='block w-[200px] font-bold '>Gender: </span>
								<span className='block'> {infoUser?.gender}</span>
							</div>
							<div className='flex text-xl mb-[40px]'>
								<span className='block w-[200px] font-bold '>Phone: </span>
								<span className='block'> {infoUser?.phone_number}</span>
							</div>
							<div className='flex gap-5'>
								{/* <Button>Reset Password</Button> */}
								<Button className='bg-blue-500 text-white' onClick={handleOpen}>Update Information</Button>
							</div>
						</div>
						<div className='w-1/3 h-full flex flex-col'>
							<div className='w-full h-[350px] bg-slate-200'> </div>
							<Button onClick={() => document.getElementById('upload-trigger')?.click()}>Upload Avatar</Button>
						</div>
					</section>
					{openUpdate && <UpdateProfile data={infoUser} open={openUpdate} close={handleClose}></UpdateProfile>}
				</section>
			</section>
		</Spin>
	)
}

export default Profile