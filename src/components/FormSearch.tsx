"use client";
import "react-datetime/css/react-datetime.css";
import { Button, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import type { RangePickerProps } from "antd/es/date-picker";
import { observer } from "mobx-react-lite";
import Separate from "./Separate";
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'
const { RangePicker } = DatePicker;

const FormSearch = observer((props: any) => {

	const router = useRouter()
	const search = useSearchParams()

	const [duration, setDuration] = useState({
		check_in: dayjs(),
		check_out: dayjs()
	})
	console.log(search.get('check-in'),search.get('check-out'))
	const handleChangeDateCheckin = (obj: any, value: any) => {
		setDuration({ ...duration, check_in: dayjs(value) });
	};
	const handleChangeDateCheckout = (obj: any, value: any) => {
		setDuration({ ...duration, check_out: dayjs(value) });
	};
	const handleSearch = useCallback(() => {
		const paramsSearchDuration = new URLSearchParams(search)
		const formatData = {
			check_in: dayjs(duration.check_in).format("DD/MM/YYYY"),
			check_out: dayjs(duration.check_out).format("DD/MM/YYYY"),
		}
		paramsSearchDuration.set("check-in",formatData.check_in)
		paramsSearchDuration.set("check-out",formatData.check_out)

		router.push(`./list-room?${paramsSearchDuration.toString()}`)
	},[duration])
	const optionsGuest = [{ key: 1, value: 1 }, { key: 2, value: 2 }, { key: 3, value: 3 }, { key: 4, value: 4 }, { key: 5, value: 5}]
	return (
		<div className="relative container md:flex md:mx-auto md:h-[150px] w-full bg-white rounded-xl py-[34px] items-center border-b-[1px]">
			<div className="flex flex-col w-full md:w-1/4 ">
				<span className="text-hoverbtn font-bold uppercase">Check-in:</span>
				<DatePicker disabledDate={(date) => dayjs(date).isBefore(dayjs())} onChange={handleChangeDateCheckin} popupClassName={"absolute z-[2000]"} className="w-full my-2 h-[50px]" />
			</div>
			<Separate />
			<div className="flex flex-col w-full md:w-1/4 ">
				<span className="text-hoverbtn font-bold uppercase">Check-out:</span>
				<DatePicker disabledDate={(date) => dayjs(date).isBefore(dayjs(duration.check_in))} onChange={handleChangeDateCheckout} popupClassName={"absolute z-[2000]"} className="w-full my-2 h-[50px]" />
			</div>
			<Separate />
			<div className="flex flex-col w-full md:w-1/4">
				<span className="text-hoverbtn font-bold uppercase">Guests:</span>
				<Select options={optionsGuest} popupClassName={"absolute z-[2000]"} style={{ height: "50px" }} ></Select>
			</div>
			<Separate />
			<div className="relative hidden md:flex h-full flex-col md:w-1/4 lg:w-fit">
				<Button onClick={handleSearch} className="absolute text-white max-w-[150px] xl:w-[150px] bg-hoverbtn h-[50px] font-bold text-[24px] leading-6 bottom-0 hover:!border-hoverbtn hover:!text-hoverbtn">
					Search
				</Button>
			</div>
			<div className="absolute left-[40%] bottom-[-25px] flex md:hidden h-full flex-col">
				<Button onClick={handleSearch} className="absolute text-white max-w-[150px] xl:w-[150px] bg-hoverbtn h-[50px] font-bold text-[24px] leading-6 bottom-0 hover:!border-hoverbtn hover:!text-hoverbtn">
					Search
				</Button>
			</div>
		</div>
	);
});
export default FormSearch;
