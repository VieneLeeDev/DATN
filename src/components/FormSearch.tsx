"use client";
import "react-datetime/css/react-datetime.css";
import { Button, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import type { RangePickerProps } from "antd/es/date-picker";
import { observer } from "mobx-react-lite";
import Separate from "./Separate";

const { RangePicker } = DatePicker;

const FormSearch = observer((props: any) => {
	// const handleChangeDate = (obj: any, value: any) => {
	// 	appStore.setDuration(value[0], value[1]);
	// };

	// // validate datepicker
	// const disabledDate: RangePickerProps["disabledDate"] = (current) => {
	// 	return current && current < dayjs().startOf("day");
	// };

	return (
		<div className="relative hidden container xl:flex xl:mx-auto h-[150px] w-full bg-white rounded-xl px-[50px] py-[34px] items-center border-b-[1px]">
			<div className="flex flex-col w-1/4 ">
				<span className="text-hoverbtn font-bold uppercase">Check-in:</span>
				<DatePicker popupClassName={"absolute z-[2000]"} className="w-full my-2 h-[50px]" format={'DD MM YYYY'} />
			</div>
			<Separate />
			<div className="flex flex-col w-1/4 ">
				<span className="text-hoverbtn font-bold uppercase">Check-out:</span>
				<DatePicker popupClassName={"absolute z-[2000]"} className="w-full my-2 h-[50px]" format={'DD MM YYYY'} />
			</div>
			<Separate />
			<div className="flex flex-col w-1/4">
				<span className="text-hoverbtn font-bold uppercase">Guests:</span>
				<Select popupClassName={"absolute z-[2000]"}  style={{height:"50px"}} ></Select>
			</div>
			<Separate />
			<div className="relative h-full flex flex-col w-auto">
				<Button className="absolute text-white bg-hoverbtn w-[150px] h-[50px] font-bold text-[24px] leading-6 bottom-0 hover:!border-hoverbtn hover:!text-hoverbtn">
					Search
				</Button>
			</div>
		</div>
	);
});
export default FormSearch;
