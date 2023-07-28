import { useEffect, useState } from "react";
import style from "../styles/DocumentFilter.module.css";
import Image from "next/image";
import { useDocumentStore } from "../../Store/documentStore";
export default function DocumentFilter() {
  const filteredManuscriptCount = useDocumentStore(
    (state) => state.filteredManuscriptCount
  );
  const filteredPrintCount = useDocumentStore(
    (state) => state.filteredPrintCount
  );
  const filteredImageCount = useDocumentStore(
    (state) => state.filteredImageCount
  );

  const selectedManuscript = useDocumentStore((state) => state.selectedManuscript);
  const selectedPrint = useDocumentStore((state) => state.selectedPrint);
  const selectedImage = useDocumentStore((state) => state.selectedImage);
  const deselectFilter = useDocumentStore((state) => state.deselectFilter);

  const eventType = ["all documents", "images", "manuscripts", "prints"];

  const [selectedItem, setSelectedItem] = useState(0);

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  return (
    <>
      <ul className={style.eventDivOverlay}>
        <li
          className={selectedItem === 0 ? style.item0 : ""}
          onClick={() => {
            handleItemClick(0);
            deselectFilter();
          }}
        >
          {selectedItem === 0 ? (
            <Image
            
              src="/marker/document_marker/selected_image_marker.svg"
              alt="Marker"
              width={16}
              height={16}
            />
          ) : (
            <Image
              src="/marker/document_marker/image_marker.svg"
              alt="Marker"
              width={16}
              height={16}
            />
          )}
          {"(" + (filteredImageCount + filteredManuscriptCount + filteredPrintCount) + ")"}
          {eventType[0].toUpperCase()}
        </li>
        <li
          className={selectedItem === 1 ? style.item1 : ""}
          onClick={() => {
            handleItemClick(1);
            selectedImage();
          }}
        >
          {selectedItem === 1 ? (
            <Image
              src="/marker/document_marker/selected_image_marker.svg"
              alt="Marker"
              width={16}
              height={16}
            />
          ) : (
            <Image
              src="/marker/document_marker/image_marker.svg"
              alt="Marker"
              width={16}
              height={16}
            />
          )}
          {"(" + filteredImageCount + ")"}
          {eventType[1].toUpperCase()}
        </li>
        <li
          className={selectedItem === 2 ? style.item2 : ""}
          onClick={() => {
            handleItemClick(2);
            selectedManuscript();
          }}
        >
          {selectedItem === 2 ? (
            <Image
              src="/marker/document_marker/selected_manuscript_marker.svg"
              alt="Marker"
              width={16}
              height={16}
            />
          ) : (
            <Image
              src="/marker/document_marker/manuscript_marker.svg"
              alt="Marker"
              width={16}
              height={16}
            />
          )}
          {"(" + filteredManuscriptCount + ")"}
          {eventType[2].toUpperCase()}
        </li>
        <li
          className={selectedItem === 3 ? style.item3 : ""}
          onClick={() => {
            handleItemClick(3);
            selectedPrint();
          }}
        >
          {selectedItem === 3 ? (
            <Image
              src="/marker/document_marker/selected_print_marker.svg"
              alt="Marker"
              width={16}
              height={16}
            />
          ) : (
            <Image
              src="/marker/document_marker/print_marker.svg"
              alt="Marker"
              width={16}
              height={16}
            />
          )}
          {"(" + filteredPrintCount + ")"}
          {eventType[3].toUpperCase()}
        </li>
      </ul>
    </>
  );
}
