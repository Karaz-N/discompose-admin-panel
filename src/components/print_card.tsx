import React from "react";
import style from "../styles/ManuscriptCard.module.css";
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
              src={"/images/donwload.svg"}
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
              src={"/images/closeDocument.svg"}
              width={10}
              height={10}
              alt="close document card"
            />
          </button>
        </nav>

        <ul className={`${style.wideItem}`}>
          <li>
            <p>Author</p>
            <p>{print.author || "-"}</p>
          </li>
          <li>
            <p>Writer</p>
            <p>{print.writer || "-"}</p>
          </li>
          <li>
            <p>Title</p>
            <p>{print.title || "-"}</p>
          </li>
          <li>
            <p>Summary</p>
            <p>{print.summary || "-"}</p>
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
