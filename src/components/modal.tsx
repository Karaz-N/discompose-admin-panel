import React, { useEffect } from "react";
import styles from "../styles/Modal.module.css";
import ManuscriptCard from "./manuscript_card";
import PrintCard from "./print_card";
import ImageCard from "./image_card";

import {
  Image as ImageType,
  Manuscript as ManuscriptType,
  Print as PrintType,
  Place,
} from "@prisma/client";

import { isManuscript, isPrint, isImage } from "../db/models";

type Image = ImageType & { place: Place };

type Manuscript = ManuscriptType & { to?: Place; from: Place };

type Print = PrintType & { place: Place };

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: Manuscript | Print | Image;
};

const Modal = ({ isOpen, onClose, data }: ModalProps) => {
  const handleModalClose = () => {
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Impedisce lo scrolling di sfondo quando la modale è aperta
	  // console.log(data);
    } else {
      document.body.style.overflow = ""; // Ripristina lo scrolling di sfondo quando la modale è chiusa
	  // console.log(data);
    }
  }, [isOpen]);

  return (
    <div className={`${styles["modal-container"]} ${isOpen ? styles.show : ""}`}>
      <div className={`${styles.modal}`}>
        {isManuscript(data) && (
          <ManuscriptCard onClose={handleModalClose} manuscript={data} />
        )}
        {isPrint(data) && <PrintCard onClose={handleModalClose} print={data} />}
        {isImage(data) && (
          <ImageCard onClose={handleModalClose} imageData={data} />
        )}
      </div>
    </div>
  );
};

export default Modal;
