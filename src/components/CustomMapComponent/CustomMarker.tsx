import { Marker } from "react-leaflet";
import L from "leaflet";

const CustomMarker = ({ position, eventType, onClick }) => {
  let iconUrl;
  let iconSize = [18, 18]; // Dimensioni predefinite per l'icona

  // Seleziona l'icona in base alla tipologia dell'evento
  switch (eventType) {
    case "eartchquacke":
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
      iconUrl = "/marker/document_marker/image_marker.svg";
      break;
    case "manuscript":
      iconUrl = "/marker/document_marker/manuscript_marker.svg";
      break;
    case "print":
      iconUrl = "/marker/document_marker/print_marker.svg";
      break;
    default:
      iconUrl = "/marker/earthquake_marker.svg";
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
      position={position}
      icon={customIcon}
      eventHandlers={eventHandlers}
    />
  );
};

export default CustomMarker;
