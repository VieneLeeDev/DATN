"use client";
import "react-datetime/css/react-datetime.css";
import { Button, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import type { RangePickerProps } from "antd/es/date-picker";
import { observer } from "mobx-react-lite";
import Separate from "./Separate";
import { useEffect, useState } from "react";

const { RangePicker } = DatePicker;

const FormSearch = observer((props: any) => {
	const [duration,setDuration] = useState({
		check_in: dayjs(),
		check_out:dayjs()
	})

	const handleChangeDateCheckin = (obj: any, value: any) => {
		setDuration({...duration,check_in:dayjs(value)});
	};
	const handleChangeDateCheckout = (obj: any, value: any) => {
		setDuration({...duration,check_out:dayjs(value)});
	};
	const handleSearch = () => {
		const formatData = {
			check_in: dayjs(duration.check_in).format("DD/MM/YYYY"),
			check_out: dayjs(duration.check_out).format("DD/MM/YYYY"),
		} 
		console.log(formatData)
	}
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
				<Select popupClassName={"absolute z-[2000]"} style={{ height: "50px" }} ></Select>
			</div>
			<Separate />
			<div className="relative hidden lg:flex h-full flex-col">
				<Button onClick={handleSearch} className="absolute text-white max-w-[150px] xl:w-[150px] bg-hoverbtn h-[50px] font-bold text-[24px] leading-6 bottom-0 hover:!border-hoverbtn hover:!text-hoverbtn">
					Search
				</Button>
			</div>
		</div>
	);
});
export default FormSearch;
