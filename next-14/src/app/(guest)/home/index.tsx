"use client";
import Cart from "../../../components/ui/Cart/Cart";
import FormSearch from "../../../components/ui/FormSearch/FormSearch";
import { useEffect, useState } from "react";
import Link from "next/link";
import { observer } from 'mobx-react-lite';
import { RoomStore, roomStore} from "../../../stores/room/RoomStore";
import { toJS } from "mobx";
import { HotelStore, hotelStore } from "../../../stores/hotel/HotelStore";
const Home = observer(() => {
  const [date,setDate] = useState({
    dateCheckIn: "",
    dateCheckOut:""
  })

 const handleSearchGuest = (dataSearch: any) => {
  roomStore.setFilterGuest(dataSearch)
 }
 const handleSearchCity = (dataSearch: any) => {
  roomStore.setFilterCity(dataSearch)
 }
 const handleSetDateTime = (dataDateTime: any) => {
  setDate({...dataDateTime})
 }

  return (
    <div className="flex flex-col w-full">
      <div className="w-full flex items-center h-[500px] bg-center bg-cover bg-[url('https://themes.getmotopress.com/booklium-default/wp-content/uploads/sites/29/2019/08/Slide-2.jpg')]">
        <FormSearch setDateTime={handleSetDateTime} dataRoom={roomStore.rooms} startSearchGuest={handleSearchGuest} dataHotel={hotelStore.hotels} startSearchCity={handleSearchCity}/>
      </div>
      <div className="container mx-auto px-5 md:px-0">
        {/**products */}
        <div className="my-20">
          <div className="flex flex-col md:flex-row justify-between my-10">
            <div className="text-left text-[#3b4249]">
              <h2 className="text-2xl font-bold">Home around the world</h2>
              <p>
                Villas can be a perfect place for you to spend the most
                unforgettable vacation!
              </p>
            </div>
          </div>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 place-items-center">
            {/* {loading ? <Loading /> : null} */}
             {roomStore.roomsAvailable.map((product: any) => (
              <Link 
              className="w-full h-full" key={product.id} 
              href={{
                pathname:`/detailroom/${product.id}`,
                query: {...date}
              }}>
              <Cart
                name={`${product.id} | ${product.guest} peoples | ${product.size} - ${hotelStore.hotelName.find((hotel) => hotel.id === product.hotel_id)?.name}`}
                description={product.description}
                price={product.price}
                city={`${hotelStore.hotelName.find((hotel) => hotel.id === product.hotel_id)?.city}`}
                img={product.image_url}
              /></Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
export default Home;
