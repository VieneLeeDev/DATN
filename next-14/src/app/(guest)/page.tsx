"use client";

import { observer } from "mobx-react-lite";
import FormSearch from "@/components/FormSearch";
import Link from "next/link";
import Card from "@/components/Card";
import { inject } from "mobx-react";
import { supabase } from "@/utils/supabaseClient";
import { useEffect, useState } from "react";

const HomePage = inject("appStore")(
  observer(({ appStore }: { appStore?: any }) => {
    const [dataBooking, setDataBooking] = useState<any[]>();

    useEffect(() => {
      const getDataFromView = async () => {
        const { data } = await supabase.from("booking_view").select("*");
        data && setDataBooking([...data]);
      };
      getDataFromView();
    }, []);
    return (
      <div className="flex flex-col w-full">
        <div className="w-full flex items-center h-[500px] bg-center bg-cover bg-[url('https://images.unsplash.com/photo-1682685797828-d3b2561deef4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
          <FormSearch appStore={appStore} />
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
              {appStore.room?.itemsFiltered.map((room: any) => (
                <Link
                  className="w-full h-full"
                  key={room.id}
                  // onClick={() => appStore.room?.pickItem(room)}
                  href={{ pathname: `/detail/${room.id}`, query: {...room} }}
                >
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
  })
);

export default function Page() {
  return <HomePage />;
}
