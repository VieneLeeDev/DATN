'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import banner from "@/assets/banner.webp"
import FormSearch from '@/components/FormSearch'
import Card from '@/components/Card/Card'
import { supabaseClient } from '@/utils/supabase/client'

const ListRoom = () => {
	const [listRooms, setListRoom] = useState<any[]>([])
	const initPage = async () => {
		try {
			const { data } = await supabaseClient.from('room').select("*")
			setListRoom(data ?? [])
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		initPage()
	}, [])

	return (
		<>
			<div className="flex flex-col w-full">
				<section className="relative bg-slate-200 w-full min-h-[877px]">
					<div className="absolute z-[1000] top-0 left-0 w-full h-full bg-black opacity-[50%]"></div>
					<Image
						alt="tick SVG"
						className="absolute z-100 w-full h-full object-cover object-center"
						src={banner} ></Image>
					<div className="absolute z-[1100] w-full h-full flex flex-col justify-center items-center ">
						<span className="text-center font-[400] text-[20px] text-[#CAB7A7] md:font-[400] md:text-[24px] uppercase tracking-widest underline leading-6">Hercules Luxury Hotel & Resort</span>
						<p className="text-white my-[30px] text-[20px] font-[400] text-center md:line-clamp-2 max-w-[1240px] h-auto">When you get into a hotel room, you lock the door, and you know there is a secrecy, there is a luxury, there is fantasy. There is comfort. There is reassurance.</p>
					</div>
					<div className="absolute z-[1200] bottom-[-75px] w-full">
						<FormSearch />
					</div>
				</section>
				<div className='mt-[100px] w-full h-fit flex flex-col gap-[30px] container mb-[30px]'>
					{listRooms?.map((room) => {
						return <div key={room?.id} className='w-full rounded-[10px] overflow-hidden h-[450px] shadow-default'>
							<Card bedNo={room?.bed_number} description={room?.description} img={room?.img} guest={room?.guest} price={room?.price} room_name={room?.room_name} size={room?.size} />
						</div>
					})}
				</div>
			</div>
		</>
	)
}

export default ListRoom