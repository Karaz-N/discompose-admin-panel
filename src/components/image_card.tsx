import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import style from "../styles/ImageCard.module.css";
import Image from "next/image";

import { Image as ImageType, Place } from "@prisma/client";

type ImageData = ImageType & { place: Place };

type ImageCardProps = {
  imageData: ImageData;
  onClose: () => void;
}

class ImageView extends React.Component<{ imageData: ImageData }, {}> {
  render() {
    return (
      <ul className={`${style.wideItem}`}>
        <li className={style.summary}>
          <p>Content</p>
          <p>{this.props.imageData.summary || "-"}</p>
        </li>
        <li>
          <p>Author</p>
          <p>{this.props.imageData.author || "-"}</p>
        </li>
        <li>
          <p>Title</p>
          <p>{this.props.imageData.title || "-"}</p>
        </li>
        <li>
          <p>Artist</p>
          <p>{this.props.imageData.artist || "-"}</p>
        </li>
        <li>
          <p>Museum</p>
          <p>{this.props.imageData.museum || "-"}</p>
        </li>
        <li>
          <p>Data</p>
          <p>{this.props.imageData.date || "-"}</p>
        </li>
        <li>
          <p>Place</p>
          <p>{this.props.imageData.place.name || "-"}</p>
        </li>
        <li>
          <p>Content</p>
          <p>{this.props.imageData.content || "-"}</p>
        </li>
        <li>
          <p>Link</p>
          <p>{this.props.imageData.link || "-"}</p>
        </li>
      </ul>
    );
  }
}

export default function ImageCard({ onClose, imageData }: ImageCardProps) {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <article className={style.container}>
        <h1>{`Image from ${imageData.author || "-"}`}</h1>

        <nav className={style.lastColumn}>
          <button type="button" onClick={handlePrint}>
            <Image
              src={"/assets/card/downloadDocument.webp"}
              height={26}
              width={26}
              alt="Download Document"
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
        <ImageView imageData={imageData} ref={componentRef} />

      </article>
    </>
  );
}
