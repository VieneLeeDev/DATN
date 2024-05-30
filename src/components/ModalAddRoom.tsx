import React from 'react'

const ModalAddRoom = ({ isOpenModal, toggleModal }: { isOpenModal: boolean, toggleModal: any }) => {
	const handleClick = (e:any) => {
		toggleModal(false)
	}
	return (
		<div onClick={handleClick} className={`${isOpenModal? `block` :`hidden`} absolute w-full h-full bg-[#1F293B] rounded-xl flex items-center justify-center`}>
			<div onClick={(e) => e.stopPropagation()} className="flex items-center justify-center w-full p-5 bg-white rounded-xl overflow-hidden">
				<div className="w-full h-full rounded-xl font-bold">
					<h2 className="w-full text-center text-2xl">
						Room Information
					</h2>
					<div className="flex flex-col md:flex-row w-full h-full mt-10 space-y-10 md:space-y-0 md:space-x-10">
						<div className='w-full md:w-1/3 space-y-5'>
							<div className="w-full h-[70px]">
								<label className="h-[35%] text-xl">Name Room:</label>
								<input className="h-[65%] w-full border-[1px] px-2"></input>
							</div>
							<div className="w-full h-[70px]">
								<label className="h-[35%] text-xl">Hotel:</label>
								<select className="h-[65%] w-full border-[1px] px-2"></select>
							</div>
							<div className="w-full h-[70px]">
								<label className="h-[35%] text-xl">Category:</label>
								<select className="h-[65%] w-full border-[1px] px-2"></select>
							</div>
						</div>
						<div className='w-full md:w-1/3 space-y-5'>
							<div className="w-full h-[70px]">
								<label className="h-[35%] text-xl">Guest:</label>
								<input className="h-[65%] w-full border-[1px] px-2"></input>
							</div>
							<div className="w-full h-[70px]">
								<label className="h-[35%] text-xl">Size:</label>
								<input className="h-[65%] w-full border-[1px] px-2"></input>
							</div>
							<div className="w-full h-[70px]">
								<label className="h-[35%] text-xl">Price:</label>
								<input className="h-[65%] w-full border-[1px] px-2"></input>
							</div>
						</div>
						<div className='w-full md:w-1/3 space-y-5'>
							<div className="w-full h-[70px]">
								<label className="h-[35%] text-xl">Image:</label>
								<input className="h-[65%] w-full border-[1px] p-2"></input>
							</div>
							<button className="mt-2 w-full h-[50px] bg-blue-800 text-white">
								Add room
							</button>
						</div>
					</div>

				</div>
			</div>
		</div>
	)
}

export default ModalAddRoom