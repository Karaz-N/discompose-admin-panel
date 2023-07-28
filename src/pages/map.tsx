import Map from "../components/Map";
import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Image from "next/image";

import style from "../styles/Main.module.css";
import EventFilter from "../components/event_filter";

import { useStore } from "../../Store/store";
import DocumentFilter from "../components/document_filter";

import BannerText from "../components/Banner/banner_text";

import { loadAllEvents, loadFullDocuments } from "../db/queries";

import { useFilterStore } from "../../Store/filterStore";
import { DocumentCategory } from "@prisma/client";

import { useDocumentStore } from "../../Store/documentStore";

export const getServerSideProps = async () => {
  const events = await loadAllEvents();
  const manuscripts = await loadFullDocuments(DocumentCategory.MANUSCRIPT);
  const prints = await loadFullDocuments(DocumentCategory.PRINT);
  const images = await loadFullDocuments(DocumentCategory.IMAGE);

  return {
    props: {
      events: events,
      manuscripts: manuscripts,
      prints: prints,
      images: images,
    },
  };
};

type MapProps = Awaited<ReturnType<typeof getServerSideProps>>["props"];
export default function Home(props: MapProps) {
  const [open, setOpen] = useState(false);

  const isSelectedCountry = useStore((state) => state.isSelectedCountry);
  const deselectCountry = useStore((state) => state.deselectCountry);
  const isSelectedEvent = useStore((state) => state.isSelectedEvent);
  const isSelectedDocument = useStore((state) => state.isSelectedDocument);
  const sidebarVisible = useStore((state) => state.sidebarVisible);

  const setIso = useFilterStore((state) => state.setIso);
  const addEvents = useFilterStore((state) => state.addEvents);

  const setAllManuscript = useDocumentStore((state) => state.setAllManuscript);
  const setAllPrint = useDocumentStore((state) => state.setAllPrint);
  const setAllImage = useDocumentStore((state) => state.setAllImage);

  useEffect(() => {
    var isobo = props.events.map((e) => e.place.countryCode.toUpperCase());
    setIso(isobo);
    addEvents(props.events);
    setAllManuscript(props.manuscripts);
    setAllPrint(props.prints);
    setAllImage(props.images);
  }, []);

  return (
    <div className={style.container}>
      {sidebarVisible && (
        <Sidebar open={false} />
      )}

      {!isSelectedCountry && <BannerText />}

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
