import React, { useEffect } from "react";
import styles from "../styles/Modal.module.css";
import ManuscriptCard from "./manuscript_card";

const Modal = ({ isOpen, onClose }) => {
	const handleModalClose = (e) => {
		onClose();
	};

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden"; // Impedisce lo scrolling di sfondo quando la modale è aperta
		} else {
			document.body.style.overflow = ""; // Ripristina lo scrolling di sfondo quando la modale è chiusa
		}
	}, [isOpen]);

	return (
		<div className={`${styles["modal-container"]} ${isOpen && styles.show}`}>
			<div className={`${styles.modal}`}>
				<ManuscriptCard onClose={handleModalClose} />
			</div>
		</div>
	);
};

export default Modal;

// import React from 'react';
// import styles from "styles/Modal.module.css";

// const Modal = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div className={styles.modalContainer}>
//       <div className={styles.modal}>
//         <div className={styles.modalContent}>{children}</div>
//         <button className={styles.modalClose} onClick={onClose}>
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Modal;
