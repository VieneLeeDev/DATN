'use client'
import React, { useMemo } from 'react'
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
const AddressMap = () => {
	const position = { lat: 16.061194, lng: 108.227083 };



	return (
		<div className='h-full w-full box-border overflow-hidden'>
			<APIProvider apiKey={"AIzaSyBPr6njIHSitPRYlroYYBZ1B9eUV_hk4EQ"}>
				<Map defaultCenter={position} defaultZoom={10}>
					<Marker position={position} />
				</Map>
			</APIProvider>
		</div>
	)
}

export default AddressMap