import Image from "next/image";

export default function Home() {
  return (
    <body className="p-8">
      <h1 className="uppercase mb-8 font-bold text-2xl">Dashboard</h1>

      <div className="grid grid-cols-2 gap-32">
        <div className="grid grid-cols-4 gap-4">
          <h1 className="uppercase font-bold">Events Overview</h1>
          <div className="col-span-4 bg-menu-admin h-32 flex items-center justify-center">
            <span className="flex">
              <Image
                className="mr-2"
                src="/folder.svg"
                height={17}
                width={20}
                alt="Asternox Company Logo"
              />
              <h1 className="uppercase font-semibold text-item-admin-red">
                All Events
              </h1>
            </span>
            <p className=" font-bold text-item-admin">100</p>
          </div>
          <div className="bg-menu-admin h-32">
            <h1 className="uppercase font-semibold text-item-admin-red">
              EARTHQUAKES
            </h1>
            <p className=" font-bold text-item-admin">100</p>
          </div>
          <div className="bg-menu-admin h-32">
            <h1 className="uppercase font-semibold text-item-admin-red">
              FLOODS
            </h1>
            <p className=" font-bold text-item-admin">100</p>
          </div>
          <div className="bg-menu-admin h-32">
            <h1 className="uppercase font-semibold text-item-admin-red">
              HURRICANES
            </h1>
            <p className=" font-bold text-item-admin">100</p>
          </div>
          <div className="bg-menu-admin h-32">
            <h1 className="uppercase font-semibold text-item-admin-red">
              VULCANIC ERUPTIONS
            </h1>
            <p className=" font-bold text-item-admin">100</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <h1 className="uppercase font-bold">Documents Overview</h1>
          <div className="col-span-3 bg-menu-admin h-32">
            <span className="flex">
              <Image
                className="mr-2"
                src="/folder.svg"
                height={17}
                width={20}
                alt="Asternox Company Logo"
              />
              <h1 className="uppercase font-semibold text-item-admin-red">
                All Documents
              </h1>
            </span>
            <p className=" font-bold text-item-admin">100</p>
          </div>
          <div className="bg-menu-admin h-32">
            <span className="flex">
              <Image
                className="mr-2"
                src="/image.svg"
                height={17}
                width={20}
                alt="Asternox Company Logo"
              />
              <h1 className="uppercase font-semibold text-item-admin-red">
                IMAGES
              </h1>
            </span>
            <p className=" font-bold text-item-admin">100</p>
          </div>
          <div className="bg-menu-admin h-32">
            <span className="flex">
              <Image
                className="mr-2"
                src="/pen.svg"
                height={17}
                width={20}
                alt="Asternox Company Logo"
              />
              <h1 className="uppercase font-semibold text-item-admin-red">
                MANUSCRIPTS
              </h1>
            </span>
            <p className=" font-bold text-item-admin">100</p>
          </div>
          <div className="bg-menu-admin h-32">
            <span className="flex">
              <Image
                className="mr-2"
                src="/text.svg"
                height={70}
                width={20}
                alt="Asternox Company Logo"
              />
              <h1 className="uppercase font-semibold text-item-admin-red">
                PRINTS
              </h1>
            </span>
            <p className=" font-bold text-item-admin">100</p>
          </div>
        </div>
      </div>
    </body>
  );
}
