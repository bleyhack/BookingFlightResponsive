import React, { useMemo } from "react";
import { mapItineraryToRow } from "../helpers/helper";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"
import { searchFlights } from "../services/flights";
import { FlightSkeleton } from "../utils/Skeleton";

const FlightResults: React.FC = () => {
  const [sp] = useSearchParams();

  const params = useMemo(() => {
    const required = [
      "fromSkyId",
      "fromEntityId",
      "toSkyId",
      "toEntityId",
      "date",
    ] as const;
    const missing = required.some((k) => !sp.get(k));

    if (missing) {
      return null;
    }

    return {
      originSkyId: sp.get("fromSkyId")!,
      originEntityId: sp.get("fromEntityId")!,
      destinationSkyId: sp.get("toSkyId")!,
      destinationEntityId: sp.get("toEntityId")!,
      date: sp.get("date")!,
      cabinClass: (sp.get("cabinClass") ?? "economy") as any,
      adults: Number(sp.get("adults") ?? "1"),
      sortBy: (sp.get("sortBy") ?? "best") as any,
      currency: sp.get("currency") ?? "USD",
      market: sp.get("market") ?? "en-US",
      countryCode: sp.get("countryCode") ?? "US",
    };
  }, [sp]);

  const query = useQuery({
    queryKey: ["searchFlights", params],
    queryFn: () => searchFlights(params!),
    enabled: !!params,
    refetchOnWindowFocus: false,
    retry:0,
    staleTime: 1000 * 60 * 24,
  })

  if (query.isLoading) return <FlightSkeleton />;
  if (query.error) return <div className="mt-6 text-red-600">Error loading the flights</div>;
  if (!params) return null;

  const itinerary = query.data?.data?.itineraries ?? [];
  if (itinerary.length === 0) {
    return <div className="mt-6">No flights found.</div>;
  }

  const rows = itinerary.map(mapItineraryToRow);

  return (
    <div className="mt-6 bg-white rounded-lg shadow-md p-4 overflow-x-auto">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-gray-500">{sp.get('fromSkyId')} - {sp.get("toSkyId")} - {sp.get("date")}</div>
      </div>

      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="pr-4 py-2">Carrier</th>
            <th className="pr-4 py-2">Route</th>
            <th className="pr-4 py-2">Depart</th>
            <th className="pr-4 py-2">Arrive</th>
            <th className="pr-4 py-2">Duration</th>
            <th className="pr-4 py-2">Stops</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b last:border-0 align-top">
              <td className="pr-4 py-2">
                <div className="flex items-center gap-2">
                  {row.carrierLogo && (
                    <img
                      src={row.carrierLogo}
                      alt={row.carrier}
                      className="w-5 h-5 rounded"
                    />
                  )}
                  <span className="font-medium">{row.carrier}</span>
                </div>
              </td>
              <td className="py-2 pr-4">
                <div>{row.route}</div>
                {row.hasReturn && (
                  <div className="text-xs text-gray-500">{row.returnRoute}</div>
                )}
              </td>
              <td className="py-2 pr-4">
                <div>{row.depart}</div>
                {row.hasReturn && (
                  <div className="text-xs text-gray-500">
                    {row.returnDepart}
                  </div>
                )}
              </td>
              <td className="py-2 pr-4">
                <div>{row.arrive}</div>
                {row.hasReturn && (
                  <div className="text-xs text-gray-500">
                    {row.returnArrive}
                  </div>
                )}
              </td>
              <td className="py-2 pr-4">
                <div>{row.duration}</div>
                {row.hasReturn && (
                  <div className="text-xs text-gray-500">
                    {row.returnDuration}
                  </div>
                )}
              </td>
              <td className="py-2 pr-4">
                {row.stops === 0 ? "Direct" : `${row.stops} stop`}
              </td>
              <td className="py-2 pr-4 font-semibold">{row.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightResults;
