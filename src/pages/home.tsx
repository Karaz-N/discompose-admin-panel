import Image from "next/image";
import Link from "next/link";
import style from "../styles/HomepageVariant.module.css";
import { useRouter } from "next/router";

const Homepage = () => {
	const { push } = useRouter();
	return (
		<div className={style.mainContainer}>
			<button
				type="button"
				className={style.fixedMapButton}
				onClick={() => push("/map")}
			>
				{"explore the pathways >"}
			</button>
			{/* <header className={style.headerContainer}>
				<h1>discompose</h1>
				<h2>pathways</h2>
				<img
					src="/homepage_assets/complete_volcano.png"
					alt="Background"
					className={style.headerImg}
				/>
			</header> */}
			<article className={style.article}>
				<h1>about the</h1>
				<h2>pathways</h2>
				<div className={style.articleContainer}>
					<div>
						<p>
							<span className={style.specialContent}>DISCOMPOSE PATHWAYS</span>{" "}
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
						<Link
							className={style.externalLink}
							href="http://discompose.unina.it/"
							target="_blank"
						>
							FIND OUT MORE ABOUT DISCOMPOSE
						</Link>
					</div>
					<p>
						With this platform, the researchers aim to provide scholars and
						non-scholarly individuals with a more immersive and interactive
						display of the findings of their research.
					</p>
					<img
						className={style.firstImg}
						src="/homepage_assets/arms.svg"
						alt="Prova"
					/>
					<img
						className={style.secondImg}
						src="/homepage_assets/data.svg"
						alt="Prova"
					/>
				</div>
				<div className={style.secondaryContainer}>
					<p className={style.secondaryTextContainer}>
						Discompose Pathways offers{" "}
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
			<Image
				className={style.mapImage}
				src={"/homepage_assets/home_map.png"}
				alt="Discompose Map"
				width={1920}
				height={2158}
			/>
			<article className={style.article}>
				<h1 style={{ alignSelf: "center", marginTop: "10%" }}>the news</h1>
				<h2 style={{ alignSelf: "flex-end" }}>circulation</h2>
				<div className={style.thirdContainer}>
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
					<img src="/homepage_assets/documents.svg" alt="Prova" />
				</div>

				<p className={style.subArticle}>
					Through documentation analysis and collaboration with a team of
					designers and programmers,{" "}
					<span className={style.specialContent}>DISCOMPOSE</span> uses recorded
					testimonies and data visualization to reconstruct the paths taken by
					documents, thus providing an idea of how news about natural disasters
					circulated at the time.
				</p>

				<Image
					className={style.circolationMap}
					src={"/homepage_assets/circolation_map.svg"}
					alt="Discompose Map"
					width={1346}
					height={690}
				/>

				<div className={style.dataContainer}>
					<div className={style.dataWrapper}>
						<p className={style.data}>200</p>
						<div className={style.dataRow}>
							<Image
								src="/marker/document_marker/image_marker.svg"
								alt="arrow"
								width={22}
								height={22}
							/>
							<p className={style.dataType}>images</p>
						</div>
					</div>
					<div className={style.dataWrapper}>
						<p className={style.data}>200</p>
						<div className={style.dataRow}>
							<Image
								src="/marker/document_marker/manuscript_marker.svg"
								alt="arrow"
								width={22}
								height={22}
							/>
							<p className={style.dataType}>manuscripts</p>
						</div>
					</div>
					<div className={style.dataWrapper}>
						<p className={style.data}>200</p>
						<div className={style.dataRow}>
							<Image
								src="/marker/document_marker/print_marker.svg"
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
				<h2>the pathways</h2>
				<p>
					Navigate the interactive map and discover the natural disasters that
					affected the territories of the Spanish Empire beetween the 15th and
					18th centuries. Discover the pathways traced by the spreading of the
					news and collect insightful information about the registered
					documents!
				</p>
				<button
					type="button"
					className={style.mapButton}
					onClick={() => push("/map")}
				>
					visit interactive map
				</button>
			</footer>
		</div>
	);
};

export default Homepage;