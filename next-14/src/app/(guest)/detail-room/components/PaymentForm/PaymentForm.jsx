import { Button, DatePicker, Modal, Input, Spin, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import dayjs from "dayjs";
import { inject, observer } from 'mobx-react';
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import TextArea from 'antd/es/input/TextArea';

const PaymentForm = (props) => {
	const { availableBill, onClose, roomOrder, price, dataInBill, resetStore } = props;
	const [description, setDescription] = useState('');

	return (
		<Modal open={availableBill} footer={false} onCancel={onClose} title="Payment Form">
			<div className='m-7'>
				<span className='block my-1'>Room ID:</span>
				<Input
					type="text"
					disabled
					value={roomOrder.id}
					className="mb-2"
				/>
				<span className='block my-1'>Date check-in:</span>
				<Input
					type="text"
					disabled
					value={dataInBill.checkIn}
					className="mb-2"
				/>
				<span className='block my-1'>Date check-out:</span>
				<Input
					type="text"
					disabled
					value={dataInBill.checkOut}
					className="mb-2"
				/>
				<span className='block my-1'>{`Total price (USD):`}</span>
				<Input
					type="text"
					disabled
					value={price}
					className="mb-2"
				/>
				<span className='block my-1'>{`Note:`}</span>
				<TextArea
					aria-multiline
					type="text"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="mb-2"
				/>
				<PayPalScriptProvider>
					<PayPalButtons
						createOrder={async (data, actions) => {
							const res = await fetch("/api/paypal", {
								method: "POST",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify({
									room: [
										{
											id: roomOrder.id,
											check_in: dataInBill.checkIn,
											check_out: dataInBill.checkOut,
											description: description,
											value: price
										},
									],
								}),
							})
							const order = await res.json();
							console.log(order);
							return order.id;
						}}
						onApprove={async (data, actions) => {
							console.log("Approved:", data);
							actions.order.capture();
							await resetStore()
							notification.success({ message: "booking thanh cong" })
						}}
					/>
				</PayPalScriptProvider>
			</div>
		</Modal>
	);
}

export default PaymentForm;
