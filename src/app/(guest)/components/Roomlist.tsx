import Card from '@/components/Card'
import Link from 'next/link'
import React from 'react'

const Roomlist = () => {
	const data = [1, 2, 3, 4, 5, 6, 7, 8]
	return (
		<div className='container w-full h-auto'>
			<section className='w-full flex py-[30px]'>
				<section className='w-1/2'>
					<span className='block uppercase text-hoverbtn text-[16px]'>our rooms</span>
					<span className='block font-cormorant text-[50px]'>Luxurious and Comfortable Space</span>
				</section>
				<section className='w-1/2'>
					<p className='leading-8 text-[16px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum feugiat et erat vel sollicitudin. Aenean nec hendrerit turpis. Aliquam malesuada mauris magna. Aliquam vitae velit id sem volutpat malesuada. Fusce blandit magna sed odio posuere aliquet. Nullam a ultricies diam.</p>
					<Link className={`inline-block relative hover:text-hoverbtn float-right before:content-[''] before:absolute before:bottom-0 before:w-full before:h-[1px] before:bg-current before:transition-transform before:duration-300 hover:before:scale-x-0 hover:before:origin-center `} href={'#'}>View All Rooms</Link>
				</section>
			</section>
			<section className='w-full py-[30px] gap-5 grid grid-cols-3 grid-rows-2'>
				{data.map((item) => <Card guest='1' img='https://demo.7iquid.com/carmelina/wp-content/uploads/2024/02/h1-ab3.webp' name='Example' price={1} size={`1`} description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum feugiat et erat vel sollicitudin. Aenean nec hendrerit turpis. Aliquam malesuada mauris magna. Aliquam vitae velit id sem volutpat malesuada. Fusce blandit magna sed odio posuere aliquet. Nullam a ultricies diam.' key={item} />)}
			</section>
		</div>
	)
}

export default Roomlist