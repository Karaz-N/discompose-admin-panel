import { useEffect, useState } from "react";
import style from "../styles/EventFilter.module.css";
import Image from "next/image";

import { useFilterStore } from "../../Store/filterStore";

export default function EventFilter() {
  const eventType = [
    "all events",
    "earthquake",
    "hurricane",
    "flood",
    "eruption",
  ];

  const [selectedItem, setSelectedItem] = useState(0);

  const [showCheck, setShowCheck] = useState(false);

  const events = useFilterStore((state) => state.events);
  const filterByType = useFilterStore((state) => state.filterByType);
  const restoreEvents = useFilterStore((state) => state.restoreEvents);

  const filteredEvents = useFilterStore((state) => state.filteredEvents);
  const temporaryFilteredEvents = useFilterStore(
    (state) => state.temporaryFilteredEvents
  );

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  useEffect(() => {
    if(window.innerWidth <= 834){
      setShowCheck(true);
      console.log("runno")
    }
  }, [])

  addEventListener("resize", (event) => {
    if(!showCheck){
      if(window.innerWidth <= 834){
        setShowCheck(true);
      }
    }else{
      if(window.innerWidth > 834){
        setShowCheck(false);
      }
    }
  });
  

  return (
    <>
    <input  id={`${showCheck ? style.togg : style.displayCheck}`} type="checkbox"/>
      <ul className={style.eventDivOverlay}>
        <li
          className={selectedItem === 0 ? style.item0 : ""}
          onClick={() => {
            handleItemClick(0);
            restoreEvents();
          }}
          onKeyUp={() => {
            handleItemClick(0);
            restoreEvents();
          }}
        >
          {selectedItem === 0 ? (
            <Image
              src="/marker/selected_marker.svg"
              alt="Marker"
              width={16}
              height={16}
            />
          ) : (
            <Image
              src="/marker/all_marker.svg"
              alt="Marker"
              width={16}
              height={16}
            />
          )}
          {`(${temporaryFilteredEvents.length})`}
          {eventType[0].toUpperCase()}
        </li>
        <li
          className={selectedItem === 1 ? style.item1 : ""}
          onClick={() => {
            handleItemClick(1);
            filterByType(eventType[1].toUpperCase());
          }}
          onKeyUp={() => {
            handleItemClick(1);
            filterByType(eventType[1].toUpperCase());
          }}
        >
          {selectedItem === 1 ? (
            <Image
              src="/marker/selected_marker.svg"
              alt="Marker"
              width={16}
              height={16}
            />
          ) : (
            <Image
              src="/marker/earthquake_marker.svg"
              alt="Marker"
              width={16}
              height={16}
            />
          )}
          {`(${
            temporaryFilteredEvents.filter(
              (evento) => evento.type === eventType[1].toUpperCase()
            ).length
          })`}
          {eventType[1].toUpperCase()}
        </li>
        <li
          className={selectedItem === 2 ? style.item2 : ""}
          onClick={() => {
            handleItemClick(2);
            filterByType(eventType[2].toUpperCase());
          }}
          onKeyUp={() => {
            handleItemClick(2);
            filterByType(eventType[2].toUpperCase());
          }}
        >
          {selectedItem === 2 ? (
            <Image
              src="/marker/selected_marker.svg"
              alt="Marker"
              width={16}
              height={16}
            />
          ) : (
            <Image
              src="/marker/hurricane_marker.svg"
              alt="Marker"
              width={16}
              height={16}
            />
          )}
          {`(${
            temporaryFilteredEvents.filter(
              (evento) => evento.type === eventType[2].toUpperCase()
            ).length
          })`}
          {eventType[2].toUpperCase()}
        </li>
        <li
          className={selectedItem === 3 ? style.item3 : ""}
          onClick={() => {
            handleItemClick(3);
            filterByType(eventType[3].toUpperCase());
          }}
          onKeyUp={() => {
            handleItemClick(3);
            filterByType(eventType[3].toUpperCase());
          }}
        >
          {selectedItem === 3 ? (
            <Image
              src="/marker/selected_marker.svg"
              alt="Marker"
              width={16}
              height={16}
            />
          ) : (
            <Image
              src="/marker/flood_marker.svg"
              alt="Marker"
              width={16}
              height={16}
            />
          )}
          {`(${
            temporaryFilteredEvents.filter(
              (evento) => evento.type === eventType[3].toUpperCase()
            ).length
          })`}
          {eventType[3].toUpperCase()}
        </li>
        <li
          className={selectedItem === 4 ? style.item4 : ""}
          onClick={() => {
            handleItemClick(4);
            filterByType(eventType[4].toUpperCase());
          }}
          onKeyUp={() => {
            handleItemClick(4);
            filterByType(eventType[4].toUpperCase());
          }}
        >
          {selectedItem === 4 ? (
            <Image
              src="/marker/selected_marker.svg"
              alt="Marker"
              width={16}
              height={16}
            />
          ) : (
            <Image
              src="/marker/eruption_marker.svg"
              alt="Marker"
              width={16}
              height={16}
            />
          )}
          {`(${
            temporaryFilteredEvents.filter(
              (evento) => evento.type === eventType[4].toUpperCase()
            ).length
          })`}
          {eventType[4].toUpperCase()}
        </li>
      </ul>
    </>
  );
}
