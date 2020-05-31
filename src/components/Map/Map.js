import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';

import newYorkGeoJson from './data/geojson/new_york.json';

const MAPBOX_ACCESS_TOKEN = `${process.env.REACT_APP_MAP_BOX_KEY}`;
const MAPBOX_STYLE_ID = `${process.env.REACT_APP_MAPBOX_STYLE_ID}`;
const MAPBOX_USERNAME = `${process.env.REACT_APP_MAPBOX_USERNAME}`;
const defaultMap =
	'https://api.mapbox.com/styles/v1/' +
	MAPBOX_USERNAME +
	'/' +
	MAPBOX_STYLE_ID +
	'/tiles/256/{z}/{x}/{y}?access_token=' +
	MAPBOX_ACCESS_TOKEN;

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
		lng: -73.962855463380421,
		lat: 40.713571109780113,
	});
	const [zoom, setZoom] = useState(10);
	const mapRef = useRef(null);

	useEffect(() => {
		console.log(mapRef);
	}, [mapRef]);

	const highlightFeature = (e) => {
		const layer = e.target;

		layer.setStyle({
			weight: 5,
			dashArray: '',
			fillColor: 'red',
			fillOpacity: 0.2,
		});
	};

	const resetHighlight = (e) => {
		const layer = e.target;

		layer.setStyle({
			color: '#c0464c',
			weight: 2,
			fillColor: 'transparent',
			fillOpacity: 1,
		});
	};

	const zoomToFeature = (e) => {
		mapRef.current.leafletElement.fitBounds(e.target.getBounds());
	};

	const onEachFeature = (feature, layer) => {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			click: zoomToFeature,
		});
	};

	return (
		<MapWrapper>
			<Map
				id="map"
				ref={mapRef}
				center={[position.lat, position.lng]}
				zoom={zoom}
			>
				<GeoJSON
					data={newYorkGeoJson}
					style={() => ({
						color: '#c0464c',
						weight: 2,
						fillColor: 'transparent',
						fillOpacity: 1,
					})}
					onEachFeature={onEachFeature}
				/>
				<TileLayer
					attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url={defaultMap}
				/>
			</Map>
		</MapWrapper>
	);
};

export default DefaultMap;
