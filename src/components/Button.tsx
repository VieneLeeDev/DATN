import React from "react";

interface ButonProps {
	children: React.ReactNode,
	onClick: () => void
}
const Button = ({ children,onClick }: ButonProps) => {
	return (
		<div onClick={onClick} className="relative flex justify-center items-center w-[150px] h-[100px]">
			<div className="absolute text-white font-bold text-xl flex justify-center items-center bottom-0 w-full h-2/3 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 rounded-md hover:cursor-pointer">
				{children}
			</div>
		</div>
	);
};
export default Button;
