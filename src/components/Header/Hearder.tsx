"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { supabase } from "@/utils/supabaseClient";
import { Avatar, Button, Dropdown, Select, Tooltip, notification } from "antd";
import { authStore } from "@/stores/auth.store";
import { ProfileFilled, LogoutOutlined } from '@ant-design/icons';
import { appStore } from "@/stores";
import Image from "next/image";
import dayjs from "dayjs";
import night_icon from '@/assets/night_moon.svg?url'
import './Header.css'
export const Header = () => {
	const [hours, setHours] = useState<string>(dayjs().format())
	const link_icon = dayjs(hours).hour() > 18 ? '/01d.svg' : '/02d.svg'

	useEffect(() => {
		const intervalFunc = setInterval(() => {
			setHours(dayjs().format())
		}, 1000)
		return () => clearInterval(intervalFunc)
	}, [])


	return (<section className="h-[62px] w-full bg-[#1C2C34] pt-[16px] pb-[15px] px-5 box-border">
		<section className="text-[15px] flex justify-between text-white w-full mx-auto max-w-[1650px]">
			{/* logo */}
			<section className="flex items-center gap-[8px] h-full ">
				<span>Da Nang</span>
				<Image
					alt="Cloud SVG"
					width={30}
					height={30}
					priority
					src={link_icon} />
				<span className="tracking-widest">{`- ${dayjs(hours).format("HH:mm A")}`}</span>
			</section>
			<div className="h-full w-auto text-white hover:text-hoverbtn cursor-pointer text-[20xp] hidden lg:flex">
				<Link href={"./"}>HERCULES HOTEL & RESORT</Link>
			</div>
			<section className="hidden md:flex items-center gap-[8px] h-full text-[15px] box-border">
				<div className="px-[25px]">
					<div className="h-[25px] border-l-[1px] border-solid border-[#FFFFFF26]"></div>
				</div>
				<div className="flex h-full w-auto gap-2">
					<Link href={{ pathname: "./login", query: { typeForm: "login" } }} className="block text-white hover:text-hoverbtn cursor-pointer">Login</Link >
					<span className="block">/</span>
					<Link href={{ pathname: "./login", query: { typeForm: "register" } }} className="block text-white hover:text-hoverbtn cursor-pointer">Register</Link >
				</div>
				<div className="px-[25px]">
					<div className="h-[25px] border-l-[1px] border-solid border-[#FFFFFF26]"></div>
				</div>
				<div className="flex h-full w-auto gap-2 text-white hover:text-hoverbtn cursor-pointer">
					<Image
						alt="tick SVG"
						width={25}
						height={25}
						src={'/language.svg'} ></Image>
					<span>Languages</span>
				</div>
			</section>
			<section className="block md:hidden lang-mobile">
				<Select
					dropdownStyle={{ width: 150 }}
					className="outline-none border-none"
					suffixIcon={<Image
						alt="tick SVG"
						width={30}
						height={30}
						src={'/language.svg'} ></Image>}>
				</Select>
			</section>
		</section>
	</section>);
};
