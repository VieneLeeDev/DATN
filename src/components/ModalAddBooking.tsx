import React from 'react'

const ModalAddBooking = ({ isOpenModal, toggleModal }: { isOpenModal: boolean, toggleModal: any }) => {
	const handleClick = (e: any) => {
		toggleModal(false)
	}
	return (
		<div onClick={handleClick} className={`${isOpenModal ? `block` : `hidden`} absolute w-full h-full bg-[#1F293B] rounded-xl flex items-center justify-center`}>
			<div onClick={(e) => e.stopPropagation()} className="flex items-center justify-center w-full p-5 bg-white rounded-xl overflow-hidden">
				<div className="w-full h-full rounded-xl font-bold">
					<h2 className="w-full text-center text-2xl">
						Booking Information
					</h2>
					<div className="flex flex-col md:flex-row w-full h-full mt-10 space-y-10 md:space-y-0 md:space-x-10">
						<div className='w-full md:w-1/3 space-y-5'>
							<div className="w-full h-[70px]">
								<label className="h-[35%] text-xl">Check-in date:</label>
								<input className="h-[65%] w-full border-[1px] px-2"></input>
							</div>
							<div className="w-full h-[70px]">
								<label className="h-[35%] text-xl">Check-out date:</label>
								<input className="h-[65%] w-full border-[1px] px-2"></input>
							</div>
							<div className="w-full h-[70px]">
								<label className="h-[35%] text-xl">Price:</label>
								<input className="h-[65%] w-full border-[1px] px-2"></input>
							</div>
						</div>
						<div className='w-full md:w-1/3 space-y-5'>
							<div className="w-full h-[70px]">
								<label className="h-[35%] text-xl">Name Room:</label>
								<select className="h-[65%] w-full border-[1px] px-2"></select>
							</div>
							<div className="w-full h-[70px]">
								<label className="h-[35%] text-xl">User:</label>
								<select className="h-[65%] w-full border-[1px] px-2"></select>
							</div>
						</div>
						<div className='w-full md:w-1/3 space-y-5'>
							<div className="w-full h-[70px]">
								<div className="h-[35%]"></div>
								<button className="h-[65%] w-full bg-blue-800 text-white">Add Booking</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ModalAddBooking