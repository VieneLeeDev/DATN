'use client'
import React, { useMemo } from 'react'
import { useLoadScript, GoogleMap } from '@react-google-maps/api';
const AddressMap = () => {

	const libraries = useMemo(() => ['places'], []);
	const mapCenter = useMemo(
		() => ({ lat: 27.672932021393862, lng: 85.31184012689732 }),
		[]
	);

	const mapOptions = useMemo<google.maps.MapOptions>(
		() => ({
			disableDefaultUI: true,
			clickableIcons: true,
			scrollwheel: false,
		}),
		[]
	);

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
		libraries: libraries as any,
	});

	if (!isLoaded) {
		return <p>Loading...</p>;
	}

	return (
		<div className='h-full w-full box-border overflow-hidden'>
			<GoogleMap
				options={mapOptions}
				zoom={14}
				center={mapCenter}
				mapTypeId={google.maps.MapTypeId.ROADMAP}
				mapContainerStyle={{ width: '800px', height: '800px' }}
				onLoad={() => console.log('Map Component Loaded...')}
			/>
		</div>
	)
}

export default AddressMap