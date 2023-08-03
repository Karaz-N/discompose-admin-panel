import Image from "next/image";
import Link from "next/link";
import style from "../styles/Homepage.module.css";

const Homepage = () => {
	return (
		<>
			<header>
				<Image
					src={"/disco_logo.svg"}
					alt="discompose-logo"
					width={100}
					height={100}
				/>
			</header>

			<article className={style.article}>
				<h1>about the</h1>
				<h2 className={style.subtitle}>pathways</h2>

				<section className={style.container}>
					<div className={style.internalSectionContainer}>
						<p className={style.content}>
							DISCOMPOSE PATHWAYS is a digital platform that constitutes part of
							the outcomes of the research conducted by the DisComPoSe project,
							a five-year project financed by the European Research Council
							(ERC) and hosted by the Department of Humanities of the University
							of Naples Federico II. DisComPoSE examines the European and
							extra-European territories of the Hispanic Monarchy between the
							16th and 18th centuries and investigates the connections between
							the circulation of news about natural disasters, the processing of
							information about such events and the development of emergency
							management policies.
						</p>
                        <Link className={style.externalLink} href="#">FIND OUT MORE ABOUT DISCOMPOSE</Link>
					</div>
					<p className={style.content}>
						With this platform, the researchers aim to provide scholars and
						non-scholarly individuals with a more immersive and interactive
						display of the findings of their research.
					</p>
				</section>
			</article>

			<Image
				src={"/homepage_assets/map.svg"}
				alt="Discompose Map"
				width={500}
				height={100}
			/>
		</>
	);
};

export default Homepage;