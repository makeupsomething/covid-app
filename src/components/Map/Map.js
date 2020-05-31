import React, { useState } from 'react';
import styled from 'styled-components';
import { Map, TileLayer } from 'react-leaflet';

const MapWrapper = styled.div`
	height: 600px;
	width: 800px;

	#map {
		height: 100%;
		width: 100%;
	}
`;

const DefaultMap = () => {
	const [position, setPosition] = useState({
		lat: 51.505,
		lng: -0.09,
	});
	const [zoom, setZoom] = useState(13);

	return (
		<MapWrapper>
			<Map id="map" center={[position.lat, position.lng]} zoom={zoom}>
				<TileLayer
					attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
			</Map>
		</MapWrapper>
	);
};

export default DefaultMap;
