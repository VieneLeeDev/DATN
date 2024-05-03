import React from 'react'

const ModalAddHotel = ({ isOpenModal, toggleModal }: { isOpenModal: boolean, toggleModal: any }) => {
	const handleClick = (e:any) => {
		toggleModal(false)
	}
	return (
		<div onClick={handleClick} className={`${isOpenModal? `block` :`hidden`} absolute w-full h-full bg-[#1F293B] rounded-xl flex items-center justify-center`}>
			<div onClick={(e) => e.stopPropagation()} className="flex items-center justify-center w-full p-5 bg-white rounded-xl overflow-hidden">
				<div className="w-full h-full rounded-xl font-bold">
					<h2 className="w-full text-center text-2xl">
						Hotel Information
					</h2>
					<div className="flex flex-col md:flex-row w-full h-full mt-10 space-y-10 md:space-y-0 md:space-x-10">
						<div className='w-full md:w-1/2 space-y-5'>
							<div className="w-full h-[70px]">
								<label className="h-[35%] text-xl">Name Hotel</label>
								<input className="h-[65%] w-full border-[1px] px-2"></input>
							</div>
							<div className="w-full h-[70px]">
								<label className="h-[35%] text-xl">City</label>
								<input type="password" className="h-[65%] w-full border-[1px] px-2"></input>
							</div>
							<div className="w-full h-[70px]">
								<label className="h-[35%] text-xl">Address</label>
								<input className="h-[65%] w-full border-[1px] px-2"></input>
							</div>
						</div>
						<div className='w-full md:w-1/2 space-y-5'>
							<div className="w-full h-[70px]">
								<label className="h-[35%] text-xl">Email</label>
								<input className="h-[65%] w-full border-[1px] px-2"></input>
							</div>
							<div className="w-full h-[70px]">
								<label className="h-[35%] text-xl">Telephone</label>
								<input className="h-[65%] w-full border-[1px] px-2"></input>
							</div>
							<div className="h-[140px] w-full">
								<label className="h-[35%] text-xl">Description</label>
								<textarea className="h-[65%] w-full border-[1px] px-2 font-normal" />
							</div>
							<button className="mt-2 w-full h-[50px] bg-blue-800 text-white">
								Add hotel
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ModalAddHotel