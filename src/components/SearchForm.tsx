import React, { useState } from "react";
import { useAirportSearch } from "../hooks/useAirportSearch";
import { useSearchParams } from "react-router-dom";

type PlacePick = { skyId: string; entityId: string; label: string };

const SearchForm: React.FC = () => {
  const [toQuery, setToQuery] = useState("");
  const [fromQuery, setFromQuery] = useState("");
  const [fromPick, setFromPick] = useState<PlacePick | null>(null);
  const [toPick, setToPick] = useState<PlacePick | null>(null);
  const [dateFrom, setDateFrom] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: fromOption, isLoading: loadingFrom } = useAirportSearch(fromQuery, "en-US");
  const { data: toOption,   isLoading: loadingTo   } = useAirportSearch(toQuery, "en-US");

  const pickFromValue = (value: string) => {
    const hit = fromOption.find((o) => o.value === value);
    setFromPick(hit ? { skyId: hit.value, entityId: hit.entityId, label: hit.label } : null);
  };
  const pickToValue = (value: string) => {
    const hit = toOption.find((o) => o.value === value);
    setToPick(hit ? { skyId: hit.value, entityId: hit.entityId, label: hit.label } : null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fromChosen = fromOption.find((item) => item.value === fromQuery) ?? null;
    const toChosen   = toOption.find((item)   => item.value === toQuery)   ?? null;

    const finalFrom = fromPick
      ? { skyId: fromPick.skyId, entityId: fromPick.entityId }
      : fromChosen
      ? { skyId: fromChosen.value, entityId: fromChosen.entityId }
      : null;

    const finalTo = toPick
      ? { skyId: toPick.skyId, entityId: toPick.entityId }
      : toChosen
      ? { skyId: toChosen.value, entityId: toChosen.entityId }
      : null;

    if (!finalFrom || !finalTo || !dateFrom) {
      alert("Please pick valid origin, destination and date.");
      return;
    }

    const next = new URLSearchParams(searchParams);
    next.set("fromSkyId", finalFrom.skyId);
    next.set("fromEntityId", finalFrom.entityId);
    next.set("toSkyId", finalTo.skyId);
    next.set("toEntityId", finalTo.entityId);
    next.set("date", dateFrom);
    next.set("cabinClass", "economy");
    next.set("adults", "1");
    next.set("sortBy", "best");
    next.set("currency", "USD");
    next.set("market", "en-US");
    next.set("countryCode", "US");

    setSearchParams(next, { replace: false });
  };

  const onReset = (e: React.MouseEvent) => {
    e.preventDefault();
    setDateFrom("");
    setFromQuery("");
    setToQuery("");
    setFromPick(null);
    setToPick(null);
    setSearchParams(new URLSearchParams(), { replace: false });
  };

  return (
    <form className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto mt-6" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">Search Flight</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">From</label>
        <input
          list="from-airports"
          value={fromQuery}
          onChange={(e) => { setFromQuery(e.target.value.trim()); setFromPick(null); }}
          onBlur={(e) => pickFromValue(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          placeholder={loadingFrom ? "Loading…" : "Type at least 3 letters"}
          required
        />
        <datalist id="from-airports">
          {fromOption.map((opt) => (
            <option key={`from-${opt.value}`} value={opt.value} label={opt.label} />
          ))}
        </datalist>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">To</label>
        <input
          list="to-airports"
          value={toQuery}
          onChange={(e) => { setToQuery(e.target.value.trim()); setToPick(null); }}
          onBlur={(e) => pickToValue(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          placeholder={loadingTo ? "Loading…" : "Type at least 3 letters"}
          required
        />
        <datalist id="to-airports">
          {toOption.map((opt) => (
            <option key={`to-${opt.value}`} value={opt.value} label={opt.label} />
          ))}
        </datalist>
      </div>

      <label className="block mb-1 font-medium">Date</label>
      <div className="flex gap-2">
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>

      <div className="flex justify-between mt-4">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Search Flights
        </button>
        <button onClick={onReset} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
          Reset
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
