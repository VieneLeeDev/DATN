"use client";
import {observer} from 'mobx-react-lite';
import FormSearch from "@/components/ui/FormSearch/FormSearch";
import Link from "next/link";
import Card from "@/components/Card";
import {appStore} from "@/stores";

const HomePage = observer(() => {
    const handleSetDateTime = (dataDateTime: any) => {
        appStore.setDuration(dataDateTime.dateCheckIn, dataDateTime.dateCheckOut);
    }

    return (
        <div className="flex flex-col w-full">
            <div
                className="w-full flex items-center h-[500px] bg-center bg-cover bg-[url('https://themes.getmotopress.com/booklium-default/wp-content/uploads/sites/29/2019/08/Slide-2.jpg')]">
                <FormSearch
                    setDateTime={handleSetDateTime}
                    // startSearchGuest={handleSearchGuest}
                    dataRoom={[]}
                    dataHotel={[]}
                    startSearchCity={[]}
                />
                <select value={appStore.filter_guests} onChange={(e) => appStore.setGuests(Number(e.target.value))}>
                    {appStore.room.guestList.map((value: any) => <option key={value} value={value}>{value}</option>)}
                </select>
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
                    <div
                        className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 place-items-center">
                        {/* {loading ? <Loading /> : null} */}
                        {appStore.room.itemsFiltered.map((room: any) => (
                            <Link
                                className="w-full h-full" key={room.id}
                                onClick={() => appStore.room.pickItem(room)}
                                href={{
                                    pathname: `/room-selected`,
                                }}>
                                <Card
                                    name={`${room.id} | ${room.guest} peoples | ${room.size} - ${room.hotel?.name}`}
                                    description={room.description}
                                    price={room.price}
                                    city={room.hotel?.city}
                                    img={room.image_url}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default HomePage;