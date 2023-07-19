import Map from "../components/Map";
import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Image from "next/image";

import style from "../styles/Main.module.css";
import EventFilter from "../components/event_filter";

import { useStore } from "../../Store/store";
import DocumentFilter from "../components/document_filter";

import { LayoutStore } from "../../Store/store";

export default function Home() {
  const [open, setOpen] = useState(false);

  const isSelectedCountry = useStore((state) => state.isSelectedCountry);
  const deselectCountry = useStore((state) => state.deselectCountry);
  const isSelectedEvent = useStore((state) => state.isSelectedEvent);
  const isSelectedDocument = useStore((state) => state.isSelectedDocument);

  //   const setShowLayoutAdmin = LayoutStore((state) => state.setShow);

  //   useEffect(() => {
  //       setShowLayoutAdmin(false);
  //   }, [])

  return (
    <div className={style.container}>
      {
          <Sidebar open={isSelectedDocument} />
      }

      {!isSelectedDocument && (
        <Image
          className={style.logoDivOverlay}
          src="/logo_discompose.svg"
          alt="Discompose Logo"
          width={100}
          height={100}
        />
      )}

      {/*<div className={style.divOverlay}>Prova di un filtro</div>*/}
      {isSelectedCountry && !isSelectedEvent && <EventFilter />}
      {isSelectedEvent && !isSelectedDocument && <DocumentFilter />}
      <div className={style.mapModule}>
        <Map open={open}></Map>
      </div>
    </div>
  );
}
