import { useState, useEffect } from "react";
import { useDocumentStore } from "../../../Store/documentStore";
import { useStore } from "../../../Store/store";
import CustomBezier from "./CustomBezier";
import CustomMarker from "./CustomMarker";

export default function DocumentMarker() {
  const allManuscript = useDocumentStore((state) => state.allManuscript);
  const allPrint = useDocumentStore((state) => state.allPrint);
  const allImage = useDocumentStore((state) => state.allImage);

  const selectedManuscriptFilter = useDocumentStore(
    (state) => state.selectedManuscriptFilter
  );

  const selectedPrintFilter = useDocumentStore((state) => state.selectedPrintFilter);

  const selectedImageFilter = useDocumentStore((state) => state.selectedImageFilter);

  const filteredManuscript = useDocumentStore(
    (state) => state.filteredManuscript
  );
  const filteredPrint = useDocumentStore((state) => state.filteredPrint);
  const filteredImage = useDocumentStore((state) => state.filteredImage);

  const selectedEventData = useDocumentStore(
    (state) => state.selectedEventData
  );

  const setSidebarVisible = useStore((state) => state.setSidebarVisible);
  const setSidebarOpen = useStore((state) => state.setSidebarOpen);

  const setFilterFromMap = useDocumentStore((state) => state.setFilterFromMap);

  return (
    <>
      <CustomMarker
        key={selectedEventData.id}
        position={[
          selectedEventData.place.latitude,
          selectedEventData.place.longitude,
        ]}
        eventType={"selected_" + selectedEventData.type.toLowerCase()}
        onClick={console.log()}
      />
      {selectedManuscriptFilter && filteredManuscript.map((manuscript) => {
        // Verifica se l'oggetto 'from' è definito e contiene 'latitude' e 'longitude'
        const isFromValid = manuscript.from;

        // Verifica se l'oggetto 'to' è definito e contiene 'latitude' e 'longitude'
        const isToValid = manuscript.to;

        // Se l'oggetto 'from' è valido, renderizza il CustomMarker per le coordinate 'from'
        // Altrimenti, salta la renderizzazione di entrambi i CustomMarker
        if (isFromValid) {
          return (
            <>
              <CustomBezier
                startLatitude={selectedEventData.place.latitude}
                startLongitude={selectedEventData.place.longitude}
                endLatitude={manuscript.from.latitude}
                endLongitude={manuscript.from.longitude}
                isAnimated={true}
              />
              <CustomMarker
                key={`${manuscript.id}-from`}
                position={[manuscript.from.latitude, manuscript.from.longitude]}
                eventType={"manuscript"}
                onClick={() => {setSidebarVisible(true); setSidebarOpen(true); setFilterFromMap(manuscript.from.latitude, manuscript.from.longitude)}}
              />

              {isToValid && (
                <>
                  <CustomBezier
                    startLatitude={manuscript.from.latitude}
                    startLongitude={manuscript.from.longitude}
                    endLatitude={manuscript.to.latitude}
                    endLongitude={manuscript.to.longitude}
                    isAnimated={false}
                  />
                  <CustomMarker
                    key={`${manuscript.id}-to`}
                    position={[manuscript.to.latitude, manuscript.to.longitude]}
                    eventType={"manuscript"}
                    onClick={() => {setSidebarVisible(true); setSidebarOpen(true); setFilterFromMap(manuscript.to.latitude, manuscript.to.longitude)}}
                  />
                </>
              )}
            </>
          );
        }

        // Se l'oggetto 'from' non è valido, salta la renderizzazione di entrambi i CustomMarker
        return null;
      })}
      {selectedPrintFilter && filteredPrint.map((print) =>
        print.place ? (
          <>
            <CustomBezier
              startLatitude={selectedEventData.place.latitude}
              startLongitude={selectedEventData.place.longitude}
              endLatitude={print.place.latitude}
              endLongitude={print.place.longitude}
              isAnimated={true}
            />
            <CustomMarker
              key={print.id}
              position={[print.place.latitude, print.place.longitude]}
              eventType={"print"}
              onClick={() => {setSidebarVisible(true); setSidebarOpen(true); setFilterFromMap(print.place.latitude, print.place.longitude);}}
            />
          </>
        ) : null
      )}

      {selectedImageFilter && filteredImage.map((image) =>
        image.place ? (
          <>
            <CustomBezier
              startLatitude={selectedEventData.place.latitude}
              startLongitude={selectedEventData.place.longitude}
              endLatitude={image.place.latitude}
              endLongitude={image.place.longitude}
              isAnimated={true}
            />
            <CustomMarker
              key={image.id}
              position={[image.place.latitude, image.place.longitude]}
              eventType={"image"}
              onClick={() => {setSidebarVisible(true); setSidebarOpen(true); setFilterFromMap(image.place.latitude, image.place.longitude);}}
            />
          </>
        ) : null
      )}
    </>
  );
}
