import { useEffect, useState } from "react";
import Image from "next/image";

import style from "../styles/Sidebar.module.css";

import Manus from "../../Test/manuscriptTest.json";

import Modal from "./modal";

import { useStore } from "../../Store/store";
import { useDocumentStore } from "../../Store/documentStore";
import { Image as ImageType, Manuscript, Print } from "@prisma/client";
import ManuscriptCard from "./manuscript_card";

export default function Sidebar({ open }) {
  const setDeselectedDocument = useStore(
    (state) => state.setDeselectedDocument
  );

  const isSelectedDocument = useStore((state) => state.isSelectedDocument);
  const sidebarVisible = useStore((state) => state.sidebarVisible);
  const setSidebarVisible = useStore((state) => state.setSidebarVisible);

  const filteredPrintFromMap = useDocumentStore((state) => state.filteredPrintFromMap);
  const filteredImageFromMap = useDocumentStore((state) => state.filteredImageFromMap);
  const filteredManuscriptFromMap = useDocumentStore((state) => state.filteredManuscriptFromMap);
  const filteredManuscript = useDocumentStore((state) => state.filteredManuscript);
  const filteredImage = useDocumentStore((state) => state.filteredImage);

  const eventData = useDocumentStore((state) => state.event);

  const sidebarOpen = useStore((state) => state.sidebarOpen);
  const setSidebarOpen = useStore((state) => state.setSidebarOpen);

  const sidebarContainerClass = sidebarOpen
    ? style.sidebarContainerOpen
    : style.sidebarContainerClosed;
  const sidebarClass = sidebarOpen ? style.sidebarOpen : style.sidebarClosed;

  const [isModalOpen, setModalOpen] = useState(false);

  const concatenated = filteredImageFromMap.concat(filteredPrintFromMap);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <aside className={`${style.sidebar} ${sidebarClass}`}>
      <div className={`${style.sidebarContainer} ${sidebarContainerClass}`}>
        <Image
          src="/images/decorations/decorations_UpSx.svg"
          alt="Decoration"
          width={80}
          height={80}
          className={style.decorationTL}
        />
        <Image
          src="/images/decorations/decorations_UpDx.svg"
          alt="Decoration"
          width={80}
          height={80}
          className={style.decorationTR}
        />
        <Image
          src="/images/decorations/decorations_CenterSx.svg"
          alt="Decoration"
          width={28}
          height={100}
          className={style.decorationCL}
        />
        <Image
          src="/images/decorations/decorations_CenterDx.svg"
          alt="Decoration"
          width={28}
          height={100}
          className={style.decorationCR}
        />
        <Image
          src="/images/decorations/decorations_BottomSx.svg"
          alt="Decoration"
          width={80}
          height={80}
          className={style.decorationBL}
        />
        <Image
          src="/images/decorations/decorations_BottomDx.svg"
          alt="Decoration"
          width={80}
          height={80}
          className={style.decorationBR}
        />
        <div className={style.headContainer}>
          <h2>{(filteredImageFromMap.length + filteredPrintFromMap.length + filteredManuscriptFromMap.length) + " DOCUMENTS IN " + (concatenated.length > 0 ? concatenated[0].place.name.toUpperCase() : (filteredManuscriptFromMap[0]?.from.name.toUpperCase() ?? filteredManuscriptFromMap[0]?.to.name.toUppercase() ))}</h2>
          <p>{"RELATED TO " + eventData.type + " IN " + eventData.place.name.toUpperCase()}</p>
        </div>

        <button
          className={style.closeButton}
          onClick={() => {
            setSidebarOpen(!sidebarOpen);
          }}
        >
          <Image
            className={style.closeButtonImg}
            src={"/images/closeSidebar.svg"}
            width={11}
            height={20}
            alt="Close Sidebar"
          />
        </button>

        <Modal isOpen={isModalOpen} onClose={closeModal}></Modal>
        <ul className={style.contentContainer}>
          {filteredImageFromMap.map((image) => (
            <>
              <li className={style.contentItem} onClick={() => openModal()}>
                <p>{"Image from " + image.author}</p>
                <div className={style.contentItemDetails}>
                  <p>{image.author}</p>
                  <p>{image.date}</p>
                </div>
              </li>
            </>
          ))}
          {filteredManuscriptFromMap.map((manuscript) => (
            <>
              <li className={style.contentItem} onClick={() => openModal()}>
                <p>{"Manuscript from " + manuscript.author}</p>
                <div className={style.contentItemDetails}>
                  <p>{manuscript.author}</p>
                  <p>{manuscript.writtenAt}</p>
                </div>
              </li>
            </>
          ))}
          {filteredPrintFromMap.map((print) => (
            <>
              <li className={style.contentItem} onClick={() => openModal()}>
                <p>{"Print from " + print.author}</p>
                <div className={style.contentItemDetails}>
                  <p>{print.author}</p>
                  <p>{print.year}</p>
                </div>
              </li>
            </>
          ))}
           
          <button onClick={() => {console.log(filteredImageFromMap.map((m) => {return {m: m.date}}))}}>ciao</button>
        </ul>
      </div>
    </aside>
  );
}