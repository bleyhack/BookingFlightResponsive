export type Carrier = {
  id: number;
  logoUrl?: string;
  name: string;
};

export type Leg = {
  id: string;
  origin: { id: string; name: string; displayCode: string; city: string };
  destination: { id: string; name: string; displayCode: string; city: string };
  durationInMinutes: number;
  stopCount: number;
  departure: string;
  arrival: string;
  carriers: { marketing: Carrier[]; operationType: string };
};

export type Price = { raw: number; formatted: string };

export type Itinerary = {
  id: string;
  price: Price;
  legs: Leg[];
  tags?: string[];
  score?: number;
};

export type SearchFlightsData = {
  context: { status: 'incomplete' | 'complete'; totalResults: number };
  itineraries: Itinerary[];
};

export type SearchFlightsResponse = {
  status: boolean;
  timestamp: number;
  sessionId: string;
  data: SearchFlightsData;
};
