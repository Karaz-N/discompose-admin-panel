import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import style from "../styles/PrintCard.module.css";
import Image from "next/image";

import { Print as PrintType, Place } from "@prisma/client";

type Print = PrintType & { place: Place };

type PrintCardProps = {
  print: Print;
  onClose: () => void;
};

class PrintView extends React.Component<{ print: Print }, {}> {
  render() {
    return (
      <ul className={`${style.wideItem}`}>
        <li className={style.summary}>
          <p>Content</p>
          <p>{this.props.print.summary || "-"}</p>
        </li>
        <li>
          <p>Artist</p>
          <p>{this.props.print.author || "-"}</p>
        </li>
        <li>
          <p>Date</p>
          <p>{this.props.print.year || "-"}</p>
        </li>
        <li>
          <p>Title</p>
          <p>{this.props.print.title || "-"}</p>
        </li>
        <li>
          <p>Information</p>
          <p>{this.props.print.information || "-"}</p>
        </li>
        <li>
          <p>Language</p>
          <p>{this.props.print.language || "-"}</p>
        </li>
        <li>
          <p>Place</p>
          <p>{this.props.print.place.name || "-"}</p>
        </li>
        <li>
          <p>Year</p>
          <p>{this.props.print.year || "-"}</p>
        </li>
        <li>
          <p>USTC Code</p>
          <p>{this.props.print.USTC || "-"}</p>
        </li>
        <li>
          <p>Dedicatee</p>
          <p>{this.props.print.dedicatee || "-"}</p>
        </li>
        <li>
          <p>Other Places</p>
          <p>{this.props.print.otherPlaces || "-"}</p>
        </li>
        <li>
          <p>Link</p>
          <p>{this.props.print.link || "-"}</p>
        </li>
        <li>
          <p>Note</p>
          <p>{this.props.print.notes || "-"}</p>
        </li>
      </ul>
    );
  }
}

export default function PrintCard({ onClose, print }: PrintCardProps) {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <article className={style.container}>
        <h1>{`Print from ${print.author || "-"}`}</h1>

        <nav className={style.lastColumn}>
          <button type="button" onClick={handlePrint}>
            <Image
              src={"http://localhost:3000/assets/card/downloadDocument.webp"}
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
              src={"http://localhost:3000/assets/card/closeDocument.webp"}
              width={14}
              height={14}
              alt="close document card"
            />
          </button>
        </nav>
        <PrintView print={print} ref={componentRef} />

      </article>
    </>
  );
}
