import Image from 'next/image'
import React from 'react'

const ServiceCard = () => {
	return (
		<section className='flex flex-col md:flex-row gap-5 w-full lg:h-[400px]'>
			<div className='flex flex-col gap-5 w-full md:w-1/3 h-full border-[1px]'>
				<div className={`flex items-center justify-center bg-[#AA998A] w-1/4 min-w-[100px] h-[100px] mx-auto`}>
					<Image
						width={60}
						height={60}
						alt='icon service'
						src={'/protect.svg'}
					></Image>
				</div>
				<span className='uppercase font-cormorant text-[20px] text-center my-[22px]'>
					Keeping you safe
				</span>
				<p className='px-[20px] text-center text-[#777777]'>
					The wellbeing of our guests and staff is of paramount importance. Our Covid-19 strategy includes deep cleaning rooms between guests and leaving rooms vacant for at least 24 hours for safety
				</p>
			</div>
			<div className='flex flex-col gap-5 w-full md:w-1/3 h-full border-[1px]'>
				<div className={`flex items-center justify-center bg-[#AA998A] w-1/4 min-w-[100px] h-[100px] mx-auto`}>
					<Image
						width={60}
						height={60}
						alt='icon service'
						src={'/hotel-door.svg'}
					></Image>
				</div>
				<span className='uppercase font-cormorant text-[20px] text-center my-[22px]'>
					Cancellation within 24h
				</span>
				<p className='px-[20px] text-center text-[#777777]'>
					We understand that sometimes things do not go to plan. You can book your stay with confidence with our 24 hour cancellation policy. Cancellations are available on bookings up to 24 hours</p>
			</div>
			<div className='flex flex-col gap-5 w-full md:w-1/3 h-full border-[1px]'>
				<div className={`flex items-center justify-center bg-[#AA998A] w-1/4 min-w-[100px] h-[100px] mx-auto`}>
					<Image
						width={60}
						height={60}
						alt='icon service'
						src={'/hotel-bed.svg'}
					></Image>
				</div>
				<span className='uppercase font-cormorant text-[20px] text-center my-[22px]'>
					Full room amenities
				</span>
				<p className='px-[20px] text-center text-[#777777]'>
					Our rooms are designed to give you maximum comfort and independence. You’ll find a microwave, fridge freezer, kettle and teas and coffees in every room. Our reception will bring plates and cutlery
				</p>
			</div>
		</section>
	)
}

export default ServiceCard