"use client";
import "react-datetime/css/react-datetime.css";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import type { RangePickerProps } from "antd/es/date-picker";
import { observer } from "mobx-react-lite";

const { RangePicker } = DatePicker;

const FormSearch = observer(({ appStore }: { appStore: any }) => {
	const handleChangeDate = (obj: any, value: any) => {
		appStore.setDuration(value[0], value[1]);
	};

	// validate datepicker
	const disabledDate: RangePickerProps["disabledDate"] = (current) => {
		return current && current < dayjs().startOf("day");
	};

	return (
		<div className="text-[#909090] hidden container xl:flex xl:mx-auto h-[75px] w-full justify-center" >
			<div className="w-2/3 h-full">
				<h3 className="h-1/3 font-bold "> Check-in & Check-out</h3>
				<div className="w-full h-2/3 ">
					<RangePicker
						className="w-full h-full rounded-none "
						disabledDate={disabledDate}
						onChange={(obj, value) => handleChangeDate(obj, value)}
						format="YYYY-MM-DD"
					/>
				</div>
			</div>
			<div className="flex flex-1 justify-between">
				<div className="flex-1">
					<h3 className="h-1/3 font-bold px-3"> Guest</h3>
					<div className="w-full h-2/3 px-3 bg-white ">
						<select
							className="w-full h-full border-[1px] bg-white"
							value={appStore.filter?.filter_guests}
							onChange={(e) => appStore.setGuests(Number(e.target.value))}
						>
							{appStore.room?.guestList.map((value: any) => (
								<option key={value} value={value}>
									{value}
								</option>
							))}
						</select>
					</div>
				</div>
				{/* <div className="relative flex justify-center items-center w-[150px] h-full">
					<div className="absolute text-white font-bold text-xl flex justify-center items-center bottom-0 w-full h-2/3 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 rounded-md hover:cursor-pointer">
						Search
					</div>
				</div> */}
			</div>
		</div>
	);
});
export default FormSearch;
