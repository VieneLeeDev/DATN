"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Button, DatePicker, Flex, Form, Modal, Spin, notification } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useSearchParams, useRouter } from "next/navigation";
// import { useRouter } from 'next/router';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import { inject, observer } from "mobx-react";
import Image from "next/image";
import { useExplorePathname } from "@/hooks";
import { supabase } from "@/utils/supabaseClient";
import { RoomStore } from "@/stores/room.store";
import { toJS } from "mobx";
import Router, { withRouter } from 'next/router'
import PaymentForm from "./components/PaymentForm/PaymentForm";
import { RoomDto } from "@/common/types";
import img_room from '@/assets/roomhotel.jpg'
import { useForm } from "antd/es/form/Form";
import Link from "next/link";

const DetailRoom = () => {
	const [detailRoom, setDetailRoom] = useState<RoomDto>({})
	const [form] = useForm()
	const searchParams = useSearchParams()
	const id = searchParams.get('id')

	return (
		<div className="w-full container">
			<div className="relative w-full h-[450px] bg-red-200">
				<Image className="absolute top-0 left-0 w-full h-full object-cover object-center" src={img_room} alt="img room" />

				<div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>

				<div className="absolute z-10 text-white bottom-[40px] w-full flex flex-col items-center justify-center">
					<h1 className="text-[60px]">Standard Room</h1>
					<span className="text-[20px] space-x-[0.2em] uppercase mt-[12px]">
						- GREAT CHOICE FOR A RELAXING VACATION FOR FAMILIES WITH CHILDREN OR A GROUP OF FRIENDS -
					</span>
				</div>
			</div>
			<Flex gap={16} className="mt-[50px]">
				<div className="w-2/3 min-w-[500px] pt-[30px] pb-[55px]">
					<h2 className="text-[35px] font-cormorant">Infomation</h2>
					<div className="w-full h-auto min-h-[335px]">
						<p className="mt-[20px]">Size: <span className="ml-[8px]">30</span>m&sup2;</p>
						<p className="mt-[20px]">Bed Type:  <span className="ml-[8px]">King Bed</span></p>
						<p className="mt-[20px]">Capacity: <span className="ml-[8px]">4 Adults, 3 Childrens</span></p>
						<p className="mt-[20px]">Bathroom: <span className="ml-[8px]">Sexy style mirror separate bathroom</span></p>
						<p className="mt-[20px]">Description: <span className="ml-[8px]">A light palette of earthy tones and shimmering platinum create a sanctuary that is at once, warm, serene and inviting. Wrap-around, floor-to-ceiling windows unveil breathtaking views of the city and the Saigon River. A sensual, marble-clad bath with separate shower and deep-soaking, window-side tub beckons for some serious personal time.</span></p>
					</div>
				</div>
				<div className="w-1/3 min-w-[300px] py-[30px]">
					<h1 className="text-[35px] font-cormorant">Book room</h1>
					<div className="uppercase bg-[#f1efed] px-[25px] py-[25px]" >
						<Form layout="vertical" >
							<Form.Item name='checkIn' required label={"Check - in:"}>
								<DatePicker className="w-full h-[40px]" />
							</Form.Item>
							<Form.Item name='checkOut' required label={"Check - out:"}>
								<DatePicker className="w-full h-[40px]" />
							</Form.Item>
						</Form>
						<p className="text-[20px] my-[10px] tracking-widest">Total:<span>320</span>$</p>
						<Button className={`bg-main_bg uppercase border-white border-[1px] border-solid px-[35px] py-[10px] text-white w-full h-[50px] text-[20px] hover:!bg-hoverbtn hover:!text-main_bg hover:!border-main_bg`}>
							Book now
						</Button>
					</div>
				</div>
			</Flex>
		</div>
	);
}
export default DetailRoom
