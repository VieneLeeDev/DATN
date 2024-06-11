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
import Image from "next/image";
import dayjs from "dayjs";
export const Header = () => {
	const [hours, setHours] = useState(dayjs().format("HH:mm A"))
	const router = useRouter();


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
				<Image
					alt="Cloud SVG"
					width={30}
					height={30}
					priority
					src={'/02d.svg'} ></Image>
				<span>-</span>
				<span>{hours}</span>
			</section>
			<section className="flex items-center gap-[8px] h-full text-[15px]">
				<div className="flex h-full w-auto gap-2 text-white hover:text-hoverbtn cursor-pointer">
					<Image
						alt="tick SVG"
						width={25}
						height={25}
						src={'/tick.svg'} ></Image>
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
					<Image
						alt="tick SVG"
						width={25}
						height={25}
						src={'/language.svg'} ></Image>
					<span>Languages</span>
				</div>
			</section>
		</section>
	</section>);
};
