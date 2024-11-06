import Card from '@/components/Card/Card'
import { supabase } from '@/utils/supabaseClient'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
const Roomlist = () => {
	const [data, setData] = useState<any[]>([])

	const initPage = async () => {
		let roomLists: any[] = []
		const { data } = await supabase.from("room").select("*")
		data?.forEach((room: any, index: number) => index <= 5 && roomLists.push(room))
		setData(roomLists)
	}
	useEffect(() => {
		initPage()
	}, [])

	return (
		<div className={`md:container w-full h-auto`}>
			<section className='w-full flex flex-col md:flex-row py-[30px] gap-5'>
				<section className='w-full md:w-1/2'>
					<span className='block uppercase text-hoverbtn text-[16px]'>our rooms</span>
					<span className='block font-cormorant text-[50px]'>Luxurious and Comfortable Space</span>
				</section>
				<section className='w-full md:w-1/2'>
					<p className='leading-8 text-[16px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum feugiat et erat vel sollicitudin. Aenean nec hendrerit turpis. Aliquam malesuada mauris magna. Aliquam vitae velit id sem volutpat malesuada. Fusce blandit magna sed odio posuere aliquet. Nullam a ultricies diam.</p>
					<Link className={`inline-block relative hover:text-hoverbtn float-right before:content-[''] before:absolute before:bottom-0 before:w-full before:h-[1px] before:bg-current before:transition-transform before:duration-300 hover:before:scale-x-0 hover:before:origin-center `} href={'./list-room'}>View All Rooms</Link>
				</section>
			</section>
			<section className='w-full py-[30px]'>
				<Swiper
					autoplay={{
						delay: 5000,
						disableOnInteraction: false,
					}}
					pagination={{
						clickable: true,
					}}
					scrollbar={{ draggable: true }}
					navigation={true}
					modules={[Autoplay, Pagination, Navigation,]}
				>
					<SwiperSlide><Card /></SwiperSlide>
					<SwiperSlide><Card /></SwiperSlide>
					<SwiperSlide><Card /></SwiperSlide>
					<SwiperSlide><Card /></SwiperSlide>
				</Swiper>
			</section>
		</div>
	)
}

export default Roomlist