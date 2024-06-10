"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import { Avatar, Button, Dropdown, Tooltip, notification } from "antd";
import { authStore } from "@/stores/auth.store";
import { ProfileFilled, LogoutOutlined } from '@ant-design/icons';
import { appStore } from "@/stores";
import cloud_icon from '@/assets/02d.svg'
import tick_icon from '@/assets/tick.svg'
import lang_icon from '@/assets/language.svg'
import Image from "next/image";
import dayjs from "dayjs";
export const Header = () => {
	const [isShowDrawer, setIsShowDrawer] = useState(false);
	const [userName, setUserName] = useState("")
	const [roleUser, setRoleUser] = useState("user")
	const [hours, setHours] = useState(dayjs().format("HH:mm A"))
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
	const handleViewProfiles = () => {
		window.location.href = "/profiles"
	}

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
	// useEffect(() => {
	// 	initLayout()
	// }, [])

	useEffect(() => {
		const intervalFunc = setInterval(() => {
			setHours(dayjs().format("HH:mm A"))
		}, 1000)
		return () => clearInterval(intervalFunc)
	}, [])


	return (<section className="h-[62px] w-full bg-[#1C2C34] pt-[16px] pb-[15px] box-border">
		<section className="text-[15px] flex justify-between text-white w-full mx-auto max-w-[1650px]">
			{/* logo */}
			<section className="flex items-center gap-[8px] h-full ">
				<span>Da Nang</span>
				{/* <Image
					alt="Cloud SVG"
					width={30}
					height={30} 
					priority
					src={'@/assets/02d.svg'} ></Image> */}
				<span>-</span>
				<span>{hours}</span>
			</section>
			<section className="flex items-center gap-[8px] h-full text-[15px]">
				<div className="flex h-full w-auto gap-2 text-white hover:text-hoverbtn cursor-pointer">
					{/* <Image
						alt="tick SVG"
						width={25}
						height={25}
						src={tick_icon} ></Image> */}
					<span>Terms & Condition</span>
				</div>
				<div className="px-[25px]">
					<div className="h-[25px] border-l-[1px] border-solid border-[#FFFFFF26]"></div>
				</div>
				<div className="flex h-full w-auto gap-2">
					<span className="block text-white hover:text-hoverbtn cursor-pointer">Login</span>
					<span className="block">/</span>
					<span className="block text-white hover:text-hoverbtn cursor-pointer">Register</span>
				</div>
				<div className="px-[25px]">
					<div className="h-[25px] border-l-[1px] border-solid border-[#FFFFFF26]"></div>
				</div>
				<div className="flex h-full w-auto gap-2 text-white hover:text-hoverbtn cursor-pointer">
					{/* <Image
						alt="tick SVG"
						width={25}
						height={25}
						src={lang_icon} ></Image> */}
					<span>Languages</span>
				</div>
			</section>
		</section>
	</section>);
};
