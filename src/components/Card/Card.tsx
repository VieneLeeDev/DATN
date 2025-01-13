"use client";
import styles from './Card.module.css'
import dimensions_icon from '@/assets/icon/dimensions_icon.svg?url'
import bed_icon from '@/assets/icon/bed_icon.svg?url'
import user_icon from '@/assets/icon/user_icon.svg?url'
import Image from 'next/image';
import Link from 'next/link';
import img_room from '@/assets/roomhotel.jpg'
interface CartProps {
	room_name?: string;
	price?: number;
	description?: string;
	img?: string;
	guest?: number;
	size?: string;
	bedNo?: number;
	staticURL?: any
}

const Card = (props: CartProps) => {
	return (
		<section className={`${styles.CardWrapper}`}>
			{props?.staticURL ? <Image src={props?.staticURL} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} alt='background of room' /> : <img src={props?.img ?? ''} width={100} height={100} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} alt='background of room' />}

			<div className='absolute w-[80%] h-[150px] bottom-[30px] '>
				<span className='bg-hoverbtn text-white px-[24px] py-[6px] text-[20px] font-[500] w-[170px] tracking-widest'>From ${props?.price}</span>
				<div className='flex justify-between bg-main_bg h-[100px] text-white p-[24px]'>
					<h3 className='text-[30px] font-cormorant'>{props?.room_name}</h3>
					<div className='flex gap-[20px]'>
						<div className='flex gap-[10px]'>
							<Image
								alt="icon infomation"
								width={20}
								height={20}
								priority
								src={dimensions_icon} />
							<span className='flex justify-center items-center'>{props?.size} m<sup>2</sup></span>
						</div>
						<div className='flex gap-[10px]'>
							<Image
								alt="icon infomation"
								width={20}
								height={20}
								priority
								src={bed_icon} />
							<span className='flex justify-center items-center'>{props?.bedNo} beds</span>
						</div>
						<div className='flex gap-[10px]'>
							<Image
								alt="icon infomation"
								width={20}
								height={20}
								priority
								src={user_icon} />
							<span className='flex justify-center items-center'>{props?.guest} guests</span>
						</div>
					</div>
					<Link href={"./detail-room/?id=1"} className={`inline-block relative bg-main_bg border-white border-[1px] border-solid px-[35px] py-[10px] hover:text-main_bg float-right before:content-[''] before:absolute before:bottom-[-10px] before:left-0 before:w-full before:h-[1px] before:bg-current before:transition-transform before:duration-300 hover:before:bottom-0 hover:bg-white hover:before:origin-center`}>Room details</Link>
				</div>
			</div>
		</section>
	);
};
export default Card;
