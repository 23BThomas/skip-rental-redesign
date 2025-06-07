import React from "react";
import SkipCard from "./SkipCard";

export default function SkipGrid({ skips, selected, onSelect }) {
  if (!skips.length) return <p className="text-center text-gray-500">Loading skip options...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {skips.map((skip) => (
        <SkipCard
          key={skip.id}
          skip={skip}
          selected={selected?.id === skip.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}