import React, { useEffect, useState } from "react";
import SkipGrid from "../components/SkipGrid";
import ProgressBar from "../components/ProgressBar";
import FilterPanel from "../components/FilterPanel";

export default function Home() {
  const [skips, setSkips] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filters, setFilters] = useState({
    roadLegalOnly: false,
    sizeRange: 40,
    sortBy: "priceLow",
  });

  useEffect(() => {
    fetch("https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft")
      .then((res) => res.json())
      .then((data) => {
        const enriched = data.map((skip) => ({
          ...skip,
          name: `${skip.size} Yard Skip`,
          hirePeriod: skip.hire_period_days,
          price: skip.price_before_vat,
          imageUrl: `/assets/images/${skip.size}-yarder-skip.jpg`,
          notAllowedOnRoad: !skip.allowed_on_road,
        }));
        setSkips(enriched);
      })
      .catch(console.error);
  }, []);

  const filteredSkips = skips
    .filter((skip) =>
      filters.roadLegalOnly ? !skip.notAllowedOnRoad : true
    )
    .filter((skip) => skip.size <= filters.sizeRange)
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "priceLow":
          return a.price - b.price;
        case "priceHigh":
          return b.price - a.price;
        case "size":
          return a.size - b.size;
        default:
          return 0;
      }
    });

  return (
    <div className="max-w-7xl mx-auto p-4 pb-20">
      <ProgressBar currentStep={2} />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filter Sidebar */}
        <FilterPanel filters={filters} setFilters={setFilters} />

        <div className="flex-1">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Choose Your Skip Size</h1>
            <p className="text-gray-600 text-base mt-1">Select the skip size that best suits your needs</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkips.map((skip) => (
              <div
                key={skip.id}
                onClick={() => setSelected(skip)}
                className={`rounded-xl overflow-hidden border flex flex-col justify-between transition transform hover:scale-105 hover:ring hover:ring-blue-100 duration-300 cursor-pointer hover:shadow-lg ${
                  selected?.id === skip.id
                    ? "ring-2 ring-blue-500 border-blue-600 bg-blue-50"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="relative">
                  <img
                    src={skip.imageUrl}
                    alt={skip.name}
                    className="w-full aspect-video object-contain bg-white rounded-t-xl shadow-sm"
                  />
                  {skip.notAllowedOnRoad && (
                    <span
                      className="absolute top-2 left-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded shadow"
                      title="This skip cannot be placed on public roads"
                    >
                      ⚠️ Not road legal
                    </span>
                  )}
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="text-lg font-bold text-gray-800">{skip.name}</h3>
                  <p className="text-sm text-gray-500">{skip.hirePeriod} day hire</p>
                  <p className="text-2xl font-bold text-blue-600">£{skip.price}</p>
                  <button
                    className={`mt-3 w-full py-2 rounded text-sm font-medium transition-colors duration-200 ${
                      selected?.id === skip.id
                        ? "bg-blue-600 text-white cursor-default"
                        : "bg-gray-100 text-gray-800 hover:bg-blue-600 hover:text-white focus:ring-2 focus:ring-blue-300 outline-none"
                    }`}
                  >
                    {selected?.id === skip.id ? "Selected ✓" : "Select This Skip"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selected && (
        <div className="fixed bottom-0 inset-x-0 bg-white shadow-lg border-t py-4 px-6 flex justify-between items-center z-50">
          <div>
            <p className="text-sm font-semibold text-gray-800">{selected.name}</p>
            <p className="text-sm text-gray-600">£{selected.price} • {selected.hirePeriod} day hire</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
              Back
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold transition-transform">
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}