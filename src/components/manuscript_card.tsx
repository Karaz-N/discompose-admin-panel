import React from "react";
import style from "../styles/ManuscriptCard.module.css";
import Image from "next/image";

import { Manuscript as ManuscriptType, Place } from "@prisma/client";

type Manuscript = ManuscriptType & { to?: Place; from: Place };

type ManuscriptCardProps = {
  manuscript: Manuscript;
  onClose: () => void;
}

export default function ManuscriptCard({ onClose, manuscript } : ManuscriptCardProps) {
  return (
    <>
      <article className={style.container}>
        <h1>{`Manuscript from ${manuscript.author || "-"}`}</h1>

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
              width={14}
              height={14}
              alt="close document card"
            />
          </button>
        </nav>

        <ul className={`${style.wideItem}`}>
          <li>
            <p>Author</p>
            <p>{manuscript.author || "-"}</p>
          </li>
          <li>
            <p>Departure Place</p>
            <p>{manuscript.from?.name || "-"}</p>
          </li>
          <li>
            <p>Date of Writing</p>
            <p>{manuscript.writtenAt || "-"}</p>
          </li>
          <li>
            <p>Recipient</p>
            <p>{manuscript.recipient || "-"}</p>
          </li>
          <li>
            <p>Language</p>
            <p>{manuscript.language || "-"}</p>
          </li>
          <li>
            <p>Archive</p>
            <p>{manuscript.archive || "-"}</p>
          </li>
          <li>
            <p>Arrival Place</p>
            <p>{manuscript.to?.name || "-"}</p>
          </li>
          <li>
            <p>Date of Receipt</p>
            <p>{manuscript.receivedAt || "-"}</p>
          </li>
          <li>
            <p>Link</p>
            <p>{manuscript.link || "-"}</p>
          </li>
        </ul>
      </article>
    </>
  );
}
