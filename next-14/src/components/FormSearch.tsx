"use client";
import "react-datetime/css/react-datetime.css";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import type { RangePickerProps } from "antd/es/date-picker";
import { observer } from "mobx-react-lite";
import { appStore } from "@/stores";
import { useEffect, useState } from "react";

const { RangePicker } = DatePicker;

const FormSearch = observer(() => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChangeDate = (obj: any, value: any) => {
    appStore.setDuration(value[0], value[1]);
  };

  // validate datepicker
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < dayjs().endOf("day");
  };

  return (
    <div className="hidden container xl:flex xl:mx-auto h-[75px]" suppressHydrationWarning={true}>
      <div className="w-1/2 h-full">
        <h3 className="text-white h-1/3 font-bold"> Check-in & Check-out</h3>
        <div className="w-full h-2/3 ">
          <RangePicker
            className="w-full h-full rounded-none "
            disabledDate={disabledDate}
            onChange={(obj, value) => handleChangeDate(obj, value)}
            format="YYYY-MM-DD"
          />
        </div>
      </div>
      <div className="flex overflow-hidden w-1/2 h-full">
        <div className="w-1/2 h-full">
          <h3 className="text-white h-1/3 font-bold px-3"> Guest</h3>
          <div className="w-full h-2/3 px-3 bg-white ">
            <select
              className="w-full h-full outline-none bg-white"
              value={appStore.filter.filter_guests}
              onChange={(e) => appStore.setGuests(Number(e.target.value))}
            >
              {isClient &&
                appStore.room.guestList.map((value: any) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="w-1/2 h-full">
          <h3 className="text-white h-1/3 font-bold px-3"> Location</h3>
          <div className="w-full h-2/3 px-3 bg-white ">
            <select
              className="w-full h-full outline-none bg-white"
              onChange={(e) => appStore.setCitys(e.target.value)}
            >
              <option value={""}>all</option>
              {isClient &&
                appStore.room.cityList?.map((value: any) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
});
export default FormSearch;
