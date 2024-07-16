'use client';
import SigninForm from "@/components/SigninForm/SigninForm";
import bg_img from "@/assets/login-bg1.jpg"
import Image from "next/image";
import SignupForm from "@/components/SignupForm/SignupForm";
import { useEffect } from "react";
import {  useSearchParams } from "next/navigation";
const Login = () => {
	const searchParams = useSearchParams()
 
	const typeForm = searchParams.get('typeForm')

	return (
		<div className="flex h-screen">
			<div className="flex justify-center align-center w-full lg:w-1/2 h-full">
				{typeForm === "login" ? <SigninForm /> : <SignupForm/>}
			</div>
			<div className="hidden relative lg:block lg:w-1/2">
				<Image src={bg_img} alt="Background login" className="object-cover object-center h-full" />
				<div className="absolute w-full h-full top-0 left-0 flex flex-col justify-center items-center">
					<div className="flex flex-col justify-center w-full h-auto px-[60px]">
						<h2 className="text-white text-[46px] font-cormorant">What do you get as a member?</h2>
						<p className="text-[#EDEDED] text-[16px] leading-7 my-5 font-sans ">Lorem ipsum dolor sit amet, in nam denique suavitate repudiandae, homero dictas omnesque duo et. Novum dignissim consectetuer ei mel. Ne patrioque consequat persequeris usu Lorem ipsum dolor sit amet.</p>
						<span className="inline-flex my-[10px] text-white text-[18px] font-sans uppercase">  <Image src={'./tick-2.svg'} alt="Background login" className="object-cover object-center mr-4 bg-white rounded-[50%] p-1" height={30} width={30} />  CANCEL THE ROOM RIGHT IN MY ACCOUNT </span>
						<span className="inline-flex my-[10px] text-white text-[18px] font-sans uppercase">  <Image src={'./tick-2.svg'} alt="Background login" className="object-cover object-center mr-4 bg-white rounded-[50%] p-1" height={30} width={30} />  EXCLUSIVE OFFER FOR MEMBERS </span>
						<span className="inline-flex my-[10px] text-white text-[18px] font-sans uppercase">  <Image src={'./tick-2.svg'} alt="Background login" className="object-cover object-center mr-4 bg-white rounded-[50%] p-1" height={30} width={30} />  IN-DEPTH EXAMINATION OF TIME INFORMATION </span>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Login;
