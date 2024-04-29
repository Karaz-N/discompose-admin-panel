import { useEffect, useState } from "react";
import Image from "next/image";

import style from "../styles/Sidebar.module.css";

import Modal from "./modal";

import { useStore } from "../../Store/store";
import { useDocumentStore } from "../../Store/documentStore";
import { Image as ImageType, Manuscript, Print, Place } from "@prisma/client";
import { type } from "os";

type ImageData = ImageType & { place: Place };
type ManuscriptData = Manuscript & { to?: Place; from: Place };
type PrintData = Print & { place: Place };

export default function Sidebar() {
  const setDeselectedDocument = useStore(
    (state) => state.setDeselectedDocument
  );

  const [mobileSide, setMobileSide] = useState(false);

  const isSelectedDocument = useStore((state) => state.isSelectedDocument);
  const sidebarVisible = useStore((state) => state.sidebarVisible);
  const setSidebarVisible = useStore((state) => state.setSidebarVisible);

  const filteredPrintFromMap = useDocumentStore(
    (state) => state.filteredPrintFromMap
  );
  const filteredImageFromMap = useDocumentStore(
    (state) => state.filteredImageFromMap
  );
  const filteredManuscriptFromMap = useDocumentStore(
    (state) => state.filteredManuscriptFromMap
  );
  const filteredManuscript = useDocumentStore(
    (state) => state.filteredManuscript
  );
  const filteredImage = useDocumentStore((state) => state.filteredImage);

  const eventData = useDocumentStore((state) => state.event);

  const sidebarOpen = useStore((state) => state.sidebarOpen);
  const setSidebarOpen = useStore((state) => state.setSidebarOpen);

  const sidebarContainerClass = sidebarOpen
    ? style.sidebarContainerOpen
    : style.sidebarContainerClosed;
  const sidebarClass = sidebarOpen ? style.sidebarOpen : style.sidebarClosed;

  const [isModalOpen, setModalOpen] = useState(false);
  const [doc, setDoc] = useState<ManuscriptData | PrintData | ImageData | undefined>(
    undefined
  );

  const concatenated = filteredImageFromMap.concat(filteredPrintFromMap);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <aside className={`${style.mobileSidebar} ${sidebarOpen ? style.mobileOpen : style.mobileClose}`}>
        <Image
          src="http://localhost:3000/assets/sidebar/decorations_UpSx.webp"
          alt="Decoration"
          width={80}
          height={80}
          className={`${style.decorationTL} ${sidebarOpen ? style.decorationShow : style.decorationHide}`}
        />
        <Image
          src="http://localhost:3000/assets/sidebar/decorations_UpDx.webp"
          alt="Decoration"
          width={80}
          height={80}
          className={`${style.decorationTR} ${sidebarOpen ? style.decorationShow : style.decorationHide}`}
        />
        <Image
          src="http://localhost:3000/assets/sidebar/decorations_CenterSx.webp"
          alt="Decoration"
          width={28}
          height={100}
          className={`${style.decorationCL} ${sidebarOpen ? style.decorationShow : style.decorationHide}`}
        />
        <Image
          src="http://localhost:3000/assets/sidebar/decorations_CenterDx.webp"
          alt="Decoration"
          width={28}
          height={100}
          className={`${style.decorationCR} ${sidebarOpen ? style.decorationShow : style.decorationHide}`}
        />
        <Image
          src="http://localhost:3000/assets/sidebar/decorations_BottomSx.webp"
          alt="Decoration"
          width={80}
          height={80}
          className={`${style.decorationBL} ${sidebarOpen ? style.decorationShow : style.decorationHide}`}
        />
        <Image
          src="http://localhost:3000/assets/sidebar/decorations_BottomDx.webp"
          alt="Decoration"
          width={80}
          height={80}
          className={`${style.decorationBR} ${sidebarOpen ? style.decorationShow : style.decorationHide}`}
        />
        <div className={`${style.sidebarMobileInner}`}>
          <h2>
            {`${filteredImageFromMap.length +
              filteredPrintFromMap.length +
              filteredManuscriptFromMap.length
              } DOCUMENTS IN ${concatenated.length > 0
                ? concatenated[0].place.name.toUpperCase()
                : filteredManuscriptFromMap[0]?.from.name.toUpperCase() ??
                filteredManuscriptFromMap[0]?.to.name.toUpperCase()
              }`}
          </h2>
          <p>
            {`RELATED TO ${eventData.type
              } IN ${eventData.place.name.toUpperCase()}`}
          </p>

          <button
            type="button"
            className={style.mobileCloseButton}
            onClick={() => {
              setSidebarOpen(!sidebarOpen);
            }}
          >
            <Image
              className={`${style.mobileCloseButtonImg} ${sidebarOpen ? "" : style.mobileOpenSideImg}`}
              src={"http://localhost:3000/assets/sidebar/closeSidebar.webp"}
              width={11}
              height={20}
              alt="Close Sidebar"
            />
          </button>

          {(doc !== undefined) && <Modal isOpen={isModalOpen} onClose={closeModal} data={doc} />}
          <ul className={style.contentContainer}>
            {filteredImageFromMap.map((image) => (
              <>
                <li
                  className={style.contentItem}
                  onClick={() => { openModal(); setDoc(image) }}
                  onKeyUp={() => { openModal(); setDoc(image) }}
                >
                  <p>{`Image from ${image.author}`}</p>
                  <div className={style.contentItemDetails}>
                    <p>{image.author}</p>
                    <p>{image.date}</p>
                  </div>
                </li>
              </>
            ))}
            {filteredManuscriptFromMap.map((manuscript) => (
              <>
                <li
                  className={style.contentItem}
                  onClick={() => { openModal(); setDoc(manuscript) }}
                  onKeyUp={() => { openModal(); setDoc(manuscript) }}
                >
                  <p>{`Manuscript from ${manuscript.author}`}</p>
                  <div className={style.contentItemDetails}>
                    <p>{manuscript.author}</p>
                    <p>{manuscript.writtenAt}</p>
                  </div>
                </li>
              </>
            ))}
            {filteredPrintFromMap.map((print) => (
              <>
                <li
                  className={style.contentItem}
                  onClick={() => { openModal(); setDoc(print) }}
                  onKeyUp={() => { openModal(); setDoc(print) }}
                >
                  <p>{`Print from ${print.author}`}</p>
                  <div className={style.contentItemDetails}>
                    <p>{print.author}</p>
                    <p>{print.year}</p>
                  </div>
                </li>
              </>
            ))}
          </ul>
        </div>
      </aside>


      <aside className={`${style.sidebar} ${sidebarClass}`}>
        <div className={`${style.sidebarContainer} ${sidebarContainerClass}`}>
          <Image
            src="http://localhost:3000/assets/sidebar/decorations_UpSx.webp"
            alt="Decoration"
            width={80}
            height={80}
            className={style.decorationTL}
          />
          <Image
            src="http://localhost:3000/assets/sidebar/decorations_UpDx.webp"
            alt="Decoration"
            width={80}
            height={80}
            className={style.decorationTR}
          />
          <Image
            src="http://localhost:3000/assets/sidebar/decorations_CenterSx.webp"
            alt="Decoration"
            width={28}
            height={100}
            className={style.decorationCL}
          />
          <Image
            src="http://localhost:3000/assets/sidebar/decorations_CenterDx.webp"
            alt="Decoration"
            width={28}
            height={100}
            className={style.decorationCR}
          />
          <Image
            src="http://localhost:3000/assets/sidebar/decorations_BottomSx.webp"
            alt="Decoration"
            width={80}
            height={80}
            className={style.decorationBL}
          />
          <Image
            src="http://localhost:3000/assets/sidebar/decorations_BottomDx.webp"
            alt="Decoration"
            width={80}
            height={80}
            className={style.decorationBR}
          />
          <div className={style.headContainer}>
            <h2>
              {`${filteredImageFromMap.length +
                filteredPrintFromMap.length +
                filteredManuscriptFromMap.length
                } DOCUMENTS IN ${concatenated.length > 0
                  ? concatenated[0].place.name.toUpperCase()
                  : filteredManuscriptFromMap[0]?.from.name.toUpperCase() ??
                  filteredManuscriptFromMap[0]?.to.name.toUpperCase()
                }`}
            </h2>
            <p>
              {`RELATED TO ${eventData.type
                } IN ${eventData.place.name.toUpperCase()}`}
            </p>
          </div>

          <button
            type="button"
            className={`${style.closeButton}`}
            onClick={() => {
              setSidebarOpen(!sidebarOpen);
            }}
          >
            <Image
              className={`${style.closeButtonImg}`}
              src={"http://localhost:3000/assets/sidebar/closeSidebar.webp"}
              width={11}
              height={20}
              alt="Close Sidebar"
            />
          </button>

          {(doc !== undefined) && <Modal isOpen={isModalOpen} onClose={closeModal} data={doc} />}
          <ul className={style.contentContainer}>
            {filteredImageFromMap.map((image) => (
              <>
                <li
                  className={style.contentItem}
                  onClick={() => { openModal(); setDoc(image) }}
                  onKeyUp={() => { openModal(); setDoc(image) }}
                >
                  <p>{`Image from ${image.author}`}</p>
                  <div className={style.contentItemDetails}>
                    <p>{image.author}</p>
                    <p>{image.date}</p>
                  </div>
                </li>
              </>
            ))}
            {filteredManuscriptFromMap.map((manuscript) => (
              <>
                <li
                  className={style.contentItem}
                  onClick={() => { openModal(); setDoc(manuscript) }}
                  onKeyUp={() => { openModal(); setDoc(manuscript) }}
                >
                  <p>{`Manuscript from ${manuscript.author}`}</p>
                  <div className={style.contentItemDetails}>
                    <p>{manuscript.author}</p>
                    <p>{manuscript.writtenAt}</p>
                  </div>
                </li>
              </>
            ))}
            {filteredPrintFromMap.map((print) => (
              <>
                <li
                  className={style.contentItem}
                  onClick={() => { openModal(); setDoc(print) }}
                  onKeyUp={() => { openModal(); setDoc(print) }}
                >
                  <p>{`Print from ${print.author}`}</p>
                  <div className={style.contentItemDetails}>
                    <p>{print.author}</p>
                    <p>{print.year}</p>
                  </div>
                </li>
              </>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
