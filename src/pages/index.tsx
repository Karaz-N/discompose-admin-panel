import Image from "next/image";
import { Suspense, useState, useEffect } from "react";
import { GetStaticProps } from "next";
import { loadAllEvents, Counts } from "../db/queries";

type HomeProps = {
	props: {
		counts: Counts;
	};
};

export const getStaticProps: GetStaticProps = async (): Promise<HomeProps> => {
	const counts = await loadAllEvents();

	return {
		props: {
			counts,
		},
	};
};

export default function Home({ counts }) {
	return (
		<body className="p-8">
			<h1 className="uppercase mb-8 font-bold text-2xl">Dashboard</h1>

			<div className="grid grid-cols-2 gap-32">
				<div className="grid grid-cols-4 gap-4">
					<h1 className="uppercase font-bold">Events Overview</h1>
					<div className="col-span-4 bg-menu-admin h-32 flex flex-col items-center justify-center">
						<span className="flex">
							<Image
								className="mr-2"
								src="/folder.svg"
								height={17}
								width={20}
								alt="Asternox Company Logo"
							/>
							<h1 className="uppercase text-lg font-semibold text-item-admin-red">
								All Events
							</h1>
						</span>
						<Suspense>
							<p className=" font-bold text-4xl mt-4 text-item-admin">
								{counts.events}
							</p>
						</Suspense>
					</div>
					<div className="bg-menu-admin h-32 flex flex-col items-center justify-center">
						<h1 className="uppercase text-lg font-semibold text-item-admin-red">
							EARTHQUAKES
						</h1>
						<Suspense>
							<p className=" font-bold text-4xl mt-4 text-item-admin">
								{counts.earthquakes}
							</p>
						</Suspense>
					</div>
					<div className="bg-menu-admin h-32 flex flex-col items-center justify-center">
						<h1 className="uppercase text-lg font-semibold text-item-admin-red">
							FLOODS
						</h1>
						<Suspense>
							<p className=" font-bold text-4xl mt-4 text-item-admin">
								{counts.floods}
							</p>
						</Suspense>
					</div>
					<div className="bg-menu-admin h-32 flex flex-col items-center justify-center">
						<h1 className="uppercase text-lg font-semibold text-item-admin-red">
							HURRICANES
						</h1>
						<Suspense>
							<p className=" font-bold text-4xl mt-4 text-item-admin">
								{counts.hurricanes}
							</p>
						</Suspense>
					</div>
					<div className="bg-menu-admin h-32 flex flex-col items-center justify-center">
						<h1 className="uppercase text-lg text-center font-semibold text-item-admin-red">
							ERUPTIONS
						</h1>
						<Suspense>
							<p className=" font-bold text-4xl mt-4 text-item-admin">
								{counts.eruptions}
							</p>
						</Suspense>
					</div>
				</div>

				<div className="grid grid-cols-3 gap-4">
					<h1 className="uppercase font-bold">Documents Overview</h1>
					<div className="col-span-3 bg-menu-admin h-32 flex flex-col items-center justify-center">
						<span className="flex">
							<Image
								className="mr-2"
								src="/folder.svg"
								height={17}
								width={20}
								alt="Asternox Company Logo"
							/>
							<h1 className="uppercase text-lg font-semibold text-item-admin-red">
								All Documents
							</h1>
						</span>
						<Suspense>
							<p className=" font-bold text-4xl mt-4 text-item-admin">
								{counts.documents}
							</p>
						</Suspense>
					</div>
					<div className="bg-menu-admin h-32 flex flex-col items-center justify-center">
						<span className="flex">
							<Image
								className="mr-2"
								src="/image.svg"
								height={17}
								width={20}
								alt="Asternox Company Logo"
							/>
							<h1 className="uppercase text-lg font-semibold text-item-admin-red">
								IMAGES
							</h1>
						</span>
						<Suspense>
							<p className=" font-bold text-4xl mt-4 text-item-admin">
								{counts.images}
							</p>
						</Suspense>
					</div>
					<div className="bg-menu-admin h-32 flex flex-col items-center justify-center">
						<span className="flex">
							<Image
								className="mr-2"
								src="/pen.svg"
								height={17}
								width={20}
								alt="Asternox Company Logo"
							/>
							<h1 className="uppercase text-lg font-semibold text-item-admin-red">
								MANUSCRIPTS
							</h1>
						</span>
						<Suspense>
							<p className=" font-bold text-4xl mt-4 text-item-admin">
								{counts.manuscripts}
							</p>
						</Suspense>
					</div>
					<div className="bg-menu-admin h-32 flex flex-col items-center justify-center">
						<span className="flex">
							<Image
								className="mr-2"
								src="/text.svg"
								height={70}
								width={20}
								alt="Asternox Company Logo"
							/>
							<h1 className="uppercase text-lg font-semibold text-item-admin-red">
								PRINTS
							</h1>
						</span>
						<Suspense>
							<p className=" font-bold text-4xl mt-4 text-item-admin">
								{counts.prints}
							</p>
						</Suspense>
					</div>
				</div>
			</div>
		</body>
	);
}
