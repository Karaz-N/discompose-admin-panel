import Image from "next/image";
import Link from "next/link";
import style from "../styles/HomePage.module.css";
import { useRouter } from "next/router";
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from "react";
import { Example } from "../components/pdfView";
import {
	loadEventCount,
	loadDocumentCount,
	loadAllDocumentsCount,
	loadAllEventsCount,
	loadAllEvents,
} from "../db/queries";
import { DocumentCategory, EventType } from "@prisma/client";

export const getServerSideProps = async () => {
	const allEventCount = loadAllEventsCount();

	const allEarthquakesCount = loadEventCount(EventType.EARTHQUAKE);
	const allFloodsCount = loadEventCount(EventType.FLOOD);
	const allHurricanesCount = loadEventCount(EventType.HURRICANE);
	const allEruptionsCount = loadEventCount(EventType.ERUPTION);

	const allEvents = loadAllEvents();

	const allDocumentCount = loadAllDocumentsCount();

	const allImagesCount = loadDocumentCount(DocumentCategory.IMAGE);
	const allManuscriptsCount = loadDocumentCount(DocumentCategory.MANUSCRIPT);
	const allPrintsCount = loadDocumentCount(DocumentCategory.PRINT);

	const [
		events,
		earthquakes,
		floods,
		hurricanes,
		eruptions,
		documents,
		images,
		manuscripts,
		prints,
		alloEvents,
	] = await Promise.all([
		allEventCount,
		allEarthquakesCount,
		allFloodsCount,
		allHurricanesCount,
		allEruptionsCount,
		allDocumentCount,
		allImagesCount,
		allManuscriptsCount,
		allPrintsCount,
		allEvents,
	]);

	return {
		props: {
			events,
			earthquakes,
			floods,
			hurricanes,
			eruptions,

			documents,
			images,
			manuscripts,
			prints,
			alloEvents,
		},
	};
};

type MainProps = Awaited<ReturnType<typeof getServerSideProps>>["props"];
export default function Homepage(props: MainProps) {
	const [start, setStart] = useState(false);
	const { push } = useRouter();
	const { ref: firstArticleRef, inView: articleIsVisible } = useInView({ triggerOnce: true })
	const { ref: secondArticleRef, inView: secondArticleIsVisible } = useInView({ triggerOnce: true })

	setTimeout(() => {
		setStart(true);
	}, 3200);

	return (
		<div className={`${style.mainContainer} ${start ? style.mainContainerActive : ""}`}>
			<button
				type="button"
				className={style.fixedMapButton}
				onClick={() => push("/map")}
			>
				{"explore the routes >"}
			</button>
			<header className={style.headerContainer}>
				<h1 style={{ position: "relative" }}>discompose</h1>
				<h2>routes</h2>
				<Image className={style.headerImgMain} src="http://localhost:3000/assets/homepage/complete_volcano.webp" alt="Background" width={1018} height={725} />
				{/* <img className={style.headerImgMain} src="http://localhost:3000/assets/homepage/volcano/vulcano.webp" alt="" />
				<img className={style.headerImgSub} src="http://localhost:3000/assets/homepage/volcano/nuvola1.webp" alt="" />
				<img className={style.headerImgSub} src="http://localhost:3000/assets/homepage/volcano/nuvola2.webp" alt="" />
				<img className={style.headerImgSub} src="http://localhost:3000/assets/homepage/volcano/nuvola3.webp" alt="" />
				<img className={style.headerImgSub} src="http://localhost:3000/assets/homepage/volcano/nuvola4.webp" alt="" />
				<img className={style.headerImgSub} src="http://localhost:3000/assets/homepage/volcano/nuvola5.webp" alt="" />
				<img className={style.headerImgSub} src="http://localhost:3000/assets/homepage/volcano/nuvola6.webp" alt="" /> */}
			</header>
			{/* ref={firstArticleRef} className={`${style.article} ${articleIsVisible ? style.articleAnimated : ""}`} */}
			<article className={`${style.articleFirst} ${start ? style.articleAnimated : ""}`}>
				<Image
					style={{ alignSelf: "start", marginBottom: "1rem" }}
					src="http://localhost:3000/assets/logo_discompose.webp"
					alt="discompose-logo"
					width={83}
					height={50}
				/>
				<h1>about the</h1>
				<h2 className={start ? style.articleH2Animated : ""}>routes</h2>
				<div className={`${style.articleContainer} ${start ? style.articleContainerAnimated : ""}`}>
					<div>
						<p>
							<span className={style.specialContent}>DISCOMPOSE ROUTES</span>{" "}
							is a digital platform that constitutes part of the outcomes of the
							research conducted by the DisComPoSe project, a five-year project
							financed by the European Research Council (ERC) and hosted by the{" "}
							<span className={style.specialContent}>
								Department of Humanities of the University of Naples Federico
								II.
							</span>{" "}
							DisComPoSE examines the European and extra-European territories of
							the Hispanic Monarchy between the 16th and 18th centuries and
							investigates the connections between the circulation of news about
							natural disasters, the processing of information about such events
							and the development of emergency management policies.
						</p>
						<div className={style.linkContainer}>
							<Link
								className={style.externalLink}
								href="http://discompose.unina.it/"
								target="_blank"
							>
								FIND OUT MORE ABOUT DISCOMPOSE
							</Link>
							<img
								className={style.linkImage}
								src="http://localhost:3000/assets/homepage/imageLink.webp"
								alt=""
							/>
						</div>
					</div>
					<p>
						With this platform, the researchers aim to provide scholars and
						non-scholarly individuals with a more immersive and interactive
						display of the findings of their research.
					</p>
					<div className={style.linkContainer2}>
						<Link
							className={style.externalLink}
							href="http://discompose.unina.it/"
							target="_blank"
						>
							FIND OUT MORE ABOUT DISCOMPOSE
						</Link>
						<img
							className={style.linkImage}
							src="http://localhost:3000/assets/homepage/imageLink.webp"
							alt=""
						/>
					</div>
					<Image className={`${style.arrow_dx} ${start ? style.arrowDxAnimated : ""}`} src="http://localhost:3000/assets/homepage/arrow_dx.webp" alt="Discompose Map" width={1920} height={2158} />

					<Image className={`${style.arrow_sx} ${start ? style.arrowSxAnimated : ""}`} src="http://localhost:3000/assets/homepage/arrow_sx.webp" alt="Discompose Map" width={1920} height={2158} />

					<Image className={style.crown} src="http://localhost:3000/assets/homepage/crown.webp" alt="" width={1920} height={2158} />

					<Image className={style.secondImg} src="http://localhost:3000/assets/homepage/data.webp" alt="" width={1920} height={2158} />

				</div>
				<div className={style.secondaryContainer}>
					<p className={style.secondaryTextContainer}>
						Discompose Routes offers{" "}
						<span className={style.specialContent}>
							a dynamic interactive map
						</span>{" "}
						meticulously designed to reveal the geospatial dispersion of natural
						disasters throughout the regions of the ancient spanish empire.
						Immerse yourself in an extensive collection of diligently gathered
						historical documents from archives and reliable sources, providing a
						rare and insightful window into the trials and tribulations endured
						by our forebears during periods of hardship.
					</p>
				</div>
			</article>
			<article className={style.mapImageContainer}>
				<Image
					src={"http://localhost:3000/assets/homepage/home_map.webp"}
					alt="Discompose Map"
					width={1920}
					height={2158}
				/>
				<section className={style.dataMap}>
					<div id={style.firstBorder} className={style.dataMapRow}>
						<img
							src="http://localhost:3000/assets/homepage/event_marker_home.webp"
							alt=""
							className={style.eventDataMarker}
						/>
						<p className={style.data}>{props.events}</p>
						<p className={style.dataType}>events</p>
					</div>
					<div className={style.dataSubRow}>
						<div className={style.dataMapRow}>
							<img
								src="http://localhost:3000/assets/homepage/generic_marker.webp"
								alt=""
								className={style.genericDataMarker}
							/>
							<p className={style.data}>{props.earthquakes}</p>
							<p className={style.dataType}>earthquakes</p>
						</div>
						<div className={style.dataMapRow}>
							<img
								src="http://localhost:3000/assets/homepage/generic_marker.webp"
								alt=""
								className={style.genericDataMarker}
							/>
							<p className={style.data}>{props.floods}</p>
							<p className={style.dataType}>floods</p>
						</div>
						<div className={style.dataMapRow}>
							<img
								src="http://localhost:3000/assets/homepage/generic_marker.webp"
								alt=""
								className={style.genericDataMarker}
							/>
							<p className={style.data}>{props.hurricanes}</p>
							<p className={style.dataType}>hurricanes</p>
						</div>
						<div className={style.dataMapRow}>
							<img
								src="http://localhost:3000/assets/homepage/generic_marker.webp"
								alt=""
								className={style.genericDataMarker}
							/>
							<p className={style.data}>{props.eruptions}</p>
							<p className={style.dataType}>eruptions</p>
						</div>
					</div>
				</section>
			</article>
			{/* style={{ alignSelf: "center", marginTop: "10%" }} */}
			<article className={`${style.article} ${secondArticleIsVisible ? style.articleAnimated : ""}`}>
				<h1 className={style.thirdConH1}>the news</h1>
				<h2 className={`${style.thirdConH2} ${secondArticleIsVisible ? style.articleH2Animated : ""}`}>circulation</h2>
				<div className={`${style.thirdContainer} ${secondArticleIsVisible ? style.articleContainerAnimated : ""}`}>
					<p>
						What was a disaster for women and men in early modern Europe? What
						were the causes and possible remedies? Through which social,
						cultural and linguistic processes, the individual experiences and
						memories of survivors and witnesses were converted into shared
						readings? How did these readings shape the responses that the
						institutions and the different social actors offered to the affected
						communities?
					</p>
					<br />
					<p>
						If the factors of a disaster reside in society at least as much as
						in the natural environment, in the aftermath of a catastrophe, in
						the management of the crisis and in the initiation of
						reconstruction, both the modes of circulation of information and the
						texts through which stories and memories take shape play a crucial
						role in the management of the crisis and in the initiation of
						reconstruction.
					</p>
					<img ref={secondArticleRef} className={`${style.firstDocument} ${secondArticleIsVisible ? style.animatedDocument : ""}`} src="http://localhost:3000/assets/homepage/document_1.webp" alt="Discompose Map" />
					<img className={`${style.secondDocument} ${secondArticleIsVisible ? style.animatedDocument : ""}`} src="http://localhost:3000/assets/homepage/document_2.webp" alt="Discompose Map" />
					<img className={`${style.thirdDocument} ${secondArticleIsVisible ? style.animatedDocument : ""}`} src="http://localhost:3000/assets/homepage/document_3.webp" alt="Discompose Map" />

				</div>

				<p className={style.subArticle}>
					Through documentation analysis and collaboration with a team of
					designers and programmers,{" "}
					<span className={style.specialContent}>DISCOMPOSE</span> uses recorded
					testimonies and data visualization to reconstruct the paths taken by
					documents, thus providing an idea of how news about natural disasters
					circulated at the time.
				</p>

				<img className={style.circolationMap} src="http://localhost:3000/assets/homepage/circolation_map.webp" alt="" />

				<div className={style.dataContainer}>
					<div className={style.dataWrapper}>
						<p className={style.data}>{props.images}</p>
						<div className={style.dataRow}>
							<Image
								src="http://localhost:3000/assets/homepage/image_marker.webp"
								alt="arrow"
								width={18}
								height={18}
							/>
							<p className={style.dataType}>images</p>
						</div>
					</div>
					<div className={style.dataWrapper}>
						<p className={style.data}>{props.manuscripts}</p>
						<div className={style.dataRow}>
							<Image
								src="http://localhost:3000/assets/homepage/manuscript_marker.webp"
								alt="arrow"
								width={22}
								height={22}
							/>
							<p className={style.dataType}>manuscripts</p>
						</div>
					</div>
					<div className={style.dataWrapper}>
						<p className={style.data}>{props.prints}</p>
						<div className={style.dataRow}>
							<Image
								src="http://localhost:3000/assets/homepage/print_marker.webp"
								alt="arrow"
								width={22}
								height={22}
							/>
							<p className={style.dataType}>prints</p>
						</div>
					</div>
				</div>
			</article>

			<footer className={style.footerContainer}>
				<h1>explore</h1>
				<h2>the routes</h2>
				<p>
					Navigate the interactive map and discover the natural disasters that
					affected the territories of the Spanish Empire beetween the 15th and
					18th centuries. Discover the routes traced by the spreading of the
					news and collect insightful information about the registered
					documents!
				</p>
				<button
					type="button"
					className={style.mapButton}
					onClick={() => push("/map")}
				>
					<div className={style.innerMapButton}>
						visit interactive map
					</div>
				</button>
			</footer>
		</div>
	);
};