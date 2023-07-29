import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

import style from "../../styles/Home.module.css";

const Mappa = ({ children }) => {
	return (
		<MapContainer
			className={style.map}
			center={[48.8566, 2.3522]}
			zoom={4}
			zoomControl={false}
			scrollWheelZoom={false}
			style={{
				position: "relative",
				zIndex: 0,
			}}
		>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot; target=&quot;_blank&quot; rel=&quot;noopener noreferrer&quot;>OpenStreetMap</a> contributors"
			/>
			{children}
		</MapContainer>
	);
};

export default Mappa;
