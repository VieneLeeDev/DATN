"use client";
import styles from './Card.module.css'
import dimensions_icon from '@/assets/icon/dimensions_icon.svg?url'
import bed_icon from '@/assets/icon/bed_icon.svg?url'
import user_icon from '@/assets/icon/user_icon.svg?url'
import Image from 'next/image';
interface CartProps {
	room_name?: string;
	price?: number;
	description?: string;
	img?: string;
	guest?: string;
	size?: string
}

const Card = (props: CartProps) => {
	return (
		<section className={`${styles.CardWrapper}`}>
			<img style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} src="https://demo.7iquid.com/carmelina/wp-content/uploads/2023/04/king-bed-room-1170x620.jpg" alt='background of room' />
			<div className='absolute w-[80%] h-[150px] bottom-[30px] '>
				<span className='bg-hoverbtn text-white px-[24px] py-[6px] text-[20px] font-[500] w-[170px] tracking-widest'>From $150</span>
				<div className='flex justify-between bg-main_bg h-[100px] text-white p-[24px]'>
					<h3 className='text-[30px] font-cormorant'>King Bed Room</h3>
					<div className='flex gap-[20px]'>
						<div className='flex gap-[10px]'>
							<Image
								alt="icon infomation"
								width={20}
								height={20}
								priority
								src={dimensions_icon} />
							<span className='flex justify-center items-center'>30 m<sup>2</sup></span>
						</div>
						<div className='flex gap-[10px]'>
							<Image
								alt="icon infomation"
								width={20}
								height={20}
								priority
								src={bed_icon} />
							<span className='flex justify-center items-center'>2 beds</span>
						</div>
						<div className='flex gap-[10px]'>
							<Image
								alt="icon infomation"
								width={20}
								height={20}
								priority
								src={user_icon} />
							<span className='flex justify-center items-center'>4 guests</span>
						</div>
					</div>
					<button className={`inline-block relative bg-main_bg border-white border-[1px] border-solid px-[35px] py-[10px] hover:text-main_bg float-right before:content-[''] before:absolute before:bottom-[-10px] before:left-0 before:w-full before:h-[1px] before:bg-current before:transition-transform before:duration-300 hover:before:bottom-0 hover:bg-white hover:before:origin-center`}>Room details</button>
				</div>
			</div>
		</section>
	);
};
export default Card;
