const ModalAddAccount = ({ isOpenModal,toggleModal }: { isOpenModal: boolean, toggleModal: any }) => {
	const handleClick = (e:any) => {
		toggleModal(false)
	}
	return (
		<div onClick={handleClick} className={`${isOpenModal? `block` :`hidden`} absolute w-full h-full bg-[#1F293B] rounded-xl flex items-center justify-center`}>
			<div onClick={(e) => e.stopPropagation()} className="flex items-center justify-center w-full p-5 md:max-w-[600px] bg-white rounded-xl overflow-hidden">
				<div className="w-full h-full rounded-xl font-bold">
					<h2 className="w-full text-center text-2xl">
						Sign up	as administrator
					</h2>
					<div className="space-y-5 w-full h-full my-10">
						<div className="w-full h-[70px]">
							<label className="h-[35%] text-xl">Email</label>
							<input className="h-[65%] w-full border-[1px] px-2" placeholder="use@gmail.com"></input>
						</div>
						<div className="w-full h-[70px]">
							<label className="h-[35%] text-xl">Password</label>
							<input type="password" className="h-[65%] w-full border-[1px] px-2"></input>
						</div>
						<div className="w-full h-[70px]">
							<label className="h-[35%] text-xl">Confirm password</label>
							<input className="h-[65%] w-full border-[1px] px-2"></input>
						</div>
						<div className="w-full h-[70px]">
							<label className="h-[35%] text-xl">Role</label>
							<select className="h-[65%] w-full border-[1px] px-2">
								<option>User</option>
								<option>Admin</option>
							</select>
						</div>
					</div>
					<button className="w-full h-[50px] bg-blue-800 text-white">
						Sign up
					</button>
				</div>
			</div>
		</div>
	)
}

export default ModalAddAccount