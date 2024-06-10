"use client";

import { observer } from "mobx-react-lite";
import { inject } from "mobx-react";
import banner from "@/assets/banner.webp"
import Image from "next/image";
import FormSearch from "@/components/FormSearch";
import room_banner from '@/assets/h1-ab3.webp'
import AddressMap from "@/components/AddressMap";
const HomePage = inject("appStore")(
	observer(({ appStore }: { appStore?: any }) => {
		return (
			<div className="flex flex-col w-full">
				<section className="relative bg-slate-200 w-full min-h-[877px]">
					<div className="absolute z-[1000] top-0 left-0 w-full h-full bg-black opacity-[50%]"></div>
					<Image
						alt="tick SVG"
						className="absolute z-100 w-full h-full object-cover object-center"
						src={banner} ></Image>
					<div className="absolute z-[1100] w-full h-full flex flex-col justify-center items-center ">
						<span className="text-[#CAB7A7] font-[400] text-[24px] uppercase tracking-widest underline leading-6">Carmelina Luxury Hotel & Resort</span>
						<p className="text-white my-[30px] text-[20px] font-[400] text-center line-clamp-2 max-w-[1240px] h-auto">When you get into a hotel room, you lock the door, and you know there is a secrecy, there is a luxury, there is fantasy. There is comfort. There is reassurance.</p>
					</div>
					<div className="absolute z-[1200] bottom-[-75px] w-full">
						<FormSearch />
					</div>
				</section>
				<div className="container mt-[150px] mb-[67px] h-auto w-full">
					<section className="w-full h-auto pr-[10px]">
						<span className="block w-1/2 font-[400] text-hoverbtn text-[24px]">WE ARE THE BEST 5 STAR HOTEL FOR YOU</span>
						<span className="block w-1/2 text-[40px] font-cormorant font-bold">A Boutique Hotel In The Heart of New York</span>
					</section>
					<section className="flex mt-[30px]">
						<div className="w-1/2 pr-[10px]">
							<Image src={room_banner} className="h-[500px] w-full object-cover object-center" alt="exp"></Image>
						</div>
						<div className="w-1/2 pl-[10px]">
							<span className="block leading-[40px] text-[20px] font-cormorant">{`"Our mission as a premier new york hotel is to provide peace of mind, consistency and build loyalty based on the value of our relationships with guests. We strive to be unique and the place you want to come back, Aliquam porttitor sit amet diam non placerat"`}</span>
							<span className="block mt-[20px] text-[#111111] font-bold">{`Dave Bautista – `} <i>General Manager Carmelina Hotel</i></span>
						</div>
					</section>
				</div>
				<div className="flex w-full h-[500px] bg-[#F1EFED] p-[30px]">
					<div className="w-1/2 h-full py-[30px] px-[50px]">
						<span className="block text-[40px] h-1/3 font-bold font-cormorant">How To Find Us?</span>
						<span className="block text-[20px] font-[500]">Melbourne, New York City</span>
						<span className="block my-[10px]">3949 State 38b Rte Newark Valley, New</span>
						<span className="block my-[30px]"><strong>Email</strong>: levien26092k1@gmail.com</span>
						<span className="block text-[20px] font-[500]">Call Us Reservation:</span>
						<span className="block text-[30px] font-[500] my-[10px]">+99 (0) 344 956 4050</span>
					</div>
					<div className="w-1/2 h-full">
						<AddressMap />
					</div>
				</div>
			</div>
		);
	})
);

export default function Page() {
	return <HomePage />;
}
