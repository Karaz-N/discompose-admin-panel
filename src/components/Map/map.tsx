import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useState } from "react";
import CustomMarker from "../CustomMapComponent/CustomMarker";
import DocumentMarker from "../CustomMapComponent/DocumentMarker";
import Image from "next/image";
import * as turf from "@turf/turf";

import mapData from "../../data/countries.json";

import style from "../../styles/Home.module.css";

import { MapContainer, ZoomControl, GeoJSON, useMap } from "react-leaflet";

import { useStore } from "../../../Store/store";

import { useFilterStore } from "../../../Store/filterStore";

import { useDocumentStore } from "../../../Store/documentStore";

export default function Map() {
  //PARAMETRI INIZIALI DELLA MAPPA
  const [selectedLatLng, setSelectedLatLng] = useState([22, -10]);
  const [country, setCountry] = useState<string | undefined>();
  const zoomLevel = 2.5;

  //Colors of Countries
  const includedCountries = "#A92820";
  const notIncludedCountries = "white";
  const selectedCountries = "#D8D8D8";

  const defaultBorder = "#6E6E6E";
  const selectedBorder = "#D8D8D8";

  //REFERENCE MAPPA

  const setSelectedCountry = useStore((state) => state.setSelectedCountry);
  const isSelectedCountry = useStore((state) => state.isSelectedCountry);
  const deselectCountry = useStore((state) => state.deselectCountry);
  const setSidebarVisible = useStore((state) => state.setSidebarVisible);

  const isSelectedEvent = useStore((state) => state.isSelectedEvent);
  const setSelectedEvent = useStore((state) => state.setSelectedEvent);
  const deselectEvent = useStore((state) => state.deselectEvent);
  const isSelectedDocument = useStore((state) => state.isSelectedDocument);
  const filterByCountry = useFilterStore((state) => state.filterByCountry);

  //Filtri per eventi tramite store

  const filteredEvents = useFilterStore((state) => state.filteredEvents);
  const iso = useFilterStore((state) => state.iso);
  const restoreIso = useFilterStore((state) => state.restoreIso);
  const countrySelected = useFilterStore((state) => state.country);
  const setTrace = useFilterStore((state) => state.setTraceType);

  //Filtri Documenti tramite Store
  const setFilter = useDocumentStore((state) => state.setFilter);
  const setSelectedEventData = useDocumentStore(
    (state) => state.setSelectedEventData
  );
  const filteredManuscript = useStore((state) => state.filteredManuscript);

  const sidebarOpen = useStore((state) => state.sidebarOpen);

  const stileGeoJSON = (feature) => {
    const codiceISO_A2 = feature.properties.ISO_A2; // Presume che la proprietà "iso_a2" nella GeoJSON contenga i codici ISO_A2 dei paesi
    if (iso.includes(codiceISO_A2)) {
      return {
        fillColor: includedCountries,
        fillOpacity: 1,
        color: defaultBorder,
        weight: 0.5,
      };
    } else {
      // Stile per i paesi non presenti nell'array, vuoti o con colorazione predefinita
      return {
        fillColor: notIncludedCountries,
        fillOpacity: 0.1,
        color: defaultBorder,
        weight: 0.5,
      };
    }
  };

  const stileGeoJsonSelected = (feature) => {
    const codiceISO_A2 = feature.properties.ISO_A2; // Presume che la proprietà "iso_a2" nella GeoJSON contenga i codici ISO_A2 dei paesi
    if (country?.includes(codiceISO_A2)) {
      return {
        fillColor: selectedCountries,
        fillOpacity: 1,
        color: selectedBorder,
        weight: 0.5,
      };
    } else {
      // Stile per i paesi non presenti nell'array, vuoti o con colorazione predefinita
      return {
        fillColor: notIncludedCountries,
        fillOpacity: 0.1,
        color: defaultBorder,
        weight: 0.5,
      };
    }
  };

  //---------PROVA---------

  const lineStyle = {
    color: "#323232",
    weight: 2,
    opacity: 1,
    dashArray: "4, 5",
  };

  function getRandomValue() {
    return Math.random() < 0.5 ? -1 : 1;
  }

  //-------------------------

  const handleCountryClick = (event) => {
    const country = event.target;
    const countryCode = country.feature.properties.ISO_A2;
    if (countrySelected.includes(countryCode)) {
      const center = turf.centroid(country.feature.geometry).geometry
        .coordinates;
      const map = country._map;
      setCountry(countryCode);
      setSelectedCountry();
      filterByCountry(countryCode.toLowerCase());
      console.log(countrySelected + "!!!");
      map.flyTo(center.reverse(), 4.5); // Zoom al centro del paese (puoi regolare il livello di zoom desiderato)
    }
  };

  function Reverse() {
    const map = useMap();

    return (
      <>
        {isSelectedCountry && (
          <button
            type="button"
            className={style.backDivOverlay}
            onClick={() => {
              if (isSelectedCountry && !isSelectedEvent) {
                map.flyTo(selectedLatLng, zoomLevel);
                deselectCountry();
                setCountry();
                restoreIso();
              } else if (isSelectedEvent) {
                deselectEvent();
                setSidebarVisible(false);
              } else {
                console.log("Un saluto da Asternox");
              }
            }}
          >
          </button>
        )}
      </>
    );
  }

  const handleMapDoubleClick = (e) => {
    // Previeni lo zoom sulla doppia pressione
    e.originalEvent.preventDefault();
  };

  return (
    <div className={style.rightView}>
      <div className={style.mapOverlay} />

      <MapContainer
        className={style.map}
        center={selectedLatLng}
        zoom={zoomLevel}
        zoomControl={false}
        scrollWheelZoom={false}
        style={{
          position: "relative",
          zIndex: 0,
        }}
      >
        {!isSelectedDocument && !sidebarOpen && <Reverse />}

        <GeoJSON
          key={countrySelected}
          style={country ? stileGeoJsonSelected : stileGeoJSON}
          data={mapData.features}
          onEachFeature={(feature, layer) => {
            layer.on({
              click: handleCountryClick,
            });
          }}
        />

        {isSelectedCountry &&
          country &&
          !isSelectedEvent &&
          filteredEvents.map((event) => (
            <CustomMarker
            key={event.id}
              position={[event.place.latitude, event.place.longitude]}
              eventType={event.type.toLowerCase()}
              onClick={() => {
                setSelectedEvent();
                setFilter(event.id, event);
                setSelectedEventData(event);
                setTrace(event.type.toLowerCase());
              }}
            />
          ))}

        {isSelectedEvent && <DocumentMarker />}

        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  );
}
