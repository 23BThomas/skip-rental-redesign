import React, { useEffect, useState } from "react";
import SkipGrid from "../components/SkipGrid";

export default function Home() {
  const [skips, setSkips] = useState([]);
  const [selected, setSelected] = useState(null);

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

  const steps = [
    "Postcode",
    "Waste Type",
    "Select Skip",
    "Permit Check",
    "Choose Date",
    "Payment",
  ];
  const currentStep = 2;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-center mb-6">
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          {steps.map((step, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded ${
                index < currentStep
                  ? "bg-green-100 text-green-800 font-medium"
                  : index === currentStep
                  ? "bg-blue-100 text-blue-800 font-semibold"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {step}
              {index < steps.length - 1 && <span className="mx-1 text-gray-400">→</span>}
            </span>
          ))}
        </div>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Choose Your Skip Size</h1>
        <p className="text-gray-600 text-base mt-1">Select the skip size that best suits your needs</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skips.map((skip) => (
          <div
            key={skip.id}
            onClick={() => setSelected(skip)}
            className={`rounded-lg overflow-hidden border flex flex-col justify-between transition-all duration-200 cursor-pointer hover:shadow-lg hover:scale-[1.02] ${
              selected?.id === skip.id ? "ring-2 ring-blue-400 border-blue-600 bg-blue-50" : "bg-white border-gray-200"
            }`}
          >
            <div className="relative">
              <img
                src={skip.imageUrl}
                alt={skip.name}
                className="w-full h-48 object-cover"
              />
              {skip.notAllowedOnRoad && (
                <span className="absolute top-2 left-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                  ⚠️ Not allowed on road
                </span>
              )}
            </div>
            <div className="p-4 space-y-1">
              <h3 className="text-lg font-bold text-gray-800">{skip.name}</h3>
              <p className="text-sm text-gray-500">{skip.hirePeriod} day hire</p>
              <p className="text-xl font-bold text-blue-600">£{skip.price}</p>
              <button
                className={`mt-3 w-full py-2 rounded text-sm font-medium transition-colors duration-200 ${
                  selected?.id === skip.id
                    ? "bg-blue-600 text-white cursor-default"
                    : "bg-gray-100 text-gray-800 hover:bg-blue-600 hover:text-white"
                }`}
              >
                {selected?.id === skip.id ? "Selected" : "Select This Skip"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="mt-10 border-t pt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Selected Skip</h2>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 space-y-1 text-sm text-gray-700">
              <p className="font-semibold text-base text-gray-800">{selected.name}</p>
              <p>
                <span className="text-blue-600 font-bold">£{selected.price}</span> • {selected.hirePeriod} day hire
              </p>
              <p className="text-xs text-gray-500 italic">
                Imagery and information shown throughout this website may not reflect the exact shape or size specification, colours may vary, options and/or accessories may be featured at additional cost.
              </p>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => alert('Back to Waste Type')}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              ← Back
            </button>
            <button
              onClick={() => alert('Continue to Permit Check')}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Continue →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}