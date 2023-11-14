import { useState } from "react";
import style from "../../styles/Banner.module.css";
import Image from "next/image";

const BannerText = () => {
	return (
		<div className={style.bannerOverlay}>
			<Image src="/assets/banner.webp" alt="Turn Back" width={500} height={100} />
		</div>
	);
};

export default BannerText;
