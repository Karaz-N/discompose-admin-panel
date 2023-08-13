import { Marker } from "react-leaflet";
import L from "leaflet";
import style from "../../styles/Marker.module.css";
import { useFilterStore } from "../../../Store/filterStore";

const CustomMarker = ({ position, eventType, onClick }) => {
	let iconUrl;
	let iconSize = [18, 18]; // Dimensioni predefinite per l'icona

	const trace = useFilterStore((state) => state.traceType);

	// Seleziona l'icona in base alla tipologia dell'evento
	switch (eventType) {
		case "earthquake":
			iconUrl = "/marker/earthquake_marker.svg";
			break;
		case "flood":
			iconUrl = "/marker/flood_marker.svg";
			break;
		case "eruption":
			iconUrl = "/marker/eruption_marker.svg";
			break;
		case "hurricane":
			iconUrl = "/marker/hurricane_marker.svg";
			break;
		case "image":
			iconUrl = `/marker/document_marker/image_marker_variant_${trace}.svg`;
			iconSize = [16, 16];
			break;
		case "manuscript":
			iconUrl = `/marker/document_marker/manuscript_marker_variant_${trace}.svg`;
			iconSize = [16, 16];
			break;
		case "print":
			iconUrl = `/marker/document_marker/print_marker_variant_${trace}.svg`;
			iconSize = [16, 16];
			break;
		case "selected_earthquake":
			iconUrl = "/marker/animated_icon/animated_earthquake.gif";
			iconSize = [30, 30];
			break;
		case "selected_flood":
			iconUrl = "/marker/animated_icon/animated_flood.gif";
			iconSize = [30, 30];
			break;
		case "selected_eruption":
			iconUrl = "/marker/animated_icon/animated_eruption.gif";
			iconSize = [30, 30];
			break;
		case "selected_fire":
			iconUrl = "/marker/animated_icon/animated_eruption.gif";
			iconSize = [30, 30];
			break;
		case "selected_hurricane":
			iconUrl = "/marker/animated_icon/animated_hurricane.gif";
			iconSize = [30, 30];
			break;
		default:
			iconUrl = "/marker/eruption_marker.svg";
	}

	const customIcon = new L.Icon({
		iconUrl,
		iconSize,
	});

	const eventHandlers = {
		click: () => {
			if (onClick) {
				onClick();
			}
		},
	};

	return (
		<Marker
			key={`${eventType}${position.latitude}${position.longitude}`}
			icon={customIcon}
			position={position}
			eventHandlers={eventHandlers}
		/>
	);
};

export default CustomMarker;
