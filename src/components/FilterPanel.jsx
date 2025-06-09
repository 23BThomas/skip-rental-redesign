import React from "react";

export default function FilterPanel({ filters, setFilters }) {
  return (
    <div className="bg-white p-4 rounded shadow-sm w-full sm:w-64">
      <h3 className="text-lg font-bold mb-4">Filters</h3>

      <div className="mb-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filters.roadLegalOnly}
            onChange={(e) =>
              setFilters({ ...filters, roadLegalOnly: e.target.checked })
            }
          />
          Road legal only
        </label>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Size range</label>
        <input
          type="range"
          min={4}
          max={40}
          value={filters.sizeRange}
          onChange={(e) =>
            setFilters({ ...filters, sizeRange: Number(e.target.value) })
          }
        />
        <div className="text-xs">Up to {filters.sizeRange} yards</div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Sort by</label>
        <select
          className="w-full border rounded px-2 py-1"
          value={filters.sortBy}
          onChange={(e) =>
            setFilters({ ...filters, sortBy: e.target.value })
          }
        >
          <option value="priceLow">Price (low to high)</option>
          <option value="priceHigh">Price (high to low)</option>
          <option value="size">Size</option>
        </select>
      </div>
    </div>
  );
}