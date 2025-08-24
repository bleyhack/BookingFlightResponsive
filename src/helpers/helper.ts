import { Itinerary } from "../types/flights-search";

export function minutesToHhmm(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${m.toString().padStart(2, '0')}m`;
}


export function isoToHm(iso: string) {
  const d = new Date(iso);
  const hh = d.getHours().toString().padStart(2, '0');
  const mm = d.getMinutes().toString().padStart(2, '0');
  return `${hh}:${mm}`;
}

export function mapItineraryToRow(it: Itinerary) {
  const outLeg = it.legs[0];
  const retLeg = it.legs[1];

  const mk = outLeg?.carriers?.marketing?.[0];

  return {
    id: it.id,
    price: it.price.formatted,
    carrier: mk?.name ?? '-',
    carrierLogo: mk?.logoUrl,
    route: `${outLeg?.origin.displayCode} → ${outLeg?.destination.displayCode}`,
    depart: isoToHm(outLeg?.departure),
    arrive: isoToHm(outLeg?.arrival),
    duration: minutesToHhmm(outLeg?.durationInMinutes ?? 0),
    stops: outLeg?.stopCount ?? 0,
    hasReturn: !!retLeg,
    returnRoute: retLeg ? `${retLeg.origin.displayCode} → ${retLeg.destination.displayCode}` : '',
    returnDepart: retLeg ? isoToHm(retLeg.departure) : '',
    returnArrive: retLeg ? isoToHm(retLeg.arrival) : '',
    returnDuration: retLeg ? minutesToHhmm(retLeg.durationInMinutes) : '',
    tags: it.tags ?? [],
  };
}