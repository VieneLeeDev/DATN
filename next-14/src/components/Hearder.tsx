"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MenuHeader from "./MobileHeader";
import { FiAlignJustify } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import { Avatar, Button, Dropdown, Image, Tooltip, notification } from "antd";
import { authStore } from "@/stores/auth.store";
import { ProfileFilled, LogoutOutlined } from '@ant-design/icons';
import { appStore } from "@/stores";

export const Header = () => {
	const [isShowDrawer, setIsShowDrawer] = useState(false);
	const [userName, setUserName] = useState("")
	const [roleUser, setRoleUser] = useState("user")
	const handleClickDrawer = () => {
		setIsShowDrawer(true);
	};

	const router = useRouter();
	//sign out and navigate to login page
	const handleSignOUt = async () => {
		try {
			await authStore.signOut();
			notification.success({ message: "Sign out successfull!" });
			if (!authStore.isLoggin) {
				router.push('/login')
			}
		} catch (error) {
			notification.error({ message: `${error}` });
		}
	};

	const handleViewListBooking = () => {
		window.location.href = "/received"
	}

	const getUserName = async () => {
		const { data } = await supabase.auth.getSession();
		if (data.session?.user.email) {
			setUserName(data.session?.user.email)
		}
	}
	const getUserRole = async () => {
		const { data: activeSession } = await supabase.auth.getSession();
		if (activeSession.session) {
			const { data } = await supabase.from('permission').select().eq('member_id', activeSession?.session.user.id)
			if (data) {
				let role = data[0].role
				if (role === 'admin') {
					setRoleUser(role)
				}
			}
		}
	}
	const initLayout = async () => {
		getUserName()
		getUserRole()
	}
	useEffect(() => {
		initLayout()
	}, [])

	return (
		<>
			<div className="flex flex-col shadow-lg max-w-screen h-[70px] justify-center px-5 bg-[#fffefe]">
				<div className="hidden md:flex md:w-full h-full items-center justify-between">
					{/**navigation desktop*/}
					<div className="hidden md:flex space-x-3">
						<Link
							href={"/"}
							className={`text-xl flex justify-center items-center p-2 w-[150px] hover:opacity-50 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl text-white`}
						>
							Home
						</Link>
						{roleUser === 'admin' && <Link
							href={"/dashboard"}
							className={`text-xl flex justify-center items-center p-2 w-[150px] hover:opacity-50 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl text-white`}
						>
							Dashboard
						</Link>}
					</div>

					<div className="hidden md:flex space-x-3">
						{!authStore.isLoggin ? <Link
							href={"/login"}
							className="p-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl w-[150px] text-center text-white font-semibold hover:opacity-50"
						>
							Sign in
						</Link> : <div className="flex items-center justify-center cursor-pointer h-full min-w-[130px]">
							<Dropdown trigger={['click']} menu={{
								items: [
									{ label: 'List booking', key: 'sub1', icon: <ProfileFilled />, onClick: handleViewListBooking },
									{ label: 'Logout', key: 'sub2', icon: <LogoutOutlined />, onClick: handleSignOUt }
								]
							}}
								placement="bottom">
								<div className="flex items-center justify-between w-full h-full px-2 space-x-2">
									<Avatar
										icon={
											<Image
												preview={false}
												src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
												className="w-full h-full "
											/>
										}
									/>
									<span >
										{userName}
									</span>
								</div>
							</Dropdown>
						</div>}
					</div>
				</div>
				<button
					onClick={handleClickDrawer}
					className="md:hidden w-[30px] h-[30px]"
				>
					<FiAlignJustify className="w-full h-full text-white" />
				</button>
			</div>
			<MenuHeader open={isShowDrawer} close={() => setIsShowDrawer(false)} />
		</>
	);
};
