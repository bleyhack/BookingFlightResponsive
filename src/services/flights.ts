import { AirportSuggestion } from '../types/flight';
import { SearchFlightsResponse, Itinerary } from "../types/flights-search"
import api from "./api";

type ApiItem = {
  presentation?: {
    title?: string;
    suggestionTitle?: string;
    subtitle?: string;
  };
  navigation?: {
    entityId: string;
    entityType: string;
    relevantFlightParams?: {
      skyId?: string;
      entityId?: string;
      flightPlaceType?: string;
      localizedName?: string;
    };
  };
};

export const searchAirPorts = async (
  query: string,
  locale: string = "en-US"
): Promise<AirportSuggestion[]> => {
  const response = await api.get('/api/v1/flights/searchAirport',{
    params: {query, locale}
  });

  const items: ApiItem[] = response.data?.data ?? [];
  
  return items.map((item) : AirportSuggestion | null => {
    const label = [item.presentation?.suggestionTitle, item.presentation?.subtitle]
        .filter(Boolean)
        .join(' - ');
    
    const skyId = item.navigation?.relevantFlightParams?.skyId;
    const entityId = item.navigation?.entityId;
    const type = (item.navigation?.entityType ?? "UNNOW") as AirportSuggestion['type'];

    if(!label || !skyId || !entityId) {
      return null;
    }

    return {label, value: skyId, entityId ,type};
  }).filter(Boolean) as AirportSuggestion[];

};

export const searchFlights = async (params: {
  originSkyId: string;
  originEntityId: string;
  destinationSkyId: string;
  destinationEntityId: string;
  date: string;
  cabinClass?: "economy" | "business" | "first";
  adults?: number;
  sortBy?: "price_low" | "best" | "duration_short";
  currency?: string;
  market?: string;
  countryCode?: string;
}) => {
  const {
    originSkyId, originEntityId,
    destinationSkyId, destinationEntityId,
    date,
    cabinClass = 'economy',
    adults = 1,
    sortBy = 'best',
    currency = 'USD',
    market = 'en-US',
    countryCode = 'US',
  } = params;

  const response = await api.get<SearchFlightsResponse>('/api/v1/flights/searchFlights', {
    params: {
      originSkyId,destinationSkyId,originEntityId, destinationEntityId,date,cabinClass, adults, sortBy, currency, market, countryCode
    }
  });

  return response.data;
}


