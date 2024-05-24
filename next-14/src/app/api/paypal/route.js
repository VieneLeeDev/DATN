import paypal from '@paypal/checkout-server-sdk';
import { message } from 'antd';
import { NextResponse } from 'next/server';

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export async function POST(requestparam) {
	const dataBill = await requestparam.json(); // Parsing the request body

	const request = new paypal.orders.OrdersCreateRequest();
	request.requestBody({
		intent: "CAPTURE",
		purchase_units: [
			{
				amount: {
					currency_code: "USD",
					value: dataBill.room[0].value
				},
				description: dataBill.room[0].description || `No description`
			}
		]
	});

	try {
		const response = await client.execute(request);
		return NextResponse.json({
			id: response.result.id
		});
	} catch (error) {
		console.error('Error executing PayPal request:', error); // Log any errors
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
