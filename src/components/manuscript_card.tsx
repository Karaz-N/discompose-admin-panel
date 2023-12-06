import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import style from "../styles/ManuscriptCard.module.css";
import Image from "next/image";

import { Manuscript as ManuscriptType, Place } from "@prisma/client";

type Manuscript = ManuscriptType & { to?: Place; from: Place };

type ManuscriptCardProps = {
  manuscript: Manuscript;
  onClose: () => void;
}

class ManuscriptView extends React.Component<{ manuscript: Manuscript }, {}> {
  render() {
    return (
      <ul className={`${style.wideItem}`}>
        <li className={style.summary}>
          <p>Content</p>
          <p>{this.props.manuscript.summary || "-"}</p>
        </li>
        <li>
          <p>Author</p>
          <p>{this.props.manuscript.author || "-"}</p>
        </li>
        <li>
          <p>Departure Place</p>
          <p>{this.props.manuscript.from?.name || "-"}</p>
        </li>
        <li>
          <p>Date of Writing</p>
          <p>{this.props.manuscript.writtenAt || "-"}</p>
        </li>
        <li>
          <p>Recipient</p>
          <p>{this.props.manuscript.recipient || "-"}</p>
        </li>
        <li>
          <p>Language</p>
          <p>{this.props.manuscript.language || "-"}</p>
        </li>
        <li>
          <p>Archive</p>
          <p>{this.props.manuscript.archive || "-"}</p>
        </li>
        <li>
          <p>Arrival Place</p>
          <p>{this.props.manuscript.to?.name || "-"}</p>
        </li>
        <li>
          <p>Date of Receipt</p>
          <p>{this.props.manuscript.receivedAt || "-"}</p>
        </li>
        <li>
          <p>Link</p>
          <p>{this.props.manuscript.link || "-"}</p>
        </li>
      </ul>
    );
  }
}

// const ManuscriptViewExport = ({ manuscript }: { manuscript: Manuscript }) => {
//   const componentRef = useRef(null);
//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//   });
//   return (
//     <>
//       <ManuscriptView manuscript={manuscript} ref={componentRef} />
//       <button onClick={handlePrint}>Di grazia</button>
//     </>
//   );
// }

export default function ManuscriptCard({ onClose, manuscript }: ManuscriptCardProps) {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <article className={style.container}>
        <h1>{`Manuscript from ${manuscript.author || "-"}`}</h1>

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
        {/* <ManuscriptViewExport manuscript={manuscript} /> */}
        <ManuscriptView manuscript={manuscript} ref={componentRef} />

      </article>
    </>
  );
}
