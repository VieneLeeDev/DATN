"use client";
import { Hotel } from "@/app/constants/hotels";
import { Room } from "@/app/constants/rooms";
import { useEffect, useState } from "react";
import "react-datetime/css/react-datetime.css";
import hotels from "../../../api/hotels/hotels.json"
import rooms from "../../../api/rooms/rooms.json"
import { DatePicker } from "antd";
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs'; 
import type { RangePickerProps } from 'antd/es/date-picker';
import { roomStore } from "@/app/stores/room/RoomStore";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
interface FormSearchProps {
  dataRoom?: any[];
  startSearchGuest?: any;
  dataHotel?: any[];
  setDateTime?: any; 
  startSearchCity?: any;
  store?:any
}
type RangeValue = [Dayjs | null, Dayjs | null] | null;
const { RangePicker } = DatePicker;
 
const FormSearch = observer( ({ dataRoom, startSearchGuest,dataHotel,setDateTime,startSearchCity }: FormSearchProps) => {
  // const [citySearch, setCitySearch] = useState<string[]>([])
  // const [guestSearch, setGuestSearch]=useState<number[]>([])

  const [dateSearch,setDateSearch] = useState({
    dateCheckIn: "",
    dateCheckOut:""
  })
  const [dataFormSearch, setDataFormSearch] = useState({
    guest: "All",
    location: "All",
  });

  const handleChangeDate = (obj: any,value:any) =>{
    setDateSearch({dateCheckIn:value[0],dateCheckOut:value[1]})
  }  
  
  //filter and clean duplicate data in array
  const getUnitData = (array: any) => {
   const result = array.filter((product:any, index:any)=> array.indexOf(product) === index)
   return result
  }

  // sort array number asc
  const sortNumber = (array: any) => {
    const result = array
    for(let i = 0; i < result.length; i++){
      for(let j = i + 1; j < result.length;j++){
        if (result[j] <= result[i]) {
          let remain = array[i];
          array[i] = array[j]
          array[j] = remain
        }
      }
    }
    return result
  } 

  //clean data guest
  const clean = dataRoom?.map((room) => room.guest)
  const unit = getUnitData(clean)
  const cleanUnit = sortNumber(unit)
  const guestList: any[] = cleanUnit

  //clean data city
  const pickHotel = dataHotel?.filter((hotel) => dataRoom?.find((room) => room.hotel_id === hotel.id))
  const pickCity = pickHotel?.map((hotel) =>hotel.city)
  const unitCity = getUnitData(pickCity)


  const handleChangeGuest = (e: any) => {
    const value = e.target.value
    if(value !== "All"){
      const numberGuest = Number(e.target.value)
      startSearchGuest(numberGuest)
    }
    else{
      startSearchGuest(1)
    }
  }

  const handleChangeLocation = (e:any) => {
    const value = e.target.value
    const cityName = value
      startSearchCity(cityName)
  }

  // useEffect(() =>{
    //filter product based on data from form search (guest & location) 
    // const productsFiltered = dataRoom?.filter((room: Room) => (dataFormSearch.guest === "All" ? true: room.guest > Number(dataFormSearch.guest) || room.guest === Number(dataFormSearch.guest) ) && (dataFormSearch.location === "All" ? true : dataHotel?.find((hotel: any) => hotel.id_hotel === room.id_hotel).city === dataFormSearch.location));
    // startSearch(productsFiltered);

    //focus guest to filter
    // if(dataFormSearch.location !== "All"){
    //   const filterHotel = dataHotel?.filter((hotel: Hotel) => hotel.city === dataFormSearch.location)
    //   const filterGuest = dataRoom?.filter((room: Room) => filterHotel?.find((hotel: Hotel) => hotel.id_hotel === room.id_hotel))
    //   const cleanGuest = filterGuest?.map((item: Room) => item.guest)
    //   setGuestSearch(getUnitData(sortNumber(cleanGuest)))
    // }
    // else {
    //   const dataGuest = dataRoom?.map((room: Room) => room.guest)
    //   setGuestSearch(getUnitData(sortNumber(dataGuest)))
    // }

    // focus city to filter 
  //   if(dataFormSearch.guest !== "All"){
  //     let unitRooms
  //     const filterRoom = dataRoom?.filter((room: Room) => room.guest > Number(dataFormSearch.guest) || room.guest === Number(dataFormSearch.guest))
  //     filterRoom ? unitRooms = (getUnitData(filterRoom)):null
  //     const filterHotel = dataHotel?.filter((hotel: Hotel) => filterRoom?.find((room) => hotel.id_hotel === room.id_hotel))
  //     if(filterHotel){
  //       let unitHotel = getUnitData(filterHotel.map((hotel) => hotel.city))
  //       setCitySearch(unitHotel)
  //     }
  //   }
  //   else{
  //     let cities
  //     const dataCity = dataHotel?.map((hotel: Hotel) => hotel.city)
  //     if(dataCity){
  //       cities = getUnitData(dataCity)
  //       setCitySearch(cities)
  //     }
  //   }
  // },[dataFormSearch])

  //search date time check-in/check-out
  useEffect(() => {
    setDateTime(dateSearch)
  },[dateSearch.dateCheckOut])
  
  // validate datepicker 
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
   return current && current < dayjs().endOf('day');
  };

  return (
    <div className="hidden container xl:flex xl:mx-auto h-[75px]">
      <div className="w-1/2 h-full">
        <h3 className="text-black h-1/3 font-bold"> Check-in & Check-out</h3>
        <div className="w-full h-2/3 ">
    <RangePicker
      className="w-full h-full rounded-none "
      disabledDate={disabledDate}
      onChange={(obj,value) => handleChangeDate(obj,value)}
      format="MM-DD-YYYY"
    />
        </div>
      </div>
      <div className="flex overflow-hidden w-1/2 h-full">
      <div className="w-1/2 h-full">
        <h3 className="text-black h-1/3 font-bold px-3"> Guest</h3>
        <div className="w-full h-2/3 px-3 bg-white ">
        <select
          className="w-full h-full outline-none bg-white"
          onChange={(value) => handleChangeGuest(value)}
        >
          <option value={"All"}>All</option>
          {guestList.map((guest: number,index:number) => <option key={index} value={guest}>{guest}</option>)}
        </select>
        </div>
      </div>
      <div className="w-1/2 h-full">
        <h3 className="text-black h-1/3 font-bold px-3"> Location</h3>
        <div className="w-full h-2/3 px-3 bg-white ">
        <select
          className="w-full h-full outline-none bg-white"
          onChange={handleChangeLocation}
        >
          <option value={"All"}>All</option>
          {unitCity.map((hotel: any,index:number) => <option key={index} value={hotel}>{hotel}</option>)}
        </select>
        </div>
      </div>
      </div>
    </div>
  );
});
export default FormSearch;
