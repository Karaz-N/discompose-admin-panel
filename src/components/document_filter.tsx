import { useEffect, useState } from "react";
import style from "../styles/DocumentFilter.module.css";
import Image from "next/image";
export default function DocumentFilter() {

  const eventType = [
    "all documents",
    "images",
    "manuscripts",
    "prints",
  ];

  const [selectedItem, setSelectedItem] = useState(0);

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  return (
    <>
      <ul className={style.eventDivOverlay}>
      <li
        className={selectedItem === 0 ? style.item0 : ""}
        onClick={() => handleItemClick(0)}
      >
        {selectedItem === 0 ? (
            <Image
              src="/marker/selected_marker.svg"
              alt="Marker"
              width={14}
              height={14}
            />
          ) : (
            <Image
              src="/marker/selected_marker.svg"
              alt="Marker"
              width={14}
              height={14}
            />
          )}
        {eventType[0].toUpperCase()}
      </li>
      <li
        className={selectedItem === 1 ? style.item1 : ""}
        onClick={() => handleItemClick(1)}
      >
        {selectedItem === 1 ? (
            <Image
              src="/marker/document_marker/selected_image_marker.svg"
              alt="Marker"
              width={14}
              height={14}
            />
          ) : (
            <Image
              src="/marker/document_marker/image_marker.svg"
              alt="Marker"
              width={14}
              height={14}
            />
          )}
        {eventType[1].toUpperCase()}
      </li>
      <li
        className={selectedItem === 2 ? style.item2 : ""}
        onClick={() => handleItemClick(2)}
      >
        {selectedItem === 2 ? (
            <Image
              src="/marker/document_marker/selected_manuscript_marker.svg"
              alt="Marker"
              width={14}
              height={14}
            />
          ) : (
            <Image
              src="/marker/document_marker/manuscript_marker.svg"
              alt="Marker"
              width={14}
              height={14}
            />
          )}
        {eventType[2].toUpperCase()}
      </li>
      <li
        className={selectedItem === 3 ? style.item3 : ""}
        onClick={() => handleItemClick(3)}
      >
        {selectedItem === 3 ? (
            <Image
              src="/marker/document_marker/selected_print_marker.svg"
              alt="Marker"
              width={14}
              height={14}
            />
          ) : (
            <Image
              src="/marker/document_marker/print_marker.svg"
              alt="Marker"
              width={14}
              height={14}
            />
          )}
        {eventType[3].toUpperCase()}
      </li>
    </ul>
    </>
  );
}
