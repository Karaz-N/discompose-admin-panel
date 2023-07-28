import Image from "next/image";
import { Suspense, useState, useEffect } from "react";
import { GetStaticProps, GetServerSideProps } from "next";
import {
  loadEventCount,
  loadDocumentCount,
  loadAllDocumentsCount,
  loadAllEventsCount,
  loadAllEvents
} from "../db/queries";
import { DocumentCategory, EventType } from "@prisma/client";

export const getServerSideProps = async () => {
  const allEventCount = loadAllEventsCount();

  const allEarthquakesCount = loadEventCount(EventType.EARTHQUAKE);
  const allFloodsCount = loadEventCount(EventType.FLOOD);
  const allHurricanesCount = loadEventCount(EventType.HURRICANE);
  const allEruptionsCount = loadEventCount(EventType.ERUPTION);

  const allEvents = loadAllEvents();

  const allDocumentCount = loadAllDocumentsCount();

  const allImagesCount = loadDocumentCount(DocumentCategory.IMAGE);
  const allManuscriptsCount = loadDocumentCount(DocumentCategory.MANUSCRIPT);
  const allPrintsCount = loadDocumentCount(DocumentCategory.PRINT);

  const [
    events,
    earthquakes,
    floods,
    hurricanes,
    eruptions,
    documents,
    images,
    manuscripts,
    prints,
    alloEvents,
  ] = await Promise.all([
    allEventCount,
    allEarthquakesCount,
    allFloodsCount,
    allHurricanesCount,
    allEruptionsCount,
    allDocumentCount,
    allImagesCount,
    allManuscriptsCount,
    allPrintsCount,
    allEvents,
  ]);

  return {
    props: {
      events,
      earthquakes,
      floods,
      hurricanes,
      eruptions,

      documents,
      images,
      manuscripts,
      prints,
      alloEvents,
    },
  };
};

type HomeProps = Awaited<ReturnType<typeof getServerSideProps>>["props"];

export default function Home(props: HomeProps) {
  useEffect(() => {
    console.log(props.alloEvents);
  })
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="p-8">
        <h1 className="uppercase mb-8 font-bold text-2xl">Dashboard</h1>

        <div className="grid grid-cols-2 gap-32">
          <div className="grid grid-cols-4 gap-4">
            <h2 className="uppercase font-bold">Events Overview</h2>
            <div className="col-span-4 bg-menu-admin h-32 flex flex-col items-center justify-center">
              <span className="flex">
                <Image
                  className="mr-2"
                  src="/folder.svg"
                  height={17}
                  width={20}
                  alt="Asternox Company Logo"
                />
                <h2 className="uppercase text-lg font-semibold text-item-admin-red">
                  All Events
                </h2>
              </span>
              <Suspense>
                <p className=" font-bold text-4xl mt-4 text-item-admin">
                  {props.events}
                </p>
              </Suspense>
            </div>
            <div className="bg-menu-admin h-32 flex flex-col items-center justify-center">
              <h2 className="uppercase text-lg font-semibold text-item-admin-red">
                EARTHQUAKES
              </h2>
              <Suspense>
                <p className=" font-bold text-4xl mt-4 text-item-admin">
                  {props.earthquakes}
                </p>
              </Suspense>
            </div>
            <div className="bg-menu-admin h-32 flex flex-col items-center justify-center">
              <h2 className="uppercase text-lg font-semibold text-item-admin-red">
                FLOODS
              </h2>
              <Suspense>
                <p className=" font-bold text-4xl mt-4 text-item-admin">
                  {props.floods}
                </p>
              </Suspense>
            </div>
            <div className="bg-menu-admin h-32 flex flex-col items-center justify-center">
              <h2 className="uppercase text-lg font-semibold text-item-admin-red">
                HURRICANES
              </h2>
              <Suspense>
                <p className=" font-bold text-4xl mt-4 text-item-admin">
                  {props.hurricanes}
                </p>
              </Suspense>
            </div>
            <div className="bg-menu-admin h-32 flex flex-col items-center justify-center">
              <h2 className="uppercase text-lg text-center font-semibold text-item-admin-red">
                ERUPTIONS
              </h2>
              <Suspense>
                <p className=" font-bold text-4xl mt-4 text-item-admin">
                  {props.eruptions}
                </p>
              </Suspense>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <h2 className="uppercase font-bold">Documents Overview</h2>
            <div className="col-span-3 bg-menu-admin h-32 flex flex-col items-center justify-center">
              <span className="flex">
                <Image
                  className="mr-2"
                  src="/folder.svg"
                  height={17}
                  width={20}
                  alt="Asternox Company Logo"
                />
                <h2 className="uppercase text-lg font-semibold text-item-admin-red">
                  All Documents
                </h2>
              </span>
              <Suspense>
                <p className=" font-bold text-4xl mt-4 text-item-admin">
                  {props.documents}
                </p>
              </Suspense>
            </div>
            <div className="bg-menu-admin h-32 flex flex-col items-center justify-center">
              <span className="flex">
                <Image
                  className="mr-2"
                  src="/image.svg"
                  height={17}
                  width={20}
                  alt="Asternox Company Logo"
                />
                <h2 className="uppercase text-lg font-semibold text-item-admin-red">
                  IMAGES
                </h2>
              </span>
              <Suspense>
                <p className=" font-bold text-4xl mt-4 text-item-admin">
                  {props.images}
                </p>
              </Suspense>
            </div>
            <div className="bg-menu-admin h-32 flex flex-col items-center justify-center">
              <span className="flex">
                <Image
                  className="mr-2"
                  src="/pen.svg"
                  height={17}
                  width={20}
                  alt="Asternox Company Logo"
                />
                <h2 className="uppercase text-lg font-semibold text-item-admin-red">
                  MANUSCRIPTS
                </h2>
              </span>
              <Suspense>
                <p className=" font-bold text-4xl mt-4 text-item-admin">
                  {props.manuscripts}
                </p>
              </Suspense>
            </div>
            <div className="bg-menu-admin h-32 flex flex-col items-center justify-center">
              <span className="flex">
                <Image
                  className="mr-2"
                  src="/text.svg"
                  height={70}
                  width={20}
                  alt="Asternox Company Logo"
                />
                <h2 className="uppercase text-lg font-semibold text-item-admin-red">
                  PRINTS
                </h2>
              </span>
              <Suspense>
                <p className=" font-bold text-4xl mt-4 text-item-admin">
                  {props.prints}
                </p>
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
