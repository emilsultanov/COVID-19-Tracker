import React from "react";
import { Map as LeafleMap, TileLayer } from "react-leaflet";
import { showDataOnMap } from "../util";

function Map({ countries, casesType, center, zoom }) {
	return (
		<div className="map">
			<LeafleMap center={center} zoom={zoom}>
				<TileLayer
					attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{showDataOnMap(countries, casesType)}
			</LeafleMap>
		</div>
	);
}

export default Map;
