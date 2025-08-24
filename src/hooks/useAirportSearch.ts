import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchAirPorts } from "../services/flights";
import { AirportSuggestion } from "../types/flight";

function useDebounce<T>(value: T, delay: number = 400): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(id);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useAirportSearch(query: string, locale: string = "en-US") {
  const debouncedQuery = useDebounce(query.trim(), 400);
  const enable = debouncedQuery.length >= 3;

  const q = useQuery<AirportSuggestion[]>({
    queryKey: ["airports", debouncedQuery, locale],
    queryFn: () => searchAirPorts(debouncedQuery, locale),
    enabled: enable,
    staleTime: 1000 * 60 * 60 * 24, // 24h
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    retry: 0,
  });

  const data  = useMemo(() => (enable ? q.data ?? [] : []), [q.data, enable]);

  return {...q, data, enable}
}
