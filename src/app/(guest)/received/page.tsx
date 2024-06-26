"use client";
import { observer } from "mobx-react-lite";
import { inject } from "mobx-react";
import React, { useEffect, useState } from "react";
import { toJS } from "mobx";
import { Spin } from "antd";

const Received = inject("appStore")(
	observer(({ appStore }: { appStore?: any }) => {
		const [isLoading, setIsLoading] = useState(false)
		return (
			<Spin spinning={isLoading}>
				<div className="flex flex-col container ">
					<h1 className="text-center text-4xl font-bold h-[100px] my-10">
						Reservation Received
					</h1>
					<hr className="my-[50px]"></hr>
					<div className="container break-words text-[#3b4249] text-lg font-semibold my-5">
						We are pleased to inform you that your reservation request has been
						received.
					</div>
					{/**Booking details */}
					<h3 className="text-xl font-bold ">Booking Details</h3>
					{appStore.booking.items.map((booking: any) => (
						<div
							key={booking.id}
							className="container flex flex-col h-auto border-[1px] my-[25px] p-10 shadow-md"
						>
							<div className="flex container h-auto ">
								<ul className="flex container my-[10px] flex-col md:flex-row ">
									<li className="flex flex-[2] flex-col mb-5 mr-10  md:border-r-[1px] md:border-dashed md:border-[#d3ced2]">
										<span className="text-lg text-[#3b4249]">Booking:</span>
										<span className="font-bold text-[#3b4249]">{`${booking.id}`}</span>
									</li>
									<li className="flex flex-1 flex-col mb-5 mr-10  md:border-r-[1px] md:border-dashed md:border-[#d3ced2]">
										<span className="text-lg text-[#3b4249]">Room:</span>
										<span className="font-bold text-[#3b4249]">{`${booking.room_id}`}</span>
									</li>
									<li className="flex flex-1 flex-col mb-5 mr-10  md:border-r-[1px] md:border-dashed md:border-[#d3ced2] break-words max-w-[350px]">
										<span className="text-lg text-[#3b4249]">Check-in:</span>
										<span className="font-bold text-[#3b4249]">
											{booking.from}
										</span>
									</li>
									<li className="flex flex-1 flex-col mb-5 mr-10  md:border-r-[1px] md:border-dashed md:border-[#d3ced2] break-words max-w-[350px]">
										<span className="text-lg text-[#3b4249]">Check-out:</span>
										<span className="font-bold text-[#3b4249]">{booking.to}</span>
									</li>
									<li className="flex flex-1 flex-col mb-5 mr-10  md:border-r-[1px] md:border-dashed md:border-[#d3ced2]">
										<span className="text-lg text-[#3b4249]">Total:</span>
										<span className="font-bold text-[#3b4249]">{`€${booking.total_price}`}</span>
									</li>
									<li className="flex flex-1 mb-5 mr-10">
										<button
											onClick={() => booking.delete()}
											className="text-lg text-[#3b4249] bg-slate-200 w-full"
										>
											Remove
										</button>
									</li>
								</ul>
							</div>
						</div>
					))}
				</div>
			</Spin>
		);
	})
);

export default function Page() {
	return <Received />;
}
