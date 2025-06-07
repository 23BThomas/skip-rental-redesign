import React from "react";

export default function SkipCard({ skip, selected, onSelect }) {
  const getImagePath = () => {
    const imageName = skip?.name?.split(" ")[0]?.toLowerCase() || "default";
    return `/assets/images/${imageName}-yarder-skip.jpg`;
  };

  return (
    <div
      onClick={() => onSelect(skip)}
      className={`rounded-xl overflow-hidden border cursor-pointer transition-all hover:shadow-md hover:scale-[1.02] ${
        selected ? "border-blue-600 bg-blue-50 ring-2 ring-blue-300" : "border-gray-200 bg-white"
      }`}
    >
      <img
        src={skip.imageUrl || getImagePath()}
        alt={skip.name || "Skip Image"}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{skip.name || "Skip"}</h3>
        <p className="text-sm text-gray-500 mb-1">{skip.hirePeriod || 14} day hire period</p>
        <p className="text-xl font-bold text-blue-600">£{skip.price || "N/A"}</p>

        {skip.notAllowedOnRoad && (
          <div className="text-xs mt-2 inline-block bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
            ⚠️ Not allowed on the road
          </div>
        )}

        <button
          className={`mt-4 w-full py-2 rounded text-sm font-medium transition ${
            selected
              ? "bg-blue-600 text-white cursor-default"
              : "bg-gray-100 text-gray-800 hover:bg-blue-600 hover:text-white"
          }`}
        >
          {selected ? "Selected" : "Select This Skip"}
        </button>
      </div>
    </div>
  );
}