import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useState, useEffect, useRef } from "react";
import CustomMarker from "../CustomMapComponent/CustomMarker";
import Image from "next/image";
import * as turf from "@turf/turf";
import { lineString, bezierSpline } from "@turf/turf";

import mapData from "../../data/countries.json";

import style from "../../styles/Home.module.css";

import eventTest from "../../../Test/eventTest.json";
import allDocumentTest from "../../../Test/documentTest.json";
import manuscriptTest from "../../../Test/manuscriptTest.json";

import { MapContainer, ZoomControl, GeoJSON, useMap } from "react-leaflet";

import { useStore } from "../../../Store/store";

import { useFilterStore } from "../../../Store/filterStore";

import { useDocumentStore } from "../../../Store/documentStore";

export default function Map(open) {
  //PARAMETRI INIZIALI DELLA MAPPA
  const [selectedLatLng, setSelectedLatLng] = useState([22, -10]);
  const [country, setCountry] = useState();
  const [prova, setProva] = useState(style.map);
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

  const isSelectedEvent = useStore((state) => state.isSelectedEvent);
  const setSelectedEvent = useStore((state) => state.setSelectedEvent);
  const deselectEvent = useStore((state) => state.deselectEvent);
  const isSelectedDocument = useStore((state) => state.isSelectedDocument);
  

  
  const setSelectedDocument = useStore((state) => state.setSelectedDocument);

  const events = useFilterStore((state) => state.events);
  const addEvents = useFilterStore((state) => state.addEvents);
  const filterByCountry = useFilterStore((state) => state.filterByCountry);

  //Filtri per eventi tramite store

  const filteredEvents = useFilterStore((state) => state.filteredEvents);
  const setIso = useFilterStore((state) => state.setIso);
  const iso = useFilterStore((state) => state.iso);
  const restoreIso = useFilterStore((state) => state.restoreIso);
  const countrySelected = useFilterStore((state) => state.country);

  //Filtri Documenti tramite Store

  const allDocument = useDocumentStore((state) => state.allDocument);
  const setAllDocument = useDocumentStore((state) => state.setAllDocument);

  useEffect(() => {
    addEvents(eventTest);
    var arrayISO = eventTest.map((oggetto) => oggetto.luogo);
    setIso(arrayISO);
  }, []);

  useEffect(() => {
    setAllDocument(allDocumentTest);
  }, [country]);

  const codice_iso = ["IT", "ES", "US", "AF"];
  const documentType = "manuscript";

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
    if (country.includes(codiceISO_A2)) {
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
      filterByCountry(countryCode);
      console.log(countrySelected + "!!!");
      map.flyTo(center.reverse(), 4.5); // Zoom al centro del paese (puoi regolare il livello di zoom desiderato)
    }
  };

  function Reverse() {
    const map = useMap();

    return (
      <>
        {isSelectedCountry && (
          <a
            className={style.backDivOverlay}
            onClick={() => {
              if (isSelectedCountry && !isSelectedEvent) {
                map.flyTo(selectedLatLng, zoomLevel);
                deselectCountry();
                setCountry();
                restoreIso();
              } else if (isSelectedEvent) {
                deselectEvent();
              } else {
                console.log("Un saluto da Asternox");
              }
            }}
          >
            <Image
              src="/images/back_button.svg"
              alt="Turn Back"
              width={55}
              height={55}
            />
          </a>
        )}
      </>
    );
  }

  return (
    <div className={style.rightView}>
      <div className={style.mapOverlay}></div>
      
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
        {!isSelectedDocument && <Reverse />}
        
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
              position={[event.latitudine, event.longitudine]}
              eventType={event.tipo_evento}
              onClick={() => setSelectedEvent()}
            />
          ))}

        {isSelectedEvent &&
          manuscriptTest.map((document) =>
            documentType === "manuscript" ? (
              <>
                <GeoJSON
                  style={lineStyle}
                  data={bezierSpline(
                    lineString([
                      [document.PuntoPartenzaLng, document.PuntoPartenzaLat],
                      [
                        (document.PuntoPartenzaLng + document.PuntoArrivoLng) /
                          2,
                        (document.PuntoPartenzaLat + document.PuntoArrivoLat) /
                          2 +
                          getRandomValue(),
                      ],
                      [document.PuntoArrivoLng, document.PuntoArrivoLat],
                    ], 5)
                  )}
                />
                <CustomMarker
                  position={[
                    document.PuntoPartenzaLat,
                    document.PuntoPartenzaLng,
                  ]}
                  eventType={"manuscript"}
                />
                <CustomMarker
                  position={[document.PuntoArrivoLat, document.PuntoArrivoLng]}
                  eventType={"manuscript"}
                  onClick={() => setSelectedDocument()}
                />
              </>
            ) : (
              <CustomMarker
                position={[
                  document.PuntoPartenzaLat,
                  document.PuntoPartenzaLng,
                ]}
                eventType={"manuscript"}
              />
            )
          )}

        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  );
}