import React from "react";
import style from "../styles/ManuscriptCard.module.css";
import Image from "next/image";

export default function ManuscriptCard({ onClose }) {
  return (
    <>
      <article className={style.container}>
        <h1>Manuscript</h1>

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
            <p>Author/sender</p>
            <p>-</p>
          </li>
          <li>
            <p>Departure Place</p>
            <p>-</p>
          </li>
          <li>
            <p>Date of Writing</p>
            <p>-</p>
          </li>
          <li>
            <p>Recipient</p>
            <p>-</p>
          </li>
          <li>
            <p>Arrival Place</p>
            <p>-</p>
          </li>
          <li>
            <p>Date of Receipt</p>
            <p>-</p>
          </li>
          <li>
            <p>Related Events</p>
            <p>-</p>
          </li>
          <li>
            <p>Related Documents</p>
            <p>-</p>
          </li>
        </ul>
      </article>
    </>
  );
}
