import React from "react";
import style from "../styles/ManuscriptCard.module.css";
import Image from "next/image";

import { Image as ImageType, Place } from "@prisma/client";

type ImageData = ImageType & { place: Place };

type ImageCardProps = {
  imageData: ImageData;
  onClose: () => void;
}

export default function ImageCard({ onClose, imageData } : ImageCardProps) {
  return (
    <>
      <article className={style.container}>
        <h1>{`Image from ${imageData.author || "-"}`}</h1>

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
            <p>{imageData.author || "-"}</p>
          </li>
          <li>
            <p>Title</p>
            <p>{imageData.title || "-"}</p>
          </li>
          <li>
            <p>Artist</p>
            <p>{imageData.artist || "-"}</p>
          </li>
          <li>
            <p>Museum</p>
            <p>{imageData.museum || "-"}</p>
          </li>
          <li>
            <p>Data</p>
            <p>{imageData.date || "-"}</p>
          </li>
          <li>
            <p>Place</p>
            <p>{imageData.place.name || "-"}</p>
          </li>
          <li>
            <p>Content</p>
            <p>{imageData.content || "-"}</p>
          </li>
          <li>
            <p>Summary</p>
            <p>{imageData.summary || "-"}</p>
          </li>
          <li>
            <p>Link</p>
            <p>{imageData.link || "-"}</p>
          </li>
        </ul>
      </article>
    </>
  );
}