"use client";
import React, { useCallback, useEffect, useState } from "react";
import { DatePicker, Modal, notification } from "antd";
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
import Button from "@/components/Button";
dayjs.extend(customParseFormat);

const DetailRoom = inject("appStore")(
	observer(({ appStore }: { appStore?: any }) => {
		const [count, setCount] = useState(1);
		const [reload, setReload] = useState(false);
		const [dataInBill, setDataInBill] = useState({
			checkIn: "",
			checkOut: "",
		});
		const [detailRoom, setDetailRoom] = useState({ id: "", price: 0, image_url: '', size: '', guest: '' })
		const dataInSearch = {
			checkIn: appStore.filter.filter_from,
			checkOut: appStore.filter.filter_to,
		};
		const router = useRouter();
		// roomId from url
		const params = useSearchParams()
		const roomId = params.get('id')

		const initDetailPage = async () => {
			let { data } = await supabase.from('room').select().eq('id', roomId)
			const result = data?.shift()
			setDetailRoom({ ...result })
			//check in the first time the date is empty ?if it's none empty we get the date from params to fill the bill : if it's empty we get curently date for data bill
			dataInSearch.checkIn === ""
				? setDataInBill({
					checkIn: String(dayjs().format("YYYY-MM-DD")),
					checkOut: String(dayjs().format("YYYY-MM-DD")),
				})
				: setDataInBill({
					checkIn: dataInSearch.checkIn,
					checkOut: dataInSearch.checkOut,
				});
			handleCountDays(dataInSearch.checkIn, dataInSearch.checkOut);
		}

		const searchParams = useSearchParams()
		const createQueryString = useCallback(
			(name: string, value: string) => {
				const params = new URLSearchParams(searchParams.toString())
				params.set(name, value)

				return params.toString()
			},
			[searchParams]
		)

		useEffect(() => {
			initDetailPage()
		}, []);

		useEffect(() => {
			// check date from form search
			if (dataInBill.checkIn !== "" && dataInBill.checkOut !== "") {
				handleCountDays(dataInBill.checkIn, dataInBill.checkOut);
			}

			// check date check-out always after date check-in
			if (count < 1) {
				setDataInBill({ ...dataInBill, checkOut: dataInBill.checkIn });
			}
		}, [count, reload]);

		useEffect(() => {
			handleCountDays(dataInBill.checkIn, dataInBill.checkOut);
		}, [dataInBill]);

		const handleCountDays = (dateCheckIn: string, dateCheckOut: string) => {
			const startDay = new Date(dateCheckIn).getTime();
			const endDay = new Date(dateCheckOut).getTime();
			const result = Math.floor((endDay - startDay) / (1000 * 60 * 60 * 24)) + 1;
			setCount(result);
		};

		const onChangeDateCheckOut = (e: any) => {
			setDataInBill({ ...dataInBill, checkOut: e });
			setReload(!reload);
		};

		const onChangeDateCheckIn = (e: any) => {
			setDataInBill({ ...dataInBill, checkIn: e });
			setReload(!reload);
		};

		const ValidateCheckIn = (value: any) => {
			return value && value < dayjs().endOf("day");
		};

		const ValidateCheckOut = (value: any) => {
			return dayjs(value).isBefore(dayjs(`${dataInBill.checkIn}`));
		};

		const checkAvailableDuration = () => {
			appStore.setDuration(dataInBill.checkIn, dataInBill.checkOut)
			const checkListAvailable = appStore.room.itemsFiltered.find((room: any) => room.id === detailRoom.id)
			if (!checkListAvailable) {
				notification.error({ message: "Phòng đã được book trong thời gian này, vui lòng thay đổi lịch!" });
			}
			else {
				const dataBooking: any = {
					room_id: detailRoom?.id,
					from: dataInBill.checkIn,
					to: dataInBill.checkOut,
					total_price: detailRoom?.price * count,
				};
				router.push(`/payment?${createQueryString('room_id', dataBooking.room_id)}&${createQueryString('from', dataBooking.from)}&${createQueryString('to', dataBooking.to)}&${createQueryString('total_price', dataBooking.total_price)}`)
				// await appStore.booking.create(dataBooking);
				// await appStore.resetFilter();
				// window.location.href = "/received";
				// router.push({ pathname: '/payment', query: { dataBooking: { ...dataBooking } } })
			}
		}

		// set default value for datePicker in detail products
		const defaultValueCheckin =
			dataInSearch.checkIn === ""
				? dayjs(dayjs(), "YYYY-MM-DD")
				: dayjs(`${dataInSearch.checkIn}`);
		const defaultValueCheckOut =
			dataInSearch.checkOut === ""
				? dayjs()
				: dayjs(`${dataInSearch.checkOut}`);

		const handleOrder = async () => {
			const { data: activeSession } = await supabase.auth.getSession();
			if (!activeSession.session) {
				router.push(`/login`);
			} else {
				const dataBooking: any = {
					room_id: detailRoom?.id,
					from: dataInBill.checkIn,
					to: dataInBill.checkOut,
					total_price: detailRoom?.price * count,
				};
				// await appStore.booking.create(dataBooking);
				await appStore.payment.add(dataBooking)
				// await appStore.resetFilter();
				// window.location.href = "/received";
			}
		};

		return (
			<div className="container flex flex-col h-full justify-center items-center lg:py-[30px]">
				<div className="flex flex-col h-1/2 justify-center items-center lg:py-[20px">
					<h1 className="text-2xl md:text-4xl font-bold mb-10">
						{detailRoom?.id}
					</h1>
					<p className="text-center md:max-w-1/3 break-words">
						The Mountain Room is available with either double or single beds.
						Designed in an open-concept living area, it comes with oversized
						windows and lots of in-room facilities.
					</p>
				</div>
				<hr className="container my-10" />
				<div className="container relative h-[400px] bg-slate-100 flex justify-center items-center">
					{detailRoom && <img
						className="object-cover object-center w-full h-full"
						alt="pic"
						src={detailRoom?.image_url}
					/>}
				</div>
				<hr className="container my-10" />
				<div className="container flex flex-col md:flex-row ">
					<div className="flex-[2]">
						{/**Detail */}
						<div className="flex-col lg:flex-row flex container min-h-[300px] border-[1px] p-5 lg:justify-between">
							<h2 className="flex-[1] text-center text-2xl font-bold">
								Details
							</h2>
							<div className="flex-[3] h-1/3 border-t-[1px] lg:h-full lg:px-10 lg:border-l-[1px] lg:border-t-0">
								<ul>
									<li className="flex my-5 break-words">
										<span className="text-[#767b80] w-1/4">Guest:</span>
										<span className="w-3/4">{detailRoom?.guest}</span>
									</li>
									<li className="flex my-5 break-words">
										<span className="text-[#767b80] w-1/4">Size:</span>
										<span className="w-3/4"> {detailRoom?.size}</span>
									</li>
									<li className="flex my-5 break-words">
										<span className="text-[#767b80] w-1/4">Location:</span>
										<span className="w-3/4">location</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
					{/*Bill */}
					<div className="flex flex-1 justify-center container min-h-[700px] lg:ml-10">
						<div className="flex flex-1 flex-col min-h-[300px] max-h-[600px] border-[1px] p-5 justify-between">
							<div className="flex flex-col justify-center h-1/4 max-h-[100px]">
								<p className="text-xl">
									<span className="text-2xl">
										<strong>€{detailRoom?.price}</strong>
									</span>{" "}
									per Day
								</p>
							</div>
							<hr />
							<div className="h-3/4 flex flex-col justify-between">
								<div className="flex flex-col my-5 ">
									<p className="text-sm font-semibold">Check-in Date*</p>
									{
										<DatePicker
											disabledDate={ValidateCheckIn}
											defaultValue={defaultValueCheckin}
											size="large"
											format="YYYY-MM-DD"
											onChange={(obj, value) => onChangeDateCheckIn(value)}
										/>
									}
								</div>
								<div className="flex flex-col my-5 ">
									<p className="text-sm font-semibold">Check-out Date*</p>
									{
										<DatePicker
											disabledDate={ValidateCheckOut}
											defaultValue={defaultValueCheckOut}
											value={dayjs(`${dataInBill.checkOut}`)}
											size="large"
											format="YYYY-MM-DD"
											onChange={(obj, value) => onChangeDateCheckOut(value)}
											picker="date"
										/>
									}
								</div>
								<div className="my-5 break-word">
									{/* <p className="text-red-500">message error</p> */}
								</div>
								<p className="text-xl my-5">
									<span className="text-2xl">
										<strong>
											€
											{`${dataInBill.checkIn !== ""
												? detailRoom && detailRoom?.price * count
												: detailRoom?.price
												}`}
										</strong>
									</span>{" "}
									for {dataInBill.checkIn !== "" && count} days
								</p>
								{/* <Button onClick={handleOrder}>Order</Button> */}
								<PayPalScriptProvider options={{ clientId: "test" }}>
									<PayPalButtons style={{ layout: "horizontal" }} />
								</PayPalScriptProvider>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	})
);

export default function Page() {
	return <DetailRoom />;
}