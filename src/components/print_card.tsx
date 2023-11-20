import React from "react";
import style from "../styles/PrintCard.module.css";
import Image from "next/image";

import { Print as PrintType, Place } from "@prisma/client";

type Print = PrintType & { place: Place };

type PrintCardProps = {
  print: Print;
  onClose: () => void;
};

export default function PrintCard({ onClose, print } : PrintCardProps) {
  return (
    <>
      <article className={style.container}>
        <h1>{`Print from ${print.author || "-"}`}</h1>

        <nav className={style.lastColumn}>
          <button type="button">
            <Image
              src={"/assets/card/downloadDocument.webp"}
              height={26}
              width={26}
              alt="prova"
            />
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
            }}
          >
            <Image
              src={"/assets/card/closeDocument.webp"}
              width={14}
              height={14}
              alt="close document card"
            />
          </button>
        </nav>

        <ul className={`${style.wideItem}`}>
        <li className={style.summary}>
            <p>Summary</p>
            <p>{print.summary || "-"}</p>
          </li>
          <li>
            <p>Artist</p>
            <p>{print.author || "-"}</p>
          </li>
          <li>
            <p>Date</p>
            <p>{print.year || "-"}</p>
          </li>
          <li>
            <p>Title</p>
            <p>{print.title || "-"}</p>
          </li>
          <li>
            <p>Information</p>
            <p>{print.information || "-"}</p>
          </li>
          <li>
            <p>Language</p>
            <p>{print.language || "-"}</p>
          </li>
          <li>
            <p>Place</p>
            <p>{print.place.name || "-"}</p>
          </li>
          <li>
            <p>Year</p>
            <p>{print.year || "-"}</p>
          </li>
          <li>
            <p>USTC Code</p>
            <p>{print.USTC || "-"}</p>
          </li>
          <li>
            <p>Dedicatee</p>
            <p>{print.dedicatee || "-"}</p>
          </li>
          <li>
            <p>Other Places</p>
            <p>{print.otherPlaces || "-"}</p>
          </li>
          <li>
            <p>Link</p>
            <p>{print.link || "-"}</p>
          </li>
          <li>
            <p>Note</p>
            <p>{print.notes || "-"}</p>
          </li>
        </ul>
      </article>
    </>
  );
}
