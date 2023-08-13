import Image from "next/image";
import Link from "next/link";
import style from "../styles/HomepageVariant.module.css";
import { useRouter } from "next/router";
import { useInView } from 'react-intersection-observer';

const Homepage = () => {
	const { push } = useRouter();
	const { ref: firstArticleRef, inView: articleIsVisible } = useInView({triggerOnce: true})
	const { ref: secondArticleRef, inView: secondArticleIsVisible } = useInView({triggerOnce: true})

	return (
		<div className={style.mainContainer}>
			<button
				type="button"
				className={style.fixedMapButton}
				onClick={() => push("/map")}
			>
				{"explore the pathways >"}
			</button>
			<header className={style.headerContainer}>
				<h1>discompose</h1>
				<h2>pathways</h2>
				<img
					src="/homepage_assets/header_img/volcano.svg"
					alt="Background"
					className={style.headerImg}
				/>
				<img
					src="/homepage_assets/header_img/fog_1.svg"
					alt="Background"
					className={style.headerImgFog1}
				/>
				<img
					src="/homepage_assets/header_img/fog_2.svg"
					alt="Background"
					className={style.headerImgFog2}
				/>
				<img
					src="/homepage_assets/header_img/fog_3.svg"
					alt="Background"
					className={style.headerImgFog3}
				/>
				<img
					src="/homepage_assets/header_img/fog_4.svg"
					alt="Background"
					className={style.headerImgFog4}
				/>
				<img
					src="/homepage_assets/header_img/fog_5.svg"
					alt="Background"
					className={style.headerImgFog5}
				/>
				<img
					src="/homepage_assets/header_img/fog_6.svg"
					alt="Background"
					className={style.headerImgFog6}
				/>
			</header>
			<article ref={firstArticleRef} className={`${style.article} ${articleIsVisible ? style.articleAnimated : ""}`}>
				<h1>about the</h1>
				<h2 className={articleIsVisible ? style.articleH2Animated : ""}>pathways</h2>
				<div className={`${style.articleContainer} ${articleIsVisible ? style.articleContainerAnimated : ""}`}>
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
					{/* <img
						className={style.firstImg}
						src="/homepage_assets/arms.svg"
						alt="Prova"
					/> */}
					<img
						className={`${style.arrow_dx} ${articleIsVisible ? style.arrowDxAnimated : ""}`}
						src="/homepage_assets/arrow_dx.svg"
						alt="Prova"
					/>
					<img
						className={`${style.arrow_sx} ${articleIsVisible ? style.arrowSxAnimated : ""}`}
						src="/homepage_assets/arrow_sx.svg"
						alt="Prova"
					/>
					<img
						className={style.crown}
						src="/homepage_assets/crown.svg"
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
			<article className={`${style.article} ${secondArticleIsVisible ? style.articleAnimated : ""}`}>
				<h1 ref={secondArticleRef}  style={{ alignSelf: "center", marginTop: "10%" }}>the news</h1>
				<h2 className={`${secondArticleIsVisible ? style.articleH2Animated : ""}`} style={{ alignSelf: "flex-end" }}>circulation</h2>
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
					{/* <img className={`${secondArticleIsVisible ? style.animatedDocument : ""}`} src="/homepage_assets/documents.svg" alt="Prova" /> */}
					<img className={`${style.firstDocument} ${secondArticleIsVisible ? style.animatedDocument : ""}`} src="/homepage_assets/document_1.svg" alt="Prova" />
					<img className={`${style.secondDocument} ${secondArticleIsVisible ? style.animatedDocument : ""}`} src="/homepage_assets/document_2.svg" alt="Prova" />
					<img className={`${style.thirdDocument} ${secondArticleIsVisible ? style.animatedDocument : ""}`} src="/homepage_assets/document_3.svg" alt="Prova" />
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