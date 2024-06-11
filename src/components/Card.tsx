"use client";
import Image from "next/image";
import Icons from './icon_room.svg'

interface CartProps {
	name: string;
	price: number;
	description?: string;
	img: string;
	guest: string;
	size: string
}

const Card = (props: CartProps) => {
	return (
		<section className="border-[2px] rounded-lg overflow-hidden hover:opacity-80 hover:cursor-pointer duration-100 h-full">
			<div className="w-full h-[200px]">
				<img className="w-full h-full object-center object-cover" src={props.img || ''} alt="pic" />
			</div>
			<div className="w-full h-[250px] py-6 px-4">
				<div className="border-b-[2px] border-solid my-[5px] gap-[10px]">
					<span className="text-2xl font-bold text-[#312d2d]">{props.name}</span>
					<span className="block text-lg font-bold text-[#757171] my-[5px]">{props.guest}</span>
				</div>
				<div className="flex justify-between border-b-[2px] border-solid my-[5px] gap-[10px] text-2xl font-bold text-[#312d2d]">
					<span className="block">Price:</span>
					<span className="block">${props.price}</span>
				</div>
				<div className="overflow-hidden line-clamp-4">
					<span>{props.description}</span>
				</div>
			</div>
		</section>
	);
};
export default Card;
