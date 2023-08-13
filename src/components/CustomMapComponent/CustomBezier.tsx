import { useEffect, useState } from "react";
import * as turf from "@turf/turf";
import { lineString, bezierSpline, bezier } from "@turf/turf";
import { GeoJSON, Polyline } from "react-leaflet";
import L from "leaflet";
import ReactLeafletDriftMarker from "react-leaflet-drift-marker";
import { useFilterStore } from "../../../Store/filterStore";

const CustomBezier = ({
	startLatitude,
	startLongitude,
	endLatitude,
	endLongitude,
	isAnimated,
}) => {
	/*CSS for the bezier curve */
	const lineStyle = {
		color: "#323232",
		weight: 2,
		opacity: 1,
		dashArray: "4, 5",
	};

	const trace = useFilterStore((state) => state.traceType);

	/*All preliminar data for the construction of the bezier curve */
	const controlPoint = [
		[startLongitude, startLatitude],
		[
			(startLongitude + endLongitude) / 2,
			(startLatitude + endLatitude) / 2 + 5,
		],
		[endLongitude, endLatitude],
	];

	const endPoint = [[endLongitude, endLatitude]];

	/*Operations for refinishing the bezier curve */

	// Calcola i punti intermedi della curva di Bezier manualmente
	const getBezierCurveCoordinates = (points, resolution) => {
		const [p0, p1, p2] = points;
		const coordinates = [];

		for (let t = 0; t <= 1; t += resolution) {
			const x =
				Math.pow(1 - t, 2) * p0[1] +
				2 * (1 - t) * t * p1[1] +
				Math.pow(t, 2) * p2[1];
			const y =
				Math.pow(1 - t, 2) * p0[0] +
				2 * (1 - t) * t * p1[0] +
				Math.pow(t, 2) * p2[0];
			coordinates.push([y, x]);
		}

		return coordinates;
	};

	// Calcola i punti intermedi della curva di Bezier con una risoluzione di 0.01
	const path = {
		type: "LineString",
		coordinates: getBezierCurveCoordinates(controlPoint, 0.01),
	};

	const [index, setindex] = useState(0);

	useEffect(() => {
		setTimeout(() => {
			setindex((index + 1) % path.coordinates.length);
		}, 50);
	});

	let iconUrl;
	const iconSize = [12, 12]; // Dimensioni predefinite per l'icona

	const customIcon = new L.Icon({
		iconUrl: `/marker/path_marker/path_${trace}_marker.svg`,
		iconSize,
	});

	return (
		<>
			<GeoJSON style={lineStyle} data={path} />
			{isAnimated && (
				<ReactLeafletDriftMarker
					position={[path.coordinates[index][1], path.coordinates[index][0]]}
					duration={5}
					icon={customIcon}
				/>
			)}
		</>
	);
};

export default CustomBezier;
