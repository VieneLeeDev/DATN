"use client";

import { observer } from "mobx-react-lite";
import FormSearch from "@/components/FormSearch";
import Link from "next/link";
import Card from "@/components/Card";
import { inject } from "mobx-react";
import { toJS } from "mobx";
const HomePage = inject("appStore")(
	observer(({ appStore }: { appStore?: any }) => {
		return (
			<div className="flex flex-col w-full">
				<div className="flex justify-center items-center relative w-full h-[800px] box-border">
					<video className=" max-h-full min-w-full object-cover" autoPlay loop muted src={require('../../../public/travel.mp4')} />
					<div className="w-full h-full  bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 absolute z-5 opacity-30"></div>
					<div className="absolute z-10 flex flex-col items-center justify-center text-white w-full">
						<div className="w-2/3">
							<span className="text-2xl font-bold">Our packages</span>
							<span className="block text-6xl font-bold mb-[30px] mt-[15px]">Search for your Holiday</span>
							<div className="flex justify-center items-center w-full h-[100px] bg-white p-2 rounded-lg" >
								<FormSearch appStore={appStore} />
							</div>
						</div>
					</div>
				</div>
				<div className="container mx-auto px-5 md:px-0">
					{/**products */}
					<div className="my-20">
						<div className="flex flex-col md:flex-row justify-between my-10">
							<div className="text-left text-[#3b4249]">
								<h2 className="text-2xl font-bold uppercase">most visited destinations</h2>
							</div>
						</div>
						<div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center">
							{appStore.room?.itemsFiltered.map((room: any) => (
								<Link
									className="w-full h-full"
									key={room.id}
									href={{
										pathname: `/detail-room`,
										query: { id: room.id },
									}}
								>
									<Card
										name={`${room.id}`}
										description={room.description}
										price={room.price}
										city={room.hotel?.location}
										img={room.image_url}
										guest={`${room.guest} peoples `}
										size={` ${room.size}`}
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
