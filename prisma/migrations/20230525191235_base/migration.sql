-- CreateTable
CREATE TABLE "Place" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "record" TEXT NOT NULL,
    "documentRecord" TEXT NOT NULL,
    "summary" TEXT,
    "author" TEXT,
    "link" TEXT,
    "eventId" TEXT,
    "archive" TEXT,
    "imageId" TEXT,
    "manuscriptId" TEXT,
    "manuscriptEvent" TEXT,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("record")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "artist" TEXT,
    "author" TEXT,
    "title" TEXT,
    "museum" TEXT,
    "content" TEXT,
    "date" TEXT,
    "placeId" TEXT,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manuscripts" (
    "id" TEXT NOT NULL,
    "author" TEXT,
    "writtenAt" TEXT,
    "receivedAt" TEXT,
    "placeId" TEXT,
    "toPlaceId" TEXT,
    "recipient" TEXT,
    "language" TEXT,

    CONSTRAINT "manuscripts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prints" (
    "id" TEXT NOT NULL,
    "otherPlaces" TEXT[],
    "language" TEXT,
    "title" TEXT,
    "year" INTEGER,
    "notes" TEXT,
    "USTC" TEXT,
    "writer" TEXT,
    "information" TEXT,
    "dedicatee" TEXT,
    "placeId" TEXT,

    CONSTRAINT "prints_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_documentRecord_fkey" FOREIGN KEY ("documentRecord") REFERENCES "documents"("record") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_manuscriptId_fkey" FOREIGN KEY ("manuscriptId") REFERENCES "manuscripts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_manuscriptEvent_fkey" FOREIGN KEY ("manuscriptEvent") REFERENCES "manuscripts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manuscripts" ADD CONSTRAINT "manuscripts_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manuscripts" ADD CONSTRAINT "manuscripts_toPlaceId_fkey" FOREIGN KEY ("toPlaceId") REFERENCES "Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prints" ADD CONSTRAINT "prints_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;
