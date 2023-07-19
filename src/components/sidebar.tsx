import { useEffect, useState } from "react";
import Image from "next/image";

import style from "../styles/Sidebar.module.css";

import Manus from "../../Test/manuscriptTest.json";

import Modal from "./modal";

import { useStore } from "../../Store/store";
import ManuscriptCard from "./manuscript_card";

export default function Sidebar({ open }) {
  const setDeselectedDocument = useStore(
    (state) => state.setDeselectedDocument
  );

  const isSelectedDocument = useStore((state) => state.isSelectedDocument);

  const sidebarClass = isSelectedDocument ? style.sidebarOpen : style.sidebarClosed;

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    console.log(open);
  }, [open])

  return (
    <aside
      className={`${style.sidebar} ${sidebarClass}`}
    >
      <div className={style.sidebarContainer}>
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
        <div class={style.headContainer}>
          <h2>Titolo della Sidebar</h2>
          <p>Testo informativo.</p>
        </div>

        <button
        className={style.closeButton}
          onClick={() => {
            setDeselectedDocument();
          }}
        >
          <Image className={style.closeButtonImg} src={"/images/closeSidebar.svg"} width={11} height={20} alt="Close Sidebar" />
        </button>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          
        </Modal>
        <ul className={style.contentContainer}>
          {Manus.map((manus) => (
            <>
              <li className={style.contentItem} onClick={() => openModal()}>
                <p>{"Manuscript from " + manus.Destinatario}</p>
                <div className={style.contentItemDetails}>
                  <p>{manus.Destinatario}</p>
                  <p>{manus.DataScrittura}</p>
                </div>
              </li>
            </>
          ))}
        </ul>
      </div>
    </aside>
  );
}
