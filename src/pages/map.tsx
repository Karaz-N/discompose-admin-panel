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
import {
  Image as ImageT,
  Print as PrintT,
  Manuscript as ManuscriptT,
  Place,
} from "@prisma/client";
import { useDocumentStore } from "../../Store/documentStore";

type ImageType = ImageT & { place: Place };
type Print = PrintT & { place: Place };
type Manuscript = ManuscriptT & { to?: Place; from: Place };

export const getServerSideProps = async () => {
  const eventsP = await loadAllEvents();
  const manuscriptsP = loadFullDocuments(DocumentCategory.MANUSCRIPT);
  const printsP = loadFullDocuments(DocumentCategory.PRINT);
  const imagesP = loadFullDocuments(DocumentCategory.IMAGE);

  const [events, manuscripts, prints, images] = await Promise.all([
    eventsP,
    manuscriptsP,
    printsP,
    imagesP,
  ]);

  return {
    props: {
      events: events,
      manuscripts: manuscripts as Manuscript[],
      prints: prints as Print[],
      images: images as ImageType[],
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
  const sidebarOpen = useStore((state) => state.sidebarOpen);

  const setIso = useFilterStore((state) => state.setIso);
  const addEvents = useFilterStore((state) => state.addEvents);

  const setAllManuscript = useDocumentStore((state) => state.setAllManuscript);
  const setAllPrint = useDocumentStore((state) => state.setAllPrint);
  const setAllImage = useDocumentStore((state) => state.setAllImage);

  useEffect(() => {
    const isobo = props.events.map((e) => e.place.countryCode?.toUpperCase());
    setIso(isobo);
    addEvents(props.events);
    setAllManuscript(props.manuscripts);
    setAllPrint(props.prints);
    setAllImage(props.images);
  }, []);

  return (
    <div className={style.container}>
      {sidebarVisible && <Sidebar open={false} />}

      {!isSelectedCountry && <BannerText />}

      {!isSelectedDocument && !sidebarOpen && (
        <Image
          className={style.logoDivOverlay}
          src="/logo_discompose.webp"
          alt="Discompose Logo"
          width={100}
          height={100}
        />
      )}

      {/*<div className={style.divOverlay}>Prova di un filtro</div>*/}
      {isSelectedCountry && !isSelectedEvent && <EventFilter />}
      {isSelectedEvent && !isSelectedDocument && !sidebarOpen && <DocumentFilter />}
      <div className={style.mapModule}>
        <Map open={open} />
      </div>
    </div>
  );
}
