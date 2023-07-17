import React, { useEffect } from "react";
import { useMap } from "react-leaflet";

const GeoJSONLayer = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    const geoJSONLayer = L.geoJSON(data).addTo(map);

    return () => {
      map.removeLayer(geoJSONLayer);
    };
  }, [data, map]);

  return null;
};

export default GeoJSONLayer;
